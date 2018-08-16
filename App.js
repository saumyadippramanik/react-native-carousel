import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';

const data = ['https://firebasestorage.googleapis.com/v0/b/mindi-c8171.appspot.com/o/sharedImages%2FtothOM4OivWaRUntBFLsDmNKfPZ2%2F636662014433662464.jpg?alt=media&token=7cd1c9cd-a018-4ed1-a784-05298cd36037',
  'https://firebasestorage.googleapis.com/v0/b/mindi-c8171.appspot.com/o/sharedImages%2FtothOM4OivWaRUntBFLsDmNKfPZ2%2F636662014609458944.jpg?alt=media&token=319ba0f5-cab2-4f53-a948-ab73c1660e43',
  'https://firebasestorage.googleapis.com/v0/b/mindi-c8171.appspot.com/o/sharedImages%2FtothOM4OivWaRUntBFLsDmNKfPZ2%2F636662014439784192.jpg?alt=media&token=b5204316-33c6-48a3-b1f4-5df9ca7cc1c3'];
const transition_time = 2000;
const autoScrollAnimation = true;
const scrollReturnAnimation = true;
const imageResizeType = "stretch";
const cardHeight = Dimensions.get("window").width / 2;
const cardWidth = Dimensions.get("window").width;

export default class App extends Component {

  state = {
    bannerX: 0,
    firstImageLoaded: false
  }

  autoScrollBanner() {
    this.intervalId = setInterval(() => {
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      if (this.state.bannerX == Dimensions.get("window").width * (data.length - 1)) {
        this.state.bannerX = 0;
        this.setState({ currentPage: 0 });
        scrollResponder.scrollResponderScrollTo({
          x: this.state.bannerX,
          y: 0,
          animated: scrollReturnAnimation
        });
      } else {
        this.setState({ currentPage: (this.state.currentPage += 1) });
        scrollResponder.scrollResponderScrollTo({
          x: (this.state.bannerX += Dimensions.get("window").width),
          y: 0,
          animated: autoScrollAnimation
        });
      }
    }, transition_time);
  }

  cardTapped(index) {
    alert('Carousel card tapped')
  }

  render() {
    return (
      <ScrollView ref="scrollView" horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
        {data.map(function (object, i) {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={styles.bannerView}
              onPress={() => this.cardTapped()}>
              <Image
                source={{ uri: object }}
                style={styles.slide}
                resizeMode={imageResizeType}
                onLoad={() => {
                  if (!this.state.firstImageLoaded) {
                    this.state.firstImageLoaded = true;
                    this.autoScrollBanner();
                  }
                }}
              />
            </TouchableOpacity>
          );
        }, this)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bannerView: {
    alignSelf: 'center',
    height: cardHeight,
    width: cardWidth,
    backgroundColor: '#E2E2E2'
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
