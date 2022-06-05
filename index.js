onload = async function() {
    const musicboxs = document.querySelectorAll(".musicbox");
    const musicboxs_ = document.querySelectorAll(".musicbox-");
    const colunebox = document.querySelectorAll(".columnBox");
    const rankpage = document.querySelector("#rank");
    const bottom = this.document.querySelector("#bottom");
    const recom = await fetch("http://124.221.249.219:8000/api/recommendations", {
        method: "GET",
    })
    const recomData = await recom.json();

    for (let i = 0; i < musicboxs.length; i++) {
        let icon = document.createElement("img");
        icon.src = '/images/QQMUSIC_WHITE.png';
        icon.id = "icon";
        let cover = document.createElement('img');
        let view = document.createElement("span");
        let viewtext = document.createElement("span");
        let viewicon = document.createElement("img");
        viewicon.src = "/images/播放2.png";
        viewtext.innerHTML = recomData.offical[i].views + "万";
        view.className = "bubble";
        view.appendChild(viewicon);
        view.appendChild(viewtext);
        cover.src = recomData.offical[i].cover;
        musicboxs[i].appendChild(cover);
        let musiclistname = document.createElement('span');
        musiclistname.className = "musicbox-name";
        musiclistname.innerHTML = recomData.offical[i].title;
        musicboxs[i].appendChild(musiclistname);
        musicboxs[i].appendChild(view);
        musicboxs[i].appendChild(icon);
    }

    for (let i = 0; i < musicboxs_.length; i++) {
        let cover = document.createElement('img');
        let view = document.createElement("span");
        let viewtext = document.createElement("span");
        let viewicon = document.createElement("img");
        viewicon.src = "/images/播放2.png";
        viewtext.innerHTML = recomData.tatsujin[i].views + "万";
        view.className = "bubble";
        view.appendChild(viewicon);
        view.appendChild(viewtext);

        cover.src = recomData.tatsujin[i].cover;
        musicboxs_[i].appendChild(cover);

        let musiclistname = document.createElement('span');
        musiclistname.className = "musicbox-name";
        musiclistname.innerHTML = recomData.tatsujin[i].title;
        musicboxs_[i].appendChild(musiclistname);
        musicboxs_[i].appendChild(view);
    }

    for (let i = 0; i < colunebox.length; i++) {
        let cover = document.createElement('img');
        cover.src = recomData.column[i].background;
        let titleBox = document.createElement("span");
        let title = document.createElement("span");
        let icon = document.createElement("img");
        icon.src = recomData.column[i].icon;
        title.innerHTML = recomData.column[i].title;
        titleBox.className = "columnTitle";
        titleBox.appendChild(icon);
        titleBox.appendChild(title);
        colunebox[i].appendChild(cover);
        let description = document.createElement('span');
        description.class = "musicbox-name";
        description.innerHTML = recomData.column[i].description;
        colunebox[i].appendChild(description);
        colunebox[i].appendChild(titleBox);
    }

    //热门搜索
    const hotsearch = document.querySelector(".hotnames");
    const hotsearchhead = document.querySelectorAll(".head1");
    const hotnames = await fetch("http://124.221.249.219:8000/api/hot", {
        method: "GET",
    })
    const hotData = await hotnames.json();
    for (let i = 0; i < hotData.length; i++) {
        let tag = document.createElement('span')
        tag.className = "tags";
        tag.innerHTML = hotData[i];
        hotsearch.appendChild(tag);
    }
    const searchText = document.querySelector("#searchtext");
    const searchBox = document.querySelector(".searchFeedback");
    const already = [];
    document.addEventListener("keydown", keydown);

    async function search() {
        if (searchText.value != '' && await ifAlread())
            already.push(searchText.value);
        history();
        const searchFeedback = await fetch("http://124.221.249.219:8000/api/search?keyword=" + searchText.value, {
            method: "GET",
        })
        const musics = await searchFeedback.json();

        while (searchBox.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            searchBox.removeChild(searchBox.firstChild);
        }
        for (let i = 0; i < musics.length; i++) {
            let title = document.createElement('h3');
            title.className = "musicTitle";
            title.innerHTML = musics[i].title;
            searchBox.appendChild(title);
            let artist = document.createElement('p');
            artist.className = "musicArtist";
            for (let j = 0; j < musics[i].artist.length; j++) {
                if (j == 0)
                    artist.innerHTML += musics[i].artist[j];
                else
                    artist.innerHTML += ' · ' + musics[i].artist[j];
            }
            searchBox.appendChild(artist);

        }
        bottom.style.display = "none";
        hotsearch.style.display = "none";
        hotsearchhead[0].style.display = "none";
        hotsearchhead[1].style.display = "none";
        historyList.style.display = "none";
        searchPage2.style.display = "block";
    }
    //检测是否重复
    async function ifAlread() {
        for (let i = 0; i < already.length; i++) {
            if (already[i] == searchText.value)
                return 0;
        }
        return 1;
    }


    //搜索
    async function keydown(event) {
        if (event.keyCode == 13) {
            console.log(await ifAlread());
            if (searchText.value != '' && await ifAlread())
                already.push(searchText.value);
            history();
            // console.log(already);

            if (searchText.value == '') {
                while (searchBox.hasChildNodes()) //清屏
                {
                    searchBox.removeChild(searchBox.firstChild);
                }
                hotsearch.style.display = "block";
                hotsearchhead[1].style.display = "block";
                hotsearchhead[0].style.display = "block";
                historyList.style.display = "block";
                clickktag();
                alert("输入错误!");

                return;
            }
            const searchFeedback = await fetch("http://124.221.249.219:8000/api/search?keyword=" + searchText.value, {
                method: "GET",
            })
            const musics = await searchFeedback.json();

            while (searchBox.hasChildNodes()) //当div下还存在子节点时 循环继续
            {
                searchBox.removeChild(searchBox.firstChild);
            }
            for (let i = 0; i < musics.length; i++) {
                let title = document.createElement('h3');
                title.className = "musicTitle";
                title.innerHTML = musics[i].title;
                searchBox.appendChild(title);
                let artist = document.createElement('p');
                artist.className = "musicArtist";
                for (let j = 0; j < musics[i].artist.length; j++) {
                    if (j == 0)
                        artist.innerHTML += musics[i].artist[j];
                    else
                        artist.innerHTML += ' · ' + musics[i].artist[j];
                }
                searchBox.appendChild(artist);

            }
            hotsearch.style.display = "none";
            hotsearchhead[0].style.display = "none";
            hotsearchhead[1].style.display = "none";
            historyList.style.display = "none";
            searchPage2.style.display = "block";

        }
    }
    //历史搜索
    const historyList = document.querySelector(".historynames");
    async function history() {
        while (historyList.hasChildNodes()) //清屏
        {
            historyList.removeChild(historyList.firstChild);
        }
        for (let i = 0; i < already.length; i++) {
            let tag = document.createElement('span');
            tag.className = "tags";
            tag.innerHTML = already[i];
            historyList.appendChild(tag);
        }
    }
    //搜索栏
    const recomPage = document.querySelector("#recom");
    const searchPage = document.querySelector("#searchpage");
    const goToSearchPage = document.querySelector("#goToSearchpage");
    const cancel = document.querySelector("#cancel");
    const searchPage2 = document.querySelector("#searchpage-2");
    const searchPage1 = document.querySelector(".hotsearch");
    goToSearchPage.addEventListener("click", async() => {
        recomPage.style.display = "none";
        bottom.style.display = "none";
        searchPage.style.display = "block";
        searchPage2.style.display = "none";
        searchPage1.style.display = "block";
    })
    cancel.addEventListener("click", async() => {
        recomPage.style.display = "block";
        bottom.style.display = "block";
        searchPage1.style.display = "block";
        hotsearchhead[0].style.display = "block";
        hotsearchhead[1].style.display = "block";
        historyList.style.display = "block";
        searchPage2.style.display = "none";
        searchPage.style.display = "none";
        searchText.value = '';
        hotsearch.style.display = "block";
        clickktag();
    })

    //tap栏
    const tabtext = document.querySelectorAll(".tab_");
    const tabunderline = document.querySelectorAll(".tab-line");
    console.log(tabtext)
    console.log(tabunderline)
    tabtext[0].addEventListener("click", async() => {
        tabtext[0].style.color = "#22D59C";
        tabtext[1].style.color = "#c0c0c0";
        tabunderline[0].style.background = "#22D59C";
        tabunderline[1].style.background = "white";
        recomPage.style.display = "block";
        searchPage.style.display = "none";
        rankpage.style.display = "none";

    })
    tabtext[1].addEventListener("click", async() => {
        tabtext[1].style.color = "#22D59C";
        tabtext[0].style.color = "#c0c0c0";
        tabunderline[1].style.background = "#22D59C";
        tabunderline[0].style.background = "white";
        rankpage.style.display = "block";
        recomPage.style.display = "none";
        searchPage.style.display = "none";

    })

    //rank
    const rankList = await fetch("http://124.221.249.219:8000/api/ranking", {
        method: "GET",
    })
    const rankListres = await rankList.json();
    for (let i = 0; i < rankListres.length; i++) {
        const box = document.createElement("div");
        box.className = "rankbox";
        const bubble_rank = document.createElement("span");
        const bub_up = document.createElement("span");
        const bub_down = document.createElement("span");
        const bub_rank_img = document.createElement("img");
        const bub_rank_text = document.createElement("span");
        bub_up.innerHTML = "每" + rankListres[i].update_frequence + "更新";
        bub_rank_img.src = "/images/播放2.png";
        bub_rank_text.innerHTML = rankListres[i].views + "万";
        bub_down.appendChild(bub_rank_img);
        bub_down.appendChild(bub_rank_text);
        bub_down.className = "bubble2";
        bub_up.className = "bubble3";
        // box.appendChild(bub_down);

        const list = document.createElement("div");
        list.className = "musiclist";
        const cover = document.createElement("img");
        cover.src = rankListres[i].cover;
        cover.className = "rankcover";
        const title = document.createElement("h2");
        title.innerHTML = rankListres[i].title;
        list.appendChild(title);
        // console.log(rankListres[i].top3.length);
        for (let j = 0; j < rankListres[i].top3.length; j++) {
            const musicbox = document.createElement("div");
            const num = document.createElement("p");
            const musicname = document.createElement("p");
            const artist = document.createElement("p");
            num.innerHTML = j + 1 + '.';
            num.className = 'num';
            musicbox.className = "innerlist";
            musicname.innerHTML = rankListres[i].top3[j].title + '-';
            artist.innerHTML = rankListres[i].top3[j].artist[0];
            artist.className = 'artists';
            musicbox.appendChild(num);
            musicbox.appendChild(musicname);
            musicbox.appendChild(artist);
            list.appendChild(musicbox);
        }
        box.appendChild(list);
        box.appendChild(cover);
        rankpage.appendChild(box);
        rankpage.appendChild(bub_down);
        rankpage.appendChild(bub_up);
    }
    async function clickktag() {
        const tags = document.querySelectorAll(".tags");
        for (let i = 0; i < tags.length; i++) {
            tags[i].addEventListener("click", async() => {
                searchText.value = tags[i].innerHTML;
                search();
            })
        }
    }
    clickktag();
}