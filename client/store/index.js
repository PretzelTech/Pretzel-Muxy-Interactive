import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  pretzel: {
    track: {
      trackName: 'Let It Go',
      artistName: 'Made Monster',
      albumName: 'Made Monster: Let It Go EP',
      albumArt: 'http://placekitten.com/g/300/300',
      likes: 817546,
      link: 'https://prtzl.to/hashIdHere',
      token: 'hashIdPlayToken'
    },
    history: [
      {
        trackName: 'Death of a King',
        artistName: 'Approaching Nirvana',
        link: 'https://prtzl.to/hashIdHere'
      },
      {
        trackName: 'End of Time (feat. Brenton Mattheus)',
        artistName: 'Jim Yosef',
        link: 'https://prtzl.to/hashIdHere'
      },
      {
        trackName: 'Shooting Stars (feat. Kédo Rebelle & Chloe Dolandis)',
        artistName: 'Alex Doan',
        link: 'https://prtzl.to/hashIdHere'
      }
    ]
  },
  client: {
    vote () {
      // Mockup for Muxy vote helper
      // no-op
    }
  }
}

const getters = {
  option: (state, getters) => (options) => {
    if (options === 'data_fetch.pretzel_track_update.track') {
      return state.pretzel.track
    }
    if (options === 'data_fetch.pretzel_track_update.history') {
      return state.pretzel.history
    }
  }
}

const store = new Vuex.Store({
  state,
  getters
})

export default store
