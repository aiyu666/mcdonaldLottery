require('dotenv').config();
const Ajv = require('ajv');
const lotterySchema = require('./schema/lottery.json');

const ajv = new Ajv();

const lottery = require('../module/lottery');

describe('Lottery integration test', () => {
  test('Can get lottery', async () => {
    const resp = await lottery.getLottery(process.env.ACCESS_TOKEN);
    await expect(resp.statusCode).toBe(200);
    await expect(ajv.validate(lotterySchema.getLottery, resp.body)).toBe(true);
    await expect(resp.body.rc).toBe(1);
  });

  test('Can get lottery list', async () => {
    const resp = await lottery.getLotteryList(process.env.ACCESS_TOKEN);
    await expect(resp.statusCode).toBe(200);
    await expect(ajv.validate(lotterySchema.getLotteryList, resp.body)).toBe(true);
    await expect(resp.body.rc).toBe(1);
    await expect(resp.body.rm).toBe('成功');
  });

  test('Can get sticker list', async () => {
    const resp = await lottery.getStickerList(process.env.ACCESS_TOKEN);
    await expect(resp.statusCode).toBe(200);
    await expect(ajv.validate(lotterySchema.getStickerList, resp.body)).toBe(true);
    await expect(resp.body.rc).toBe(1);
    await expect(resp.body.rm).toBe('成功');
  });
});
