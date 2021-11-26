"use strict";

const amqp = require('amqplib');

const CLOUDAMQP_URL = '***'

module.exports = async() => { 
  const conn = await amqp.connect(CLOUDAMQP_URL);
  const channel = await conn.createChannel();
  return channel;
}