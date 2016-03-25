import _ from 'underscore';

export default function voting (voting) {
    if (!voting || !voting['Options'] || !voting['Options'].length) {
        return '';
    }

    var options = voting['Options'];
    var html = [];

    var overal = 0;
    var counts = _.map(options, function(option) {
        overal += option['VoteCount'] || 0;
        return option['VoteCount'] || 0;
    });

    var percentOveral = 0;
    var countsPercent = _.map(counts, function(count, index) {
        var v = overal > 0  && index > 0 ? Math.round((count / overal) * 10000) / 100 : 0;
        percentOveral += v;
        return v;
    });
    countsPercent[0] = Math.round((100 - percentOveral) * 100) / 100;

    var max = Math.max.apply(null, countsPercent);

    if (voting['Header']) {
        html.push('<div class="post-voting-header">' + voting['Header'] +
            ' (' + overal + ' vote' + (overal > 1 ? 's' : '') + ')</div>');
    }

    for (var i = 0, option; option = options[i]; i++) {
        html.push('<div class="post-voting-option' +
            (max == countsPercent[i] ? ' post-voting-option-max' : '') +
            (option['Correct'] ? ' post-voting-option-correct' : '') + '">' +
            '<div class="post-voting-bar" style="width: ' + countsPercent[i] + '%;"></div>' +
            '<div class="post-voting-body">' +
            '<span class="post-voting-num">' + (i + 1) + '</span>' +
            '<span class="post-voting-percent">' + countsPercent[i] + '% (' + counts[i] + ')</span>' +
            '<span class="post-voting-caption">' + option['Option'] + '</span>' +
            '</div></div>');
    }

    return '<div class="post-voting">' + html.join('') + '</div>';
}