var test = require('tape');
var nlp = require('../../lib/nlp');

test('question-test :', function(t) {
  [
    'which party was it again?',
    'so then which day was it?',
    'he\'s fun?',
    'but who did you really go with??',
    'go where?!',
    'go with who!?',
    'then you said ... ?',

    //no question-mark..
    'which party was it',
    'which day was it',
    'but who did you go with',
    'what time did you show up',
    `why'd you come so early`,
    `when'll you show up`,
    `where'd you go afterwards`,
    `is it fun`,
    `was it fun`,
    `did you think it was fun`,
    `so, is it fun`,
    `so, where'd you go`,
    `if you said so, why are you upset`,
    `does wayne gretsky skate`
  ].forEach(function(str) {
    var doc = nlp(str);
    t.equal(doc.questions().length, 1, str);
  // t.equal(doc.statements().length, 0, ' --  0-statements');
  });
  t.end();
});

test('statements-test :', function(t) {
  [
    'the thing is, it isn\'t cool',
    'does the orchestra respond, no.',
    'where there is smoke, there\'s fire',
    'does the orchestra ever suck!',
    'when i go fishing i eat plankton'
  // "how he got out of his cage, i don't know",
  // 'who else but the rolling stones...',
  // "what i'd like to say is, thanks for the fish"
  ].forEach(function(str) {
    var doc = nlp(str);
    t.equal(doc.statements().length, 1, str);
  // t.equal(doc.questions().length, 0, ' --  0-questions');
  });
  t.end();
});
