import _ from 'underscore';
import votingTemplate from '../../templates/build/voting';

export default function votingBlock (voting) {
    if (!voting || !voting['Options'] || !voting['Options'].length) {
        return '';
    }

    var options = voting['Options'];

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

    // TODO: fix mismatch countsPercent as '.post-voting-bar' width and countsPercent as number
    // because rendered result is reversed.
    // Raw workaround:
    let votingWidth = _.clone(countsPercent);
    votingWidth.reverse();

    var max = Math.max.apply(null, countsPercent);

    options = _.map(options, (option, index) => {
        _.extend(option, {
            isOptionMax: max == countsPercent[index],
            votingNum: index + 1,
            votingWidth: votingWidth[index],
            votingPercent: countsPercent[index],
            votingCaption: option['Option']
        });
        return option;
    });

    return votingTemplate({
        Id: voting['Id'],
        Header: voting['Header'],
        OveralVotes: '(' + overal + ' vote' + (overal > 1 ? 's' : '') + ')',
        Options: options
    })
}