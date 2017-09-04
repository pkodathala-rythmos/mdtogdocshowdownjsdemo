var showdown  = require('showdown');

    var express = require('express');
    var request = require('request');
    var fs = require('fs');
    var bodyParser = require('body-parser').json();
    
    var app = express();
    //app.use(express.static(path.join(__dirname, 'app')));
    app.post('/api/convertMdToHtml',bodyParser, function(req, res) {
        console.log('received data: ' + req.body);
        request.get(req.body.filePath, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var content = body;
                converter = new showdown.Converter();

                converter.setOption("tables",true);
                 converter.setOption("omitExtraWLInCodeBlocks",true);
                 converter.setOption("noHeaderId",true);
            //     converter.setOption("customizedHeaderId",true);
            //     converter.setOption("ghCompatibleHeaderId",true);
            //     converter.setOption("prefixHeaderId",true);
            //     converter.setOption("rawPrefixHeaderId",true);
            //     converter.setOption("rawHeaderId",true);

                 converter.setOption("parseImgDimensions",true);
                 converter.setOption("headerLevelStart",true);
                 converter.setOption("simplifiedAutoLink",true);
                 converter.setOption("excludeTrailingPunctuationFromURLs",true);
                 converter.setOption("literalMidWordUnderscores",true);
                 converter.setOption("literalMidWordAsterisks",true);
                 converter.setOption("strikethrough",true);
            //     converter.setOption("tablesHeaderId",true);

                 converter.setOption("ghCodeBlocks",true);
                 converter.setOption("tasklists",true);
                 converter.setOption("smoothLivePreview",true);
                 converter.setOption("smartIndentationFix",true);
                 converter.setOption("disableForced4SpacesIndentedSublists",true);
                 converter.setOption("simpleLineBreaks",true);
                // converter.setOption("requireSpaceBeforeHeadingText",true);
                 converter.setOption("ghMentions",true);

                // converter.setOption("ghMentionsLink",true);
                 converter.setOption("encodeEmails",true);
                 converter.setOption("openLinksInNewWindow",true);
                 converter.setOption("backslashEscapesHTMLTags",true);
                

                html= converter.makeHtml(content);
                res.send(html);
            }
        });
    });
    app.listen(process.env.PORT||3000);
    console.log('Listening on port 3000...');