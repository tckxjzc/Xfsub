package com.tckxjzc.anime.react

import android.util.Log
import com.facebook.react.bridge.*
import com.tckxjzc.anime.domain.AnimeItem
import org.jsoup.nodes.Element
import org.jsoup.parser.Parser
import java.util.regex.Pattern

class HTMLParseModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {
    override fun getName(): String {
        return "HTMLParse"
    }

    @ReactMethod
    fun parseLists(html: String, callback: Callback) {
        val writableArray = Arguments.createArray()

        val document = Parser.parse(html, "localhost")
        val items = document
                .getElementsByClass("content_list")[0]
                .getElementsByClass("lists")[0]
                .getElementsByTag("li")
        val iterator = items.iterator()
        while (iterator.hasNext()) {
            val item = iterator.next()
            writableArray.pushMap(parseItem(item).toWritableMap())

        }
        callback.invoke(writableArray)
    }

    @ReactMethod
    fun parseDetails(html: String, callback: Callback) {
        val writableMap = Arguments.createMap()
        val document = Parser.parse(html, "localhost")
        val down = document
                .getElementsByClass("down")[0]
                .getElementsByClass("l")[1]
                .getElementsByTag("a")[0]
        val link = down.attr("onclick");
        val pattern = "magnet:\\?xt=urn:btih:[A-Za-z0-9]+"
        val compile = Pattern.compile(pattern);
        val matcher = compile.matcher(link);
        if (matcher.find()) {
            writableMap.putString("link", matcher.group(0));
        } else {
            writableMap.putString("link", link);
        }


        val images = document
                .getElementsByClass("data_content")[0]
                .getElementsByClass("content detail")[0]
                .getElementsByTag("img");
        if (images.size > 0) {
            writableMap.putString("image", images[0].attr("src"))
        }

        callback.invoke(writableMap);
    }
    @ReactMethod
    fun parseMaxPage(html: String, callback: Callback){
        val document = Parser.parse(html, "localhost")
        callback.invoke(parserMaxPage(document))
    }


    private fun parseItem(element: Element): AnimeItem {
        val nameElement = element.getElementsByClass("name")[0]
        val a = nameElement.getElementsByTag("a")
        val torrent = a[0].attr("href")
        val link = a[1].attr("href")
        val title = a[1].text()
        val menuElement = element.getElementsByClass("menu")[0]
        val spans = menuElement.getElementsByTag("span")
        val date = spans[0].textNodes()[0].text();
        val size = spans[1].textNodes()[0].text();
        return AnimeItem(title, date, size, link, torrent)

    }

    private fun parserMaxPage(element: Element): Int {
        val page = element.getElementsByClass("pages clear");
        if (page.size <= 0) {
            return 1
        }
        val pages=page[0].getElementsByTag("a")
        val maxPage=pages[pages.size-2].text()
        var max:Int=1;
        try {
            max=Integer.parseInt(maxPage)
        }catch (e:Exception){

        }

        return max
    }
}