'use strict';
const mutate = require('../mutate');

const replaceMethods = Terms => {
  const methods = {
    /**swap this for that */
    replace: function(str1, str2, keepTags) {
      //in this form, we 'replaceWith'
      if (str2 === undefined) {
        return this.replaceWith(str1, keepTags);
      }
      //support capture-group syntax
      // if (str2.match(/\$1\b/)) {
      //   //this is not very well-done and should be handled better:
      //   let captureThis = str1.match(/\[(.+?)\]/);
      //   if (captureThis && captureThis[1]) {
      //     let found = this.match(str1).match(captureThis[1]);
      //     found = found.out('text').trim();
      //     //insert captured-text in the replace string
      //     str2 = str2.replace(/\$1\b/g, found);
      //   }
      // }
      this.match(str1).replaceWith(str2, keepTags);
      return this;
    },

    /**swap this for that */
    replaceWith: function(str, keepTags) {
      let newTs = Terms.fromString(str, this.world);
      newTs.tagger();
      //if instructed, apply old tags to new terms
      if (keepTags) {
        this.terms.forEach((t, i) => {
          let tags = Object.keys(t.tags);
          if (newTs.terms[i] !== undefined) {
            tags.forEach(tg => newTs.terms[i].tag(tg, 'from-memory'));
          }
        });
      }
      let index = this.index();
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, newTs);
      this.terms = newTs.terms;
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(k => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;
