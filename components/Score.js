import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goNoGo: 'GO',
      totalScore: '',
    };
  }

  calcScore() {
    var e = this.props.mosLevel;

    var totalScore =
      Number(this.props.dlScore) +
      Number(this.props.ptScore) +
      Number(this.props.puScore) +
      Number(this.props.sdcScore) +
      Number(this.props.ltScore) +
      Number(this.props.runScore);

    if (e == 1 || e == 2 || e == 3) {
      if (isNaN(totalScore)) {
        return (
          <Text
            style={{
              color: 'red',
              fontSize: hp('2%'),
              fontWeight: '500',
              textAlign: 'center',
            }}>
            FAIL
          </Text>
        );
      }
      if (e == 1 && totalScore == 420) {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: hp('2%'),
              fontWeight: '500',
              width: '100%',
              textAlign: 'center',
            }}>
            {totalScore}/600
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: hp('2%'),
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {totalScore}/600
          </Text>
        );
      }
    } else {
      return (
        <Text
          style={{
            color: '#d6d6d6',
            fontSize: hp('2%'),
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {totalScore}/600
        </Text>
      );
    }
  }

  goNoGo() {
    var e = this.props.mosLevel;

    if (e == 1 || e == 2 || e == 3) {
      var scoresAboveZero =
        this.props.dlScore > 0 &&
        this.props.ptScore > 0 &&
        this.props.puScore > 0 &&
        this.props.sdcScore > 0 &&
        this.props.ltScore > 0 &&
        this.props.runScore > 0;

      var scoresUndefined =
        this.props.dlScore == undefined ||
        this.props.ptScore == undefined ||
        this.props.puScore == undefined ||
        this.props.sdcScore == undefined ||
        this.props.ltScore == undefined ||
        this.props.runScore == undefined;

      var scoresEqualFail =
        isNaN(this.props.dlScore) ||
        isNaN(this.props.ptScore) ||
        isNaN(this.props.puScore) ||
        isNaN(this.props.sdcScore) ||
        isNaN(this.props.ltScore) ||
        isNaN(this.props.runScore);

      var scoresNotEntered =
        this.props.dlScore == 0 ||
        this.props.ptScore == 0 ||
        this.props.puScore == 0 ||
        this.props.sdcScore == 0 ||
        this.props.ltScore == 0 ||
        this.props.runScore == 0;

      if (scoresAboveZero) {
        if (e == 1 && this.totalScore < 420) {
          return (
            <Text
              style={{
                color: 'red',
                fontSize: hp('2%'),
                fontWeight: '500',
                width: '100%',
                textAlign: 'center',
              }}>
              NO-GO
            </Text>
          );
        } else if (e == 2 && this.totalScore < 390) {
          return (
            <Text
              style={{
                color: 'red',
                fontSize: hp('2%'),
                fontWeight: '500',
                width: '100%',
                textAlign: 'center',
              }}>
              NO-GO
            </Text>
          );
        } else if (e == 3 && this.totalScore < 360) {
          return (
            <Text
              style={{
                color: 'red',
                fontSize: hp('2%'),
                fontWeight: '500',
                width: '100%',
                textAlign: 'center',
              }}>
              NO-GO
            </Text>
          );
        } else {
          return (
            <Text
              style={{
                color: '#507858',
                fontSize: hp('2%'),
                fontWeight: '500',
                width: '100%',
                textAlign: 'center',
              }}>
              GO
            </Text>
          );
        }
      } else if (scoresEqualFail || scoresUndefined) {
        return (
          <Text
            style={{
              color: 'red',
              fontSize: hp('2%'),
              fontWeight: '500',
              width: '100%',
              textAlign: 'center',
            }}>
            NO-GO
          </Text>
        );
      } else if (scoresNotEntered) {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: hp('1.8%'),
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Enter Scores
          </Text>
        );
      }
    } else {
      return (
        <Text
          style={{
            color: '#d6d6d6',
            fontSize: hp('2%'),
            fontWeight: '500',
            textAlign: 'center',
          }}>
          GO/NO-GO
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.mainScoreContainer}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreOutput1}>{this.calcScore()}</View>
        </View>
        <View style={styles.goContainer}>
          <View style={styles.scoreOutput2}>{this.goNoGo()}</View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.scoreButton}
            onPress={() => this.props.clearState()}>
            <Text style={{
              color: '#507858', fontWeight: 'bold', fontSize: hp('1.8%'),
            }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreOutput1: {
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: 1,
    width: wp('23%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scoreOutput2: {
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: 1,
    width: wp('25%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: hp('5%'),
    width: hp('9%'),
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#507858',
  },
  mainScoreContainer: {
    flexDirection: 'row',
    padding: wp('2%'),
    justifyContent: 'space-evenly',
  },
  scoreContainer: {
    width: wp('32%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  goContainer: {
    width: wp('32%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
