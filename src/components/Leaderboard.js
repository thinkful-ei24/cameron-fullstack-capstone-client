import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchLeaderboard } from '../actions/leaderboard-actions';

export class Leaderboard extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchLeaderboard());
  }
  niceResults() {
    const { leaderboard } = this.props;
    let results = [{
      place: 1,
      username: leaderboard[0].username,
      score: leaderboard[0].score
    }];
    let place = 1;
    for (let i = 1; i < leaderboard.length; i++) {
      // want users with the same score to have the same place on the leaderboard
      if (leaderboard[i].score < leaderboard[i - 1].score) {
        place = i - 1;
      }
      const newResult = {
        place,
        username: leaderboard[i].username,
        score: leaderboard[i].score
      };
      results.push(newResult)
    }
    return results;
  }
  render() {
    if(!this.props.leaderboard){
      return <div>Sorry, results are not available at this time</div>
    }
    return (
      <div>{this.niceResults().map(obj => obj.score)}</div>
    );
  }
};

const mapStateToProps = (state) => ({
  leaderboard: state.selectionReducer.leaderboard
})
export default requiresLogin()(connect(mapStateToProps)(Leaderboard));