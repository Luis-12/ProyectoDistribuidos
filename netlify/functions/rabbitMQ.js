"use strict";

const amqp = require('amqplib');

const CLOUDAMQP_URL = 'amqps://jbspisew:codAlPoy4A1swX0ORL60nB1tpGcdAykj@fish.rmq.cloudamqp.com/jbspisew'

module.exports = async() => { 
  const conn = await amqp.connect(CLOUDAMQP_URL);
  const channel = await conn.createChannel();
  return channel;
}