package com.tckxjzc.anime.domain

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

class AnimeItem(var title: String, var date: String, var size: String, var link: String, var torrent: String) {
    fun toWritableMap(): WritableMap {
        val writableMap = Arguments.createMap()
        writableMap.putString("key",link);
        writableMap.putString("title",title);
        writableMap.putString("date",date);
        writableMap.putString("size",size);
        writableMap.putString("link",link);
        writableMap.putString("title",title);
        writableMap.putString("torrent",torrent);

        return  writableMap
    }
}