const e = require('express');
const fs = require('fs');
const path = require('path');
const cart = require('../controller/shoppingCart')

let json = fs.readFileSync(path.join(__dirname, '../database/packages.json'));

function user(string) {
    cart.user(string);
}

function itemsCart() {
    const aux = cart.getSize();
    return aux;
}

function deleteList(){
    cart.deleteList();
}

function total() {
    const aux = cart.total();
    return aux;
}

function addItem(item, cont) {
    item.cont = cont;
    cart.addItem(getItem(item), cont);
}

async function getListItemsCart() {
    const aux = await cart.getList()
    return aux;
}

function getItem(itemAux) {
    const packages = convert();
    let result = null;
    for (let i = 0; i < packages.length; i++) {
        if (itemAux == link(packages[i].cantidad, packages[i].nombre)) {
            result = packages[i];
        }
    }
    return result;
}

function convert() {
    const array = [];
    let parse = JSON.parse(json);
    for (var i in parse) {
        array.push(i, parse[i]);
    }
    return array;
}

function category(social,text) {
    const list = packages();
    for (let i = 0; i < list.length; i++) {
        if(social == list[i].socialMedia && text == list[i].categoryLink){
            return list[i];
        }
    }
    return "";
}

function packages() {
    const list = [];
    const packages = convert();
    for (let i = 0; i < packages.length; i++) {
        if (list.length == 0) {
            const aux = {
                socialMedia: packages[i].redSocial,
                category: packages[i].categoria,
            }
            list.push(aux);
        } else {
            var value = false;
            for (let j = 0; j < list.length; j++) {
                if (packages[i].redSocial == list[j].socialMedia && packages[i].categoria == list[j].category) {
                    value = true;
                }
            }
            if (value == false) {
                const aux = {
                    socialMedia: packages[i].redSocial,
                    category: packages[i].categoria,
                    categoryLink: link("categoria", packages[i].categoria),
                    link: link(packages[i].cantidad, packages[i].nombre)
                }
                list.push(aux);
            }
        }
    }
    return list;
}

function socialMedia(social) {
    const socialMedia = [];
    const packages = convert();
    for (var i in packages) {
        if (packages[i].redSocial == social) {
            packages[i].link = link(packages[i].cantidad, packages[i].nombre)
            packages[i].categoriaLink = link("categoria", packages[i].categoria)
            socialMedia.push(packages[i]);
        }
    }
    return socialMedia;
}

function socialMediaCategory(social, category) {
    const socialMedia = [];
    const packages = convert();
    for (var i in packages) {
        if (packages[i].redSocial == social && link("categoria", packages[i].categoria) == category) {
            packages[i].link = link(packages[i].cantidad, packages[i].nombre)
            packages[i].categoriaLink = link("categoria", packages[i].categoria)
            socialMedia.push(packages[i]);
        }
    }
    return socialMedia;
}

function link(cantidad, nombre) {
    let aux = "";
    if (cantidad == "categoria") {
        aux = nombre;
    } else {
        aux = cantidad + " " + nombre;
    }
    return aux.replace(/ /g, "-");
}

function removeItem(link) {
    let aux = cart.removeItem(link);
    return aux;
}

function package(link) {
    const packages = convert();
    for (var i in packages) {
        if (packages[i].link == link) {
            return packages[i];
        }
    }
    return null;
}

function redSocial(social) {
    const redSocial = {
        fondo: "",
        item: "",
        nombre: "",
        link: ""
    };
    if (social == "facebook") {
        redSocial.fondo = "/img/socialmedia/page-facebook.png",
            redSocial.item = "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            redSocial.nombre = "Facebook";
            redSocial.link = social;
    } else if (social == "instagram") {
        redSocial.fondo = "/img/socialmedia/instagram.jpg",
            redSocial.item = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            redSocial.nombre = "Instagram";
            redSocial.link = social;
    }else if (social == "spotify") {
        redSocial.fondo = "/img/socialmedia/spotify.jpg",
            redSocial.item = "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            redSocial.nombre = "Spotify";
            redSocial.link = social;
    }else if (social == "tiktok") {
        redSocial.fondo = "/img/socialmedia/tiktok.png",
            redSocial.item = "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            redSocial.nombre = "Tik-Tok";
            redSocial.link = social;
    }else if (social == "youtube") {
        redSocial.fondo = "/img/socialmedia/youtube.jpg",
            redSocial.item = "https://images.unsplash.com/photo-1634942536846-e9863ef9e78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
            redSocial.nombre = "YouTube";
            redSocial.link = social;
    }else if (social == "likee") {
        redSocial.fondo = "/img/socialmedia/likee.jpg",
            redSocial.item = "https://st3.depositphotos.com/25497846/36915/v/380/depositphotos_369153430-stock-illustration-vector-illustration-heart-different-colors.jpg?forcejpeg=true",
            redSocial.nombre = "Likee";
            redSocial.link = social;
    }else if (social == "twitch") {
        redSocial.fondo = "/img/socialmedia/twitch.png",
            redSocial.item = "https://img.freepik.com/free-photo/twitch-iconin-3d-rendering_75891-1163.jpg",
            redSocial.nombre = "Twitch";
            redSocial.link = social;
    }else if (social == "telegram") {
        redSocial.fondo = "/img/socialmedia/telegram.jpg",
            redSocial.item = "https://images.unsplash.com/photo-1633354998322-415842c7ee11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1753&q=80",
            redSocial.nombre = "Telegram";
            redSocial.link = social;
    }else if (social == "tidal") {
        redSocial.fondo = "/img/socialmedia/tidal.png",
            redSocial.item = "https://images.macrumors.com/t/YFq7C8XJlzoocYh1et2e9yQ3EBc=/1600x1200/smart/article-new/2019/03/apple-music-tidal.jpg",
            redSocial.nombre = "Tidal";
            redSocial.link = social;
    }else if (social == "twitter") {
        redSocial.fondo = "/img/socialmedia/twitter.png",
            redSocial.item = "https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            redSocial.nombre = "Twitter";
            redSocial.link = social;
    }else if (social == "soundcloud") {
        redSocial.fondo = "/img/socialmedia/soundcloud.webp",
            redSocial.item = "https://cdn.dribbble.com/users/1788471/screenshots/14677222/media/5d9a9386a42c2161e15c7d21458ab54d.png?compress=1&resize=1200x900&vertical=top",
            redSocial.nombre = "SoundCloud";
            redSocial.link = social;
    }
    return redSocial;
}

function item(social, category, item) {
    const socialItems = socialMediaCategory(social, category);
    for (var i in socialItems) {
        if (socialItems[i].redSocial == social) {
            if (socialItems[i].link == item) {
                return socialItems[i];
            }
        }
    }
    return false;
}

module.exports = {
    user, package, redSocial, socialMedia, item, itemsCart, addItem, getListItemsCart, total, removeItem, packages, category, socialMediaCategory ,deleteList
}