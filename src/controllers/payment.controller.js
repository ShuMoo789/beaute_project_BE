const { default: axios } = require("axios");
const orderModel = require("../models/order.model");
const moment = require("moment/moment");
const CryptoJS = require("crypto-js");
const qs = require("qs");
// Import environment variables
const { FE_REDIRECT_URL, CALLBACK_URL } = process.env;

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

module.exports = {
  createPayment: async (req, res) => {
    const { amount, orderId } = req.body;
    const items = [{}];
    const embed_data = {
      redirectUrl: FE_REDIRECT_URL, //fe
      // redirectUrl: FE_REDIRECT_URL,
    };
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;
    const order = {
      app_id: config.app_id,
      app_trans_id,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      description: `BeautiSkincare - Payment for the order #${transID}`,
      bank_code: "zalopayapp",
      callBack_url: CALLBACK_URL, //be
    };
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    try {
      await orderModel.findByIdAndUpdate(orderId, { appTransId: app_trans_id });
      const result = await axios.post(config.endpoint, null, { params: order });
      return res.json({
        data: result.data,
        appTransId: app_trans_id,
        mac: order.mac,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  
  checkPayment: async (req, res) => {
    const { appTransId } = req.body;
    let postData = {
      app_id: config.app_id,
      app_trans_id: appTransId,
    };
    let data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    let postConfig = {
      method: "post",
      url: "https://sb-openapi.zalopay.vn/v2/query",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(postData),
    };
    try {
      const result = await axios(postConfig);
      console.log({ result });
      if (result.data.return_code === 1) {
        await orderModel.findOneAndUpdate(
          { appTransId },
          {
            isPaid: true,
            status: "Shipping",
          },
          { new: true }
        );
        return res.json(result.data);
      } else if (result.data.return_code === 2) {
        await orderModel.findOneAndUpdate(
          { appTransId },
          { isPaid: false },
          { new: true }
        );
        return res.json(result.data);
      } else if (result.data.return_code === 3) {
        await orderModel.findOneAndUpdate(
          { appTransId },
          { isPaid: false },
          { new: true }
        );
        return res.json(result.data);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
