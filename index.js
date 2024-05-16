const compressor = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

module.exports = {
  onPostBuild: async ({ inputs, constants, utils }) => {

    // Only continue in the selected deploy contexts
    if( !inputs.contexts.includes(process.env.CONTEXT) ) {
      console.log('Not minifiying JS in the context:', process.env.CONTEXT);
      return;
    }

    // Minify JS
    console.log('Minifiying JS in the deploy context:', process.env.CONTEXT);
    console.log('Minifiying JS with these options:', inputs.minifierOptions || "Default");

    try {
      await compressor({
        compressor: uglifyJS,
        input: constants.PUBLISH_DIR + '/**/*.js',
        output: '$1.js',
        replaceInPlace: true
      });


    } catch (error) {
      utils.build.failPlugin('The Minify JS plugin failed.', { error })
    }

  }

}
