import { formatTimer } from '../helpers';

describe('formatTimer', () => {
  it('shoudl work for sample time', () => {
    expect(formatTimer(1234567)).toEqual('42:56:07');
    expect(formatTimer(0)).toEqual('00:00:00');
    expect(formatTimer(60)).toEqual('00:01:00');
    expect(formatTimer(4.275)).toEqual('00:00:04');
    expect(formatTimer(3600)).toEqual('01:00:00');
    expect(formatTimer(-1)).toEqual('00:00:00');
  });
});
