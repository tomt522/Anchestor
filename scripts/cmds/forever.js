const axios = require("axios");
const {
  getStreamFromURL
} = global.utils;
module.exports = {
  'config': {
    'name': "forever",
    'aliases': ['2'],
    'version': "1.1",
    'author': "Samir \u0153",
    'countDown': 0x5,
    'role': 0x0,
    'shortDescription': {
      'en': "Create image from your text"
    },
    'longDescription': {
      'en': "Create image from your text"
    },
    'category': "info",
    'guide': {
      'en': "   {pn} <prompt>: create image from your text"
    }
  },
  'langs': {
    'en': {
      'syntaxError': "\u26A0\uFE0F Please enter prompt",
      'error': "\u2757 An error has occurred, please try again later"
    }
  },
  'onStart': async function ({
    message: _0x137c83,
    args: _0x2cd595,
    getLang: _0x53021e
  }) {
    const _0x497dd6 = _0x2cd595.join(" ");
    if (!_0x497dd6) {
      return _0x137c83.reply(_0x53021e("syntaxError"));
    }
    const _0x26848e = await midJourney(_0x497dd6, {});
    const _0x1f987f = _0x26848e[0];
    const _0x52dd81 = await getStreamFromURL(_0x1f987f, "openjourney.png");
    return _0x137c83.reply({
      'attachment': _0x52dd81
    });
  }
};
const ReplicateUtils = {
  'run': async function (_0x1c5e70, _0x558976) {
    let _0x28608b;
    try {
      _0x28608b = await this.create(_0x1c5e70, _0x558976);
    } catch (_0x510bce) {
      throw _0x510bce.response.data;
    }
    while (!["canceled", "succeeded", "failed"].includes(_0x28608b.status)) {
      await new Promise(_0x57b10c => setTimeout(_0x57b10c, 250));
      _0x28608b = await this.get(_0x28608b);
    }
    return _0x28608b.output;
  },
  async 'get'(_0x1f4aab) {
    if (_0x1f4aab.prediction) {
      return _0x1f4aab.prediction;
    }
    const _0x3ddffb = new AbortController();
    const _0x5318f1 = setTimeout(() => _0x3ddffb.abort(), 29000);
    const _0x5c58e6 = await axios.get("https://replicate.com/api/models" + _0x1f4aab.version.model.absolute_url + "/versions/" + _0x1f4aab.version_id + "/predictions/" + _0x1f4aab.uuid, {
      'signal': _0x3ddffb.signal
    }).then(_0x62b4b2 => _0x62b4b2.data);
    clearTimeout(_0x5318f1);
    return _0x5c58e6;
  },
  'create'(_0x58a480, _0x5c3a31) {
    const [_0x267708, _0x4c284a] = _0x58a480.split(':');
    return axios({
      'url': "https://replicate.com/api/models/" + _0x267708 + "/versions/" + _0x4c284a + "/predictions",
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'data': JSON.stringify({
        'inputs': _0x5c3a31
      })
    }).then(_0x2461b0 => _0x2461b0.data);
  }
};
const midJourney = async (_0x5b67b8, _0x49d7c6 = {}) => await ReplicateUtils.run("ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463", {
  'prompt': _0x5b67b8,
  ..._0x49d7c6
});
