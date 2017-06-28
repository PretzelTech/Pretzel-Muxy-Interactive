<template>
  <div class="pretzel--whatsPlaying">
    <div :class="`pretzel--currentTrack ${track && track.token != null ? '' : 'pretzel--currentTrack-noData'}`">
      <div class="pretzel--currentTrack-header">NOW PLAYING</div>
      <img :src="albumArt" />
      <div :title="trackName" class="pretzel--currentTrack-trackName">{{trackName}}</div>
      <div v-if="track && track.token != null" :title="artistName" class="pretzel--currentTrack-artistName">{{artistName}}</div>
      <div class="pretzel--currentTrack-listen">
        <span v-if="track && track.token != null"></span>
        <!-- <span v-if="track && track.token != null"><i class="pretzel-icon-thumbs_up"/> {{likes}}</span> -->
        <a v-if="track && track.token != null" :href="link" target="_blank" rel="noreferrer nofollow">Listen <i class="pretzel-icon-mobile_listen" /></a>
      </div>
    </div>
    <div class="pretzel--previousTrack-section">
      <span>Recently played</span>
    </div>
    <div class="pretzel--previousTrack" v-for="prevTrack in history">
      <div class="pretzel--previousTrack-trackData">
        <div :title="prevTrack.trackName" class="pretzel--previousTrack-trackName pretzel--previousTrack-trackName-overflow">{{prevTrack.trackName}}</div>
        <div :title="prevTrack.artistName" class="pretzel--previousTrack-artistName pretzel--previousTrack-artistName-overflow">{{prevTrack.artistName}}</div>
      </div>
      <div class="pretzel--previousTrack-listenLink">
        <a :href="prevTrack.link" target="_blank" rel="noreferrer nofollow">Listen <i class="pretzel-icon-mobile_listen" /></a>
      </div>
    </div>
    <div v-if="history.length == 0" class="pretzel--previousTrack pretzel--previousTrack-noData">
      <div class="pretzel--previousTrack-trackData">
        <div class="pretzel--previousTrack-trackName pretzel--previousTrack-trackName-overflow">No track history</div>
      </div>
    </div>
    <div class="pretzel--footer">
      <div class="pretzel--pretzelBrand">
        <p>powered by</p>
        <a href="https://pretzel.rocks" target="_blank" rel="noreferrer nofollow">
          <i class="pretzel-icon-brand" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import defaultArt from 'src/assets/images/pretzel/default_artwork.png';

import Messenger from 'shared/js/messenger';

export default {
  name: 'pretzelWhatsPlaying',

  data: () => ({
    track: {},
    history: []
  }),

  computed: {
    ...mapGetters(['option']),

    albumArt() {
      if (this.track && this.track.albumArt) {
        return this.track.albumArt;
      }
      return defaultArt;
    },
    trackName() {
      if (this.track && this.track.trackName) {
        return this.track.trackName;
      }
      return 'No track data';
    },
    artistName() {
      return this.track.artistName;
    },
    albumName() {
      return this.track.albumName;
    },
    link() {
      return this.track.link;
    },
    likes() {
      return (this.track.likes && this.track.likes.toLocaleString('en-US')) || 0;
    }
  },

  mounted() {
    this.track = this.option('data_fetch.pretzel_track_update.track') || {};
    this.history = this.option('data_fetch.pretzel_track_update.history') || [];

    this.listener = Messenger.listen('data-fetch-update', (data) => {
      if (data.name === 'pretzel-track-update') {
        try {
          const pretzelData = JSON.parse(data.value);
          this.track = pretzelData.track || {};
          this.history = pretzelData.history || [];
        } catch (e) {
          // no-op
        }
      }
    });

    this.voteListener = Messenger.listen('vote-update', (data) => {
      if (data.id === `pretzel-track-likes-${this.track.token}`) {
        try {
          const likesParsed = parseInt(data.stats.sum, 10);
          if (likesParsed && !isNaN(likesParsed)) {
            this.track.likes = likesParsed;
          }
        } catch (e) {
          // no-op
        }
      }
    });
  },

  unmounted() {
    Messenger.unlisten(this.listener);
    Messenger.unlisten(this.voteListener);
  }
};
</script>

<style lang="scss">
  @font-face {
    font-family: 'min-pretzel';
    src: url('/static/apps/pretzel/font/min-pretzel.eot?99914314');
    src: url('/static/apps/pretzel/font/min-pretzel.eot?99914314#iefix') format('embedded-opentype'),
         url('/static/apps/pretzel/font/min-pretzel.svg?99914314#min-pretzel') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'min-pretzel';
    src: url('data:application/octet-stream;base64,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') format('woff'),
         url('data:application/octet-stream;base64,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') format('truetype');
  }

   [class^="pretzel-icon-"]:before, [class*=" pretzel-icon-"]:before {
    font-family: "min-pretzel";
    font-style: normal;
    font-weight: normal;
    speak: none;

    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;

    font-variant: normal;
    text-transform: none;

    line-height: 1em;

    margin-left: .2em;
  }
  .pretzel-icon-close:before { content: '\e804'; } /* '' */
  .pretzel-icon-mobile_listen:before { content: '\e808'; } /* '' */
  .pretzel-icon-player_play:before { content: '\e80e'; } /* '' */
  .pretzel-icon-thumbs_up:before { content: '\e810'; } /* '' */
  .pretzel-icon-tracklist_play:before { content: '\e819'; } /* '' */
  .pretzel-icon-brand:before { content: '\e81b'; } /* '' */
  .pretzel-icon-link:before { content: '\e822'; } /* '' */

  $pretzelBrand: #1BB3A4;
  $pretzelGrey:  #262B2A;
  $pretzelWhite: #FFFFFF;
  $pretzelMuted: #A4A4A4;

  .pretzel--pretzelBrand {
    color: $pretzelWhite;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;

    div {
      height: 1em;
      display: flex;
    }

    p {
      font-size: 0.7em!important;
      color: #a4a4a4;
      margin: 0;
    }

    a {
      font-size: 1em;
    }

    i {
      width: 1em;
      height: 1em;
      margin: 0 5px;
      color: $pretzelBrand;
    }
  }
</style>

<style lang="scss">
  $pretzelBrand: #1BB3A4;
  $pretzelBrandAlt: #09566D;
  $pretzelGrey:  #1F2323;
  $pretzelGreyAlt: #262B2A;
  $pretzelDark: #0D0E0E;
  $pretzelWhite: #FFFFFF;
  $pretzelMuted: #A4A4A4;
  $pretzelBorder: rgba(255, 255, 255, 0.3);

  .pretzel--whatsPlaying {
    background-color: $pretzelGrey;
    width: 318px;
    height: 500px;

    text-align: center;

    font-family: 'Open Sans';

    position: relative;
    overflow: hidden;

    color: $pretzelWhite;
    font-size: 14px;

    .pretzel--currentTrack {
      width: 100%;
      height: 285px;

      overflow: hidden;

      background: linear-gradient(180deg, $pretzelBrand, $pretzelBrandAlt);

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      box-sizing: border-box;

      padding-top: 10px;

      img {
        width: 140px;
        height: 140px;

        box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.4);
        margin: 2.5px;
      }

      .pretzel--currentTrack-header {
        margin-bottom: 5px;
        font-size: 1.1em;
        font-weight: 600;
      }

      .pretzel--currentTrack-trackName {
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        width: 80%;
        max-width: 80%;
        margin: 2px 16px;
        min-height: 35px;
        max-height: 35px;
        height: 35px;
        line-height: 35px;
      }

      .pretzel--currentTrack-artistName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        width: 80%;
        max-width: 80%;
        margin-bottom: 5px;
      }

      .pretzel--currentTrack-listen {
        box-sizing: border-box;
        width: 318px;
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
        padding-left: 5px;
        background: $pretzelDark;
        height: 35px;
        max-height: 35px;
        min-height: 35px;
        align-items: center;

        a {
          color: $pretzelBrand;
          text-decoration: none;
        }
      }
    }

    .pretzel--currentTrack-noData {

    }

    .pretzel--previousTrack-section {
      height: 30px;
      max-height: 30px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid $pretzelBorder;
      box-sizing: border-box;
    }

    .pretzel--previousTrack {
      box-sizing: border-box;
      width: 100%;
      height: 55px;

      border-top: 1px solid $pretzelBorder;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      text-align: left;
      padding: 0 10px;

      &:nth-child(3) {
        border-top: none;
      }

      .pretzel--previousTrack-trackName {
        white-space: nowrap;
        width: 100%;
        max-width: 100%;
      }

      .pretzel--previousTrack-trackName-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pretzel--previousTrack-artistName {
        white-space: nowrap;
        width: 100%;
        max-width: 100%;
        color: $pretzelMuted;
        font-size: 12px;
      }

      .pretzel--previousTrack-artistName-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pretzel--previousTrack-trackData {
        max-width: 100%;
        overflow: hidden;
        padding-right: 20px;
        width: 231px;
      }

      .pretzel--previousTrack-listenLink {
        font-size: 14px;
        padding-right: 5px;
        min-width: 64px;

        a {
          text-decoration: none;
          color: $pretzelBrand;
        }
      }
    }

    .pretzel--previousTrack-noData {
      justify-content: center;
      align-items: center;
      text-align: center;

      .pretzel--previousTrack-trackData {
        max-width: 100%;
        overflow: hidden;
        padding-right: 0px;
      }
    }

    .pretzel--footer {
      width: 100%;
      height: 20px;

      position: absolute;
      bottom: 0;

      border-top: 1px solid $pretzelBorder;
    }
  }
</style>
