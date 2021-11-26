"use strict";

const amqp = require('amqplib');

module.exports = async() => { 
  const conn = await amqp.connect("amqps://jbspisew:codAlPoy4A1swX0ORL60nB1tpGcdAykj@fish.rmq.cloudamqp.com/jbspisew");
  const channel = await conn.createChannel();
  return channel;
}