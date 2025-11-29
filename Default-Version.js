// ==UserScript==
// @name         MooMoo.io Texture-Pack Manager
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  https://github.com/RaZoshi
// @author       razoshi
// @match        *://*.moomoo.io/*
// @match        *://*moomoo.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moomoo.io
// @grant        none
// ==/UserScript==

/*
    Author: RaZoshi
    Version: 2025-11-29
    GitHub: https://github.com/RaZoshi
*/

(function() {
    'use strict';

    let resourcePack = {
        pack: "Default"
    };

    const packs = [
        { name: "Default", icon: "https://i.imgur.com/fBgDIOZ.png", desc: "Default Game's Textures" },
        { name: "Old Textures", icon: "https://i.imgur.com/29vGQfg.png", desc: "Murka's Texture Pack" },
        { name: "The Warrior Chronicles", icon: "https://i.imgur.com/MJWtX3o.png", desc: "eXistenZ's Texture Pack" },
        { name: "Red Dragon", icon: "https://i.imgur.com/tMGhbhN.png", desc: "eXistenZ's Texture Pack" },
        { name: "The Black Swordsman", icon: "https://i.imgur.com/7vXJpkE.png", desc: "eXistenZ's Texture Pack" },
        { name: "RSD Pack", icon: "https://i.imgur.com/xkD5fsY.png", desc: "R0YqL & RoTama's Texture Pack" },
    ];

    resourcePack.pack = packs[0].name;

    const overlay = document.createElement("div");
    overlay.id = "rpOverlay";
    overlay.style = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    display: none;
    z-index: 9999;
    justify-content: center;
    align-items: center;
    `;

    const panel = document.createElement("div");
    panel.style = `
    width: 50%;
    height: 65%;
    background: rgba(20,20,20,0);
    border-radius: 8px;
    display: flex;
    gap: 30px;
    padding: 10px;
    color: #fff;
    font-family: sans-serif;
    font-size: 22px;
    box-sizing: border-box;
    `;

    const leftCol = document.createElement("div");
    leftCol.style = `
    flex: 1;
    background: rgba(0,0,0,0.25);
    border-radius: 6px;
    backdrop-filter: blur(15px);
    padding: 10px;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    `;

    const rightCol = document.createElement("div");
    rightCol.style = `
    flex: 1;
    background: rgba(0,0,0,0.25);
    border-radius: 6px;
    backdrop-filter: blur(15px);
    padding: 10px;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    `;

    const leftTitle = document.createElement("div");
    leftTitle.textContent = "Texture Packs";
    leftTitle.style.marginBottom = "10px";
    leftTitle.style.fontSize = "20px";

    const rightTitle = document.createElement("div");
    rightTitle.textContent = "Selected Pack";
    rightTitle.style.marginBottom = "10px";
    rightTitle.style.fontSize = "20px";

    const leftList = document.createElement("div");
    const rightSlot = document.createElement("div");

    leftCol.appendChild(leftTitle);
    leftCol.appendChild(leftList);
    rightCol.appendChild(rightTitle);
    rightCol.appendChild(rightSlot);

    panel.appendChild(leftCol);
    panel.appendChild(rightCol);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function createPackElement(pack, clickable) {
        const wrap = document.createElement("div");
        wrap.style = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        margin-bottom: 6px;
        background: rgba(0,0,0,0.25);
        border-radius: 4px;
        `;

        if (clickable) {
            wrap.style.cursor = "pointer";
            wrap.onmouseenter = () => wrap.style.background = "rgba(0,0,0,0.30)";
            wrap.onmouseleave = () => wrap.style.background = "rgba(0,0,0,0.25)";
            wrap.onclick = () => {
                resourcePack.pack = pack.name;
                renderPacks();
                console.log(pack.name, " | ", resourcePack.pack);
            };
        }

        const img = document.createElement("img");
        img.src = pack.icon;
        img.style.width = "48px";
        img.style.height = "48px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";
        img.style.boxShadow = "0 0 5px rgba(0,0,0,0.8)";

        const textBox = document.createElement("div");
        textBox.style.display = "flex";
        textBox.style.flexDirection = "column";

        const title = document.createElement("div");
        title.textContent = pack.name;
        title.style.fontSize = "16px";

        const desc = document.createElement("div");
        desc.textContent = pack.desc;
        desc.style.fontSize = "16px";
        desc.style.opacity = "0.8";

        textBox.appendChild(title);
        textBox.appendChild(desc);

        wrap.appendChild(img);
        wrap.appendChild(textBox);
        return wrap;
    }

    function renderPacks() {
        leftList.innerHTML = "";
        rightSlot.innerHTML = "";

        const current = packs.find(p => p.name === resourcePack.pack);

        packs.forEach(p => {
            if (p.name === resourcePack.pack) return;
            leftList.appendChild(createPackElement(p, true));
        });

        if (current) {
            rightSlot.appendChild(createPackElement(current, false));
        }
    }

    renderPacks();

    window.addEventListener("keydown", e => {
        if (e.code === "KeyO" && "chatbox" !== document.activeElement.id.toLowerCase()) {
            const shown = overlay.style.display === "flex";
            overlay.style.display = shown ? "none" : "flex";
        }
    });

    (function() {
        const t = document.createElement("link").relList;
        if (t && t.supports && t.supports("modulepreload"))
            return;
        for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
            n(s);
        new MutationObserver(s => {
            for (const r of s)
                if (r.type === "childList")
                    for (const o of r.addedNodes)
                        o.tagName === "LINK" && o.rel === "modulepreload" && n(o)
        }
                            ).observe(document, {
            childList: !0,
            subtree: !0
        });
        function i(s) {
            const r = {};
            return s.integrity && (r.integrity = s.integrity),
                s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
                s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
                r
        }
        function n(s) {
            if (s.ep)
                return;
            s.ep = !0;
            const r = i(s);
            fetch(s.href, r)
        }
    }
    )();
    var Ct = 4294967295;
    function al(e, t, i) {
        var n = i / 4294967296
        , s = i;
        e.setUint32(t, n),
            e.setUint32(t + 4, s)
    }
    function zo(e, t, i) {
        var n = Math.floor(i / 4294967296)
        , s = i;
        e.setUint32(t, n),
            e.setUint32(t + 4, s)
    }
    function Bo(e, t) {
        var i = e.getInt32(t)
        , n = e.getUint32(t + 4);
        return i * 4294967296 + n
    }
    function ll(e, t) {
        var i = e.getUint32(t)
        , n = e.getUint32(t + 4);
        return i * 4294967296 + n
    }
    var Vn, Nn, Un, Rn = (typeof process > "u" || ((Vn = process == null ? void 0 : process.env) === null || Vn === void 0 ? void 0 : Vn.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";
    function vr(e) {
        for (var t = e.length, i = 0, n = 0; n < t; ) {
            var s = e.charCodeAt(n++);
            if (s & 4294967168)
                if (!(s & 4294965248))
                    i += 2;
                else {
                    if (s >= 55296 && s <= 56319 && n < t) {
                        var r = e.charCodeAt(n);
                        (r & 64512) === 56320 && (++n,
                                                  s = ((s & 1023) << 10) + (r & 1023) + 65536)
                    }
                    s & 4294901760 ? i += 4 : i += 3
                }
            else {
                i++;
                continue
            }
        }
        return i
    }
    function cl(e, t, i) {
        for (var n = e.length, s = i, r = 0; r < n; ) {
            var o = e.charCodeAt(r++);
            if (o & 4294967168)
                if (!(o & 4294965248))
                    t[s++] = o >> 6 & 31 | 192;
                else {
                    if (o >= 55296 && o <= 56319 && r < n) {
                        var l = e.charCodeAt(r);
                        (l & 64512) === 56320 && (++r,
                                                  o = ((o & 1023) << 10) + (l & 1023) + 65536)
                    }
                    o & 4294901760 ? (t[s++] = o >> 18 & 7 | 240,
                                      t[s++] = o >> 12 & 63 | 128,
                                      t[s++] = o >> 6 & 63 | 128) : (t[s++] = o >> 12 & 15 | 224,
                                                                     t[s++] = o >> 6 & 63 | 128)
                }
            else {
                t[s++] = o;
                continue
            }
            t[s++] = o & 63 | 128
        }
    }
    var Oi = Rn ? new TextEncoder : void 0
    , hl = Rn ? typeof process < "u" && ((Nn = process == null ? void 0 : process.env) === null || Nn === void 0 ? void 0 : Nn.TEXT_ENCODING) !== "force" ? 200 : 0 : Ct;
    function ul(e, t, i) {
        t.set(Oi.encode(e), i)
    }
    function fl(e, t, i) {
        Oi.encodeInto(e, t.subarray(i))
    }
    var dl = Oi != null && Oi.encodeInto ? fl : ul
    , pl = 4096;
    function Ho(e, t, i) {
        for (var n = t, s = n + i, r = [], o = ""; n < s; ) {
            var l = e[n++];
            if (!(l & 128))
                r.push(l);
            else if ((l & 224) === 192) {
                var c = e[n++] & 63;
                r.push((l & 31) << 6 | c)
            } else if ((l & 240) === 224) {
                var c = e[n++] & 63
                , a = e[n++] & 63;
                r.push((l & 31) << 12 | c << 6 | a)
            } else if ((l & 248) === 240) {
                var c = e[n++] & 63
                , a = e[n++] & 63
                , f = e[n++] & 63
                , d = (l & 7) << 18 | c << 12 | a << 6 | f;
                d > 65535 && (d -= 65536,
                              r.push(d >>> 10 & 1023 | 55296),
                              d = 56320 | d & 1023),
                    r.push(d)
            } else
                r.push(l);
            r.length >= pl && (o += String.fromCharCode.apply(String, r),
                               r.length = 0)
        }
        return r.length > 0 && (o += String.fromCharCode.apply(String, r)),
            o
    }
    var ml = Rn ? new TextDecoder : null
    , gl = Rn ? typeof process < "u" && ((Un = process == null ? void 0 : process.env) === null || Un === void 0 ? void 0 : Un.TEXT_DECODER) !== "force" ? 200 : 0 : Ct;
    function yl(e, t, i) {
        var n = e.subarray(t, t + i);
        return ml.decode(n)
    }
    var en = function() {
        function e(t, i) {
            this.type = t,
                this.data = i
        }
        return e
    }()
    , wl = globalThis && globalThis.__extends || function() {
        var e = function(t, i) {
            return e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(n, s) {
                n.__proto__ = s
            }
            || function(n, s) {
                for (var r in s)
                    Object.prototype.hasOwnProperty.call(s, r) && (n[r] = s[r])
            }
                ,
                e(t, i)
        };
        return function(t, i) {
            if (typeof i != "function" && i !== null)
                throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
            e(t, i);
            function n() {
                this.constructor = t
            }
            t.prototype = i === null ? Object.create(i) : (n.prototype = i.prototype,
                                                           new n)
        }
    }()
    , Je = function(e) {
        wl(t, e);
        function t(i) {
            var n = e.call(this, i) || this
            , s = Object.create(t.prototype);
            return Object.setPrototypeOf(n, s),
                Object.defineProperty(n, "name", {
                configurable: !0,
                enumerable: !1,
                value: t.name
            }),
                n
        }
        return t
    }(Error)
    , vl = -1
    , kl = 4294967296 - 1
    , xl = 17179869184 - 1;
    function bl(e) {
        var t = e.sec
        , i = e.nsec;
        if (t >= 0 && i >= 0 && t <= xl)
            if (i === 0 && t <= kl) {
                var n = new Uint8Array(4)
                , s = new DataView(n.buffer);
                return s.setUint32(0, t),
                    n
            } else {
                var r = t / 4294967296
                , o = t & 4294967295
                , n = new Uint8Array(8)
                , s = new DataView(n.buffer);
                return s.setUint32(0, i << 2 | r & 3),
                    s.setUint32(4, o),
                    n
            }
        else {
            var n = new Uint8Array(12)
            , s = new DataView(n.buffer);
            return s.setUint32(0, i),
                zo(s, 4, t),
                n
        }
    }
    function Sl(e) {
        var t = e.getTime()
        , i = Math.floor(t / 1e3)
        , n = (t - i * 1e3) * 1e6
        , s = Math.floor(n / 1e9);
        return {
            sec: i + s,
            nsec: n - s * 1e9
        }
    }
    function Il(e) {
        if (e instanceof Date) {
            var t = Sl(e);
            return bl(t)
        } else
            return null
    }
    function Tl(e) {
        var t = new DataView(e.buffer,e.byteOffset,e.byteLength);
        switch (e.byteLength) {
            case 4:
                {
                    var i = t.getUint32(0)
                    , n = 0;
                    return {
                        sec: i,
                        nsec: n
                    }
                }
            case 8:
                {
                    var s = t.getUint32(0)
                    , r = t.getUint32(4)
                    , i = (s & 3) * 4294967296 + r
                    , n = s >>> 2;
                    return {
                        sec: i,
                        nsec: n
                    }
                }
            case 12:
                {
                    var i = Bo(t, 4)
                    , n = t.getUint32(0);
                    return {
                        sec: i,
                        nsec: n
                    }
                }
            default:
                throw new Je("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(e.length))
        }
    }
    function Ml(e) {
        var t = Tl(e);
        return new Date(t.sec * 1e3 + t.nsec / 1e6)
    }
    var El = {
        type: vl,
        encode: Il,
        decode: Ml
    }
    , Lo = function() {
        function e() {
            this.builtInEncoders = [],
                this.builtInDecoders = [],
                this.encoders = [],
                this.decoders = [],
                this.register(El)
        }
        return e.prototype.register = function(t) {
            var i = t.type
            , n = t.encode
            , s = t.decode;
            if (i >= 0)
                this.encoders[i] = n,
                    this.decoders[i] = s;
            else {
                var r = 1 + i;
                this.builtInEncoders[r] = n,
                    this.builtInDecoders[r] = s
            }
        }
            ,
            e.prototype.tryToEncode = function(t, i) {
            for (var n = 0; n < this.builtInEncoders.length; n++) {
                var s = this.builtInEncoders[n];
                if (s != null) {
                    var r = s(t, i);
                    if (r != null) {
                        var o = -1 - n;
                        return new en(o,r)
                    }
                }
            }
            for (var n = 0; n < this.encoders.length; n++) {
                var s = this.encoders[n];
                if (s != null) {
                    var r = s(t, i);
                    if (r != null) {
                        var o = n;
                        return new en(o,r)
                    }
                }
            }
            return t instanceof en ? t : null
        }
            ,
            e.prototype.decode = function(t, i, n) {
            var s = i < 0 ? this.builtInDecoders[-1 - i] : this.decoders[i];
            return s ? s(t, i, n) : new en(i,t)
        }
            ,
            e.defaultCodec = new e,
            e
    }();
    function yn(e) {
        return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : Uint8Array.from(e)
    }
    function Cl(e) {
        if (e instanceof ArrayBuffer)
            return new DataView(e);
        var t = yn(e);
        return new DataView(t.buffer,t.byteOffset,t.byteLength)
    }
    var Pl = 100
    , $l = 2048
    , Rl = function() {
        function e(t, i, n, s, r, o, l, c) {
            t === void 0 && (t = Lo.defaultCodec),
                i === void 0 && (i = void 0),
                n === void 0 && (n = Pl),
                s === void 0 && (s = $l),
                r === void 0 && (r = !1),
                o === void 0 && (o = !1),
                l === void 0 && (l = !1),
                c === void 0 && (c = !1),
                this.extensionCodec = t,
                this.context = i,
                this.maxDepth = n,
                this.initialBufferSize = s,
                this.sortKeys = r,
                this.forceFloat32 = o,
                this.ignoreUndefined = l,
                this.forceIntegerToFloat = c,
                this.pos = 0,
                this.view = new DataView(new ArrayBuffer(this.initialBufferSize)),
                this.bytes = new Uint8Array(this.view.buffer)
        }
        return e.prototype.reinitializeState = function() {
            this.pos = 0
        }
            ,
            e.prototype.encodeSharedRef = function(t) {
            return this.reinitializeState(),
                this.doEncode(t, 1),
                this.bytes.subarray(0, this.pos)
        }
            ,
            e.prototype.encode = function(t) {
            return this.reinitializeState(),
                this.doEncode(t, 1),
                this.bytes.slice(0, this.pos)
        }
            ,
            e.prototype.doEncode = function(t, i) {
            if (i > this.maxDepth)
                throw new Error("Too deep objects in depth ".concat(i));
            t == null ? this.encodeNil() : typeof t == "boolean" ? this.encodeBoolean(t) : typeof t == "number" ? this.encodeNumber(t) : typeof t == "string" ? this.encodeString(t) : this.encodeObject(t, i)
        }
            ,
            e.prototype.ensureBufferSizeToWrite = function(t) {
            var i = this.pos + t;
            this.view.byteLength < i && this.resizeBuffer(i * 2)
        }
            ,
            e.prototype.resizeBuffer = function(t) {
            var i = new ArrayBuffer(t)
            , n = new Uint8Array(i)
            , s = new DataView(i);
            n.set(this.bytes),
                this.view = s,
                this.bytes = n
        }
            ,
            e.prototype.encodeNil = function() {
            this.writeU8(192)
        }
            ,
            e.prototype.encodeBoolean = function(t) {
            t === !1 ? this.writeU8(194) : this.writeU8(195)
        }
            ,
            e.prototype.encodeNumber = function(t) {
            Number.isSafeInteger(t) && !this.forceIntegerToFloat ? t >= 0 ? t < 128 ? this.writeU8(t) : t < 256 ? (this.writeU8(204),
                                                                                                                   this.writeU8(t)) : t < 65536 ? (this.writeU8(205),
                                                                                                                                                   this.writeU16(t)) : t < 4294967296 ? (this.writeU8(206),
        this.writeU32(t)) : (this.writeU8(207),
                             this.writeU64(t)) : t >= -32 ? this.writeU8(224 | t + 32) : t >= -128 ? (this.writeU8(208),
                                                                                                      this.writeI8(t)) : t >= -32768 ? (this.writeU8(209),
                                                                                                                                        this.writeI16(t)) : t >= -2147483648 ? (this.writeU8(210),
        this.writeI32(t)) : (this.writeU8(211),
                             this.writeI64(t)) : this.forceFloat32 ? (this.writeU8(202),
                                                                      this.writeF32(t)) : (this.writeU8(203),
                                                                                           this.writeF64(t))
        }
            ,
            e.prototype.writeStringHeader = function(t) {
            if (t < 32)
                this.writeU8(160 + t);
            else if (t < 256)
                this.writeU8(217),
                    this.writeU8(t);
            else if (t < 65536)
                this.writeU8(218),
                    this.writeU16(t);
            else if (t < 4294967296)
                this.writeU8(219),
                    this.writeU32(t);
            else
                throw new Error("Too long string: ".concat(t, " bytes in UTF-8"))
        }
            ,
            e.prototype.encodeString = function(t) {
            var i = 5
            , n = t.length;
            if (n > hl) {
                var s = vr(t);
                this.ensureBufferSizeToWrite(i + s),
                    this.writeStringHeader(s),
                    dl(t, this.bytes, this.pos),
                    this.pos += s
            } else {
                var s = vr(t);
                this.ensureBufferSizeToWrite(i + s),
                    this.writeStringHeader(s),
                    cl(t, this.bytes, this.pos),
                    this.pos += s
            }
        }
            ,
            e.prototype.encodeObject = function(t, i) {
            var n = this.extensionCodec.tryToEncode(t, this.context);
            if (n != null)
                this.encodeExtension(n);
            else if (Array.isArray(t))
                this.encodeArray(t, i);
            else if (ArrayBuffer.isView(t))
                this.encodeBinary(t);
            else if (typeof t == "object")
                this.encodeMap(t, i);
            else
                throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(t)))
        }
            ,
            e.prototype.encodeBinary = function(t) {
            var i = t.byteLength;
            if (i < 256)
                this.writeU8(196),
                    this.writeU8(i);
            else if (i < 65536)
                this.writeU8(197),
                    this.writeU16(i);
            else if (i < 4294967296)
                this.writeU8(198),
                    this.writeU32(i);
            else
                throw new Error("Too large binary: ".concat(i));
            var n = yn(t);
            this.writeU8a(n)
        }
            ,
            e.prototype.encodeArray = function(t, i) {
            var n = t.length;
            if (n < 16)
                this.writeU8(144 + n);
            else if (n < 65536)
                this.writeU8(220),
                    this.writeU16(n);
            else if (n < 4294967296)
                this.writeU8(221),
                    this.writeU32(n);
            else
                throw new Error("Too large array: ".concat(n));
            for (var s = 0, r = t; s < r.length; s++) {
                var o = r[s];
                this.doEncode(o, i + 1)
            }
        }
            ,
            e.prototype.countWithoutUndefined = function(t, i) {
            for (var n = 0, s = 0, r = i; s < r.length; s++) {
                var o = r[s];
                t[o] !== void 0 && n++
            }
            return n
        }
            ,
            e.prototype.encodeMap = function(t, i) {
            var n = Object.keys(t);
            this.sortKeys && n.sort();
            var s = this.ignoreUndefined ? this.countWithoutUndefined(t, n) : n.length;
            if (s < 16)
                this.writeU8(128 + s);
            else if (s < 65536)
                this.writeU8(222),
                    this.writeU16(s);
            else if (s < 4294967296)
                this.writeU8(223),
                    this.writeU32(s);
            else
                throw new Error("Too large map object: ".concat(s));
            for (var r = 0, o = n; r < o.length; r++) {
                var l = o[r]
                , c = t[l];
                this.ignoreUndefined && c === void 0 || (this.encodeString(l),
                                                         this.doEncode(c, i + 1))
            }
        }
            ,
            e.prototype.encodeExtension = function(t) {
            var i = t.data.length;
            if (i === 1)
                this.writeU8(212);
            else if (i === 2)
                this.writeU8(213);
            else if (i === 4)
                this.writeU8(214);
            else if (i === 8)
                this.writeU8(215);
            else if (i === 16)
                this.writeU8(216);
            else if (i < 256)
                this.writeU8(199),
                    this.writeU8(i);
            else if (i < 65536)
                this.writeU8(200),
                    this.writeU16(i);
            else if (i < 4294967296)
                this.writeU8(201),
                    this.writeU32(i);
            else
                throw new Error("Too large extension object: ".concat(i));
            this.writeI8(t.type),
                this.writeU8a(t.data)
        }
            ,
            e.prototype.writeU8 = function(t) {
            this.ensureBufferSizeToWrite(1),
                this.view.setUint8(this.pos, t),
                this.pos++
        }
            ,
            e.prototype.writeU8a = function(t) {
            var i = t.length;
            this.ensureBufferSizeToWrite(i),
                this.bytes.set(t, this.pos),
                this.pos += i
        }
            ,
            e.prototype.writeI8 = function(t) {
            this.ensureBufferSizeToWrite(1),
                this.view.setInt8(this.pos, t),
                this.pos++
        }
            ,
            e.prototype.writeU16 = function(t) {
            this.ensureBufferSizeToWrite(2),
                this.view.setUint16(this.pos, t),
                this.pos += 2
        }
            ,
            e.prototype.writeI16 = function(t) {
            this.ensureBufferSizeToWrite(2),
                this.view.setInt16(this.pos, t),
                this.pos += 2
        }
            ,
            e.prototype.writeU32 = function(t) {
            this.ensureBufferSizeToWrite(4),
                this.view.setUint32(this.pos, t),
                this.pos += 4
        }
            ,
            e.prototype.writeI32 = function(t) {
            this.ensureBufferSizeToWrite(4),
                this.view.setInt32(this.pos, t),
                this.pos += 4
        }
            ,
            e.prototype.writeF32 = function(t) {
            this.ensureBufferSizeToWrite(4),
                this.view.setFloat32(this.pos, t),
                this.pos += 4
        }
            ,
            e.prototype.writeF64 = function(t) {
            this.ensureBufferSizeToWrite(8),
                this.view.setFloat64(this.pos, t),
                this.pos += 8
        }
            ,
            e.prototype.writeU64 = function(t) {
            this.ensureBufferSizeToWrite(8),
                al(this.view, this.pos, t),
                this.pos += 8
        }
            ,
            e.prototype.writeI64 = function(t) {
            this.ensureBufferSizeToWrite(8),
                zo(this.view, this.pos, t),
                this.pos += 8
        }
            ,
            e
    }();
    function Wn(e) {
        return "".concat(e < 0 ? "-" : "", "0x").concat(Math.abs(e).toString(16).padStart(2, "0"))
    }
    var Al = 16
    , Dl = 16
    , Ol = function() {
        function e(t, i) {
            t === void 0 && (t = Al),
                i === void 0 && (i = Dl),
                this.maxKeyLength = t,
                this.maxLengthPerKey = i,
                this.hit = 0,
                this.miss = 0,
                this.caches = [];
            for (var n = 0; n < this.maxKeyLength; n++)
                this.caches.push([])
        }
        return e.prototype.canBeCached = function(t) {
            return t > 0 && t <= this.maxKeyLength
        }
            ,
            e.prototype.find = function(t, i, n) {
            var s = this.caches[n - 1];
            e: for (var r = 0, o = s; r < o.length; r++) {
                for (var l = o[r], c = l.bytes, a = 0; a < n; a++)
                    if (c[a] !== t[i + a])
                        continue e;
                return l.str
            }
            return null
        }
            ,
            e.prototype.store = function(t, i) {
            var n = this.caches[t.length - 1]
            , s = {
                bytes: t,
                str: i
            };
            n.length >= this.maxLengthPerKey ? n[Math.random() * n.length | 0] = s : n.push(s)
        }
            ,
            e.prototype.decode = function(t, i, n) {
            var s = this.find(t, i, n);
            if (s != null)
                return this.hit++,
                    s;
            this.miss++;
            var r = Ho(t, i, n)
            , o = Uint8Array.prototype.slice.call(t, i, i + n);
            return this.store(o, r),
                r
        }
            ,
            e
    }()
    , _l = globalThis && globalThis.__awaiter || function(e, t, i, n) {
        function s(r) {
            return r instanceof i ? r : new i(function(o) {
                o(r)
            }
                                             )
        }
        return new (i || (i = Promise))(function(r, o) {
            function l(f) {
                try {
                    a(n.next(f))
                } catch (d) {
                    o(d)
                }
            }
            function c(f) {
                try {
                    a(n.throw(f))
                } catch (d) {
                    o(d)
                }
            }
            function a(f) {
                f.done ? r(f.value) : s(f.value).then(l, c)
            }
            a((n = n.apply(e, t || [])).next())
        }
                                       )
    }
    , Xn = globalThis && globalThis.__generator || function(e, t) {
        var i = {
            label: 0,
            sent: function() {
                if (r[0] & 1)
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        }, n, s, r, o;
        return o = {
            next: l(0),
            throw: l(1),
            return: l(2)
        },
            typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this
        }
                                           ),
            o;
        function l(a) {
            return function(f) {
                return c([a, f])
            }
        }
        function c(a) {
            if (n)
                throw new TypeError("Generator is already executing.");
            for (; i; )
                try {
                    if (n = 1,
                        s && (r = a[0] & 2 ? s.return : a[0] ? s.throw || ((r = s.return) && r.call(s),
                                                                           0) : s.next) && !(r = r.call(s, a[1])).done)
                        return r;
                    switch (s = 0,
                            r && (a = [a[0] & 2, r.value]),
                            a[0]) {
                        case 0:
                        case 1:
                            r = a;
                            break;
                        case 4:
                            return i.label++,
                                {
                                value: a[1],
                                done: !1
                            };
                        case 5:
                            i.label++,
                                s = a[1],
                                a = [0];
                            continue;
                        case 7:
                            a = i.ops.pop(),
                                i.trys.pop();
                            continue;
                        default:
                            if (r = i.trys,
                                !(r = r.length > 0 && r[r.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                                i = 0;
                                continue
                            }
                            if (a[0] === 3 && (!r || a[1] > r[0] && a[1] < r[3])) {
                                i.label = a[1];
                                break
                            }
                            if (a[0] === 6 && i.label < r[1]) {
                                i.label = r[1],
                                    r = a;
                                break
                            }
                            if (r && i.label < r[2]) {
                                i.label = r[2],
                                    i.ops.push(a);
                                break
                            }
                            r[2] && i.ops.pop(),
                                i.trys.pop();
                            continue
                    }
                    a = t.call(e, i)
                } catch (f) {
                    a = [6, f],
                        s = 0
                } finally {
                    n = r = 0
                }
            if (a[0] & 5)
                throw a[1];
            return {
                value: a[0] ? a[1] : void 0,
                done: !0
            }
        }
    }
    , kr = globalThis && globalThis.__asyncValues || function(e) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var t = e[Symbol.asyncIterator], i;
        return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](),
                                i = {},
                                n("next"),
                                n("throw"),
                                n("return"),
                                i[Symbol.asyncIterator] = function() {
            return this
        }
                                ,
                                i);
        function n(r) {
            i[r] = e[r] && function(o) {
                return new Promise(function(l, c) {
                    o = e[r](o),
                        s(l, c, o.done, o.value)
                }
                                  )
            }
        }
        function s(r, o, l, c) {
            Promise.resolve(c).then(function(a) {
                r({
                    value: a,
                    done: l
                })
            }, o)
        }
    }
    , ai = globalThis && globalThis.__await || function(e) {
        return this instanceof ai ? (this.v = e,
                                     this) : new ai(e)
    }
    , zl = globalThis && globalThis.__asyncGenerator || function(e, t, i) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var n = i.apply(e, t || []), s, r = [];
        return s = {},
            o("next"),
            o("throw"),
            o("return"),
            s[Symbol.asyncIterator] = function() {
            return this
        }
            ,
            s;
        function o(u) {
            n[u] && (s[u] = function(p) {
                return new Promise(function(w, x) {
                    r.push([u, p, w, x]) > 1 || l(u, p)
                }
                                  )
            }
                    )
        }
        function l(u, p) {
            try {
                c(n[u](p))
            } catch (w) {
                d(r[0][3], w)
            }
        }
        function c(u) {
            u.value instanceof ai ? Promise.resolve(u.value.v).then(a, f) : d(r[0][2], u)
        }
        function a(u) {
            l("next", u)
        }
        function f(u) {
            l("throw", u)
        }
        function d(u, p) {
            u(p),
                r.shift(),
                r.length && l(r[0][0], r[0][1])
        }
    }
    , Bl = function(e) {
        var t = typeof e;
        return t === "string" || t === "number"
    }
    , Ii = -1
    , Ys = new DataView(new ArrayBuffer(0))
    , Hl = new Uint8Array(Ys.buffer)
    , Ss = function() {
        try {
            Ys.getInt8(0)
        } catch (e) {
            return e.constructor
        }
        throw new Error("never reached")
    }()
    , xr = new Ss("Insufficient data")
    , Ll = new Ol
    , Fl = function() {
        function e(t, i, n, s, r, o, l, c) {
            t === void 0 && (t = Lo.defaultCodec),
                i === void 0 && (i = void 0),
                n === void 0 && (n = Ct),
                s === void 0 && (s = Ct),
                r === void 0 && (r = Ct),
                o === void 0 && (o = Ct),
                l === void 0 && (l = Ct),
                c === void 0 && (c = Ll),
                this.extensionCodec = t,
                this.context = i,
                this.maxStrLength = n,
                this.maxBinLength = s,
                this.maxArrayLength = r,
                this.maxMapLength = o,
                this.maxExtLength = l,
                this.keyDecoder = c,
                this.totalPos = 0,
                this.pos = 0,
                this.view = Ys,
                this.bytes = Hl,
                this.headByte = Ii,
                this.stack = []
        }
        return e.prototype.reinitializeState = function() {
            this.totalPos = 0,
                this.headByte = Ii,
                this.stack.length = 0
        }
            ,
            e.prototype.setBuffer = function(t) {
            this.bytes = yn(t),
                this.view = Cl(this.bytes),
                this.pos = 0
        }
            ,
            e.prototype.appendBuffer = function(t) {
            if (this.headByte === Ii && !this.hasRemaining(1))
                this.setBuffer(t);
            else {
                var i = this.bytes.subarray(this.pos)
                , n = yn(t)
                , s = new Uint8Array(i.length + n.length);
                s.set(i),
                    s.set(n, i.length),
                    this.setBuffer(s)
            }
        }
            ,
            e.prototype.hasRemaining = function(t) {
            return this.view.byteLength - this.pos >= t
        }
            ,
            e.prototype.createExtraByteError = function(t) {
            var i = this
            , n = i.view
            , s = i.pos;
            return new RangeError("Extra ".concat(n.byteLength - s, " of ").concat(n.byteLength, " byte(s) found at buffer[").concat(t, "]"))
        }
            ,
            e.prototype.decode = function(t) {
            this.reinitializeState(),
                this.setBuffer(t);
            var i = this.doDecodeSync();
            if (this.hasRemaining(1))
                throw this.createExtraByteError(this.pos);
            return i
        }
            ,
            e.prototype.decodeMulti = function(t) {
            return Xn(this, function(i) {
                switch (i.label) {
                    case 0:
                        this.reinitializeState(),
                            this.setBuffer(t),
                            i.label = 1;
                    case 1:
                        return this.hasRemaining(1) ? [4, this.doDecodeSync()] : [3, 3];
                    case 2:
                        return i.sent(),
                            [3, 1];
                    case 3:
                        return [2]
                }
            })
        }
            ,
            e.prototype.decodeAsync = function(t) {
            var i, n, s, r;
            return _l(this, void 0, void 0, function() {
                var o, l, c, a, f, d, u, p;
                return Xn(this, function(w) {
                    switch (w.label) {
                        case 0:
                            o = !1,
                                w.label = 1;
                        case 1:
                            w.trys.push([1, 6, 7, 12]),
                                i = kr(t),
                                w.label = 2;
                        case 2:
                            return [4, i.next()];
                        case 3:
                            if (n = w.sent(),
                                !!n.done)
                                return [3, 5];
                            if (c = n.value,
                                o)
                                throw this.createExtraByteError(this.totalPos);
                            this.appendBuffer(c);
                            try {
                                l = this.doDecodeSync(),
                                    o = !0
                            } catch (x) {
                                if (!(x instanceof Ss))
                                    throw x
                            }
                            this.totalPos += this.pos,
                                w.label = 4;
                        case 4:
                            return [3, 2];
                        case 5:
                            return [3, 12];
                        case 6:
                            return a = w.sent(),
                                s = {
                                error: a
                            },
                                [3, 12];
                        case 7:
                            return w.trys.push([7, , 10, 11]),
                                n && !n.done && (r = i.return) ? [4, r.call(i)] : [3, 9];
                        case 8:
                            w.sent(),
                                w.label = 9;
                        case 9:
                            return [3, 11];
                        case 10:
                            if (s)
                                throw s.error;
                            return [7];
                        case 11:
                            return [7];
                        case 12:
                            if (o) {
                                if (this.hasRemaining(1))
                                    throw this.createExtraByteError(this.totalPos);
                                return [2, l]
                            }
                            throw f = this,
                                d = f.headByte,
                                u = f.pos,
                                p = f.totalPos,
                                new RangeError("Insufficient data in parsing ".concat(Wn(d), " at ").concat(p, " (").concat(u, " in the current buffer)"))
                    }
                })
            })
        }
            ,
            e.prototype.decodeArrayStream = function(t) {
            return this.decodeMultiAsync(t, !0)
        }
            ,
            e.prototype.decodeStream = function(t) {
            return this.decodeMultiAsync(t, !1)
        }
            ,
            e.prototype.decodeMultiAsync = function(t, i) {
            return zl(this, arguments, function() {
                var s, r, o, l, c, a, f, d, u;
                return Xn(this, function(p) {
                    switch (p.label) {
                        case 0:
                            s = i,
                                r = -1,
                                p.label = 1;
                        case 1:
                            p.trys.push([1, 13, 14, 19]),
                                o = kr(t),
                                p.label = 2;
                        case 2:
                            return [4, ai(o.next())];
                        case 3:
                            if (l = p.sent(),
                                !!l.done)
                                return [3, 12];
                            if (c = l.value,
                                i && r === 0)
                                throw this.createExtraByteError(this.totalPos);
                            this.appendBuffer(c),
                                s && (r = this.readArraySize(),
                                      s = !1,
                                      this.complete()),
                                p.label = 4;
                        case 4:
                            p.trys.push([4, 9, , 10]),
                                p.label = 5;
                        case 5:
                            return [4, ai(this.doDecodeSync())];
                        case 6:
                            return [4, p.sent()];
                        case 7:
                            return p.sent(),
                                --r === 0 ? [3, 8] : [3, 5];
                        case 8:
                            return [3, 10];
                        case 9:
                            if (a = p.sent(),
                                !(a instanceof Ss))
                                throw a;
                            return [3, 10];
                        case 10:
                            this.totalPos += this.pos,
                                p.label = 11;
                        case 11:
                            return [3, 2];
                        case 12:
                            return [3, 19];
                        case 13:
                            return f = p.sent(),
                                d = {
                                error: f
                            },
                                [3, 19];
                        case 14:
                            return p.trys.push([14, , 17, 18]),
                                l && !l.done && (u = o.return) ? [4, ai(u.call(o))] : [3, 16];
                        case 15:
                            p.sent(),
                                p.label = 16;
                        case 16:
                            return [3, 18];
                        case 17:
                            if (d)
                                throw d.error;
                            return [7];
                        case 18:
                            return [7];
                        case 19:
                            return [2]
                    }
                })
            })
        }
            ,
            e.prototype.doDecodeSync = function() {
            e: for (; ; ) {
                var t = this.readHeadByte()
                , i = void 0;
                if (t >= 224)
                    i = t - 256;
                else if (t < 192)
                    if (t < 128)
                        i = t;
                    else if (t < 144) {
                        var n = t - 128;
                        if (n !== 0) {
                            this.pushMapState(n),
                                this.complete();
                            continue e
                        } else
                            i = {}
                    } else if (t < 160) {
                        var n = t - 144;
                        if (n !== 0) {
                            this.pushArrayState(n),
                                this.complete();
                            continue e
                        } else
                            i = []
                    } else {
                        var s = t - 160;
                        i = this.decodeUtf8String(s, 0)
                    }
                else if (t === 192)
                    i = null;
                else if (t === 194)
                    i = !1;
                else if (t === 195)
                    i = !0;
                else if (t === 202)
                    i = this.readF32();
                else if (t === 203)
                    i = this.readF64();
                else if (t === 204)
                    i = this.readU8();
                else if (t === 205)
                    i = this.readU16();
                else if (t === 206)
                    i = this.readU32();
                else if (t === 207)
                    i = this.readU64();
                else if (t === 208)
                    i = this.readI8();
                else if (t === 209)
                    i = this.readI16();
                else if (t === 210)
                    i = this.readI32();
                else if (t === 211)
                    i = this.readI64();
                else if (t === 217) {
                    var s = this.lookU8();
                    i = this.decodeUtf8String(s, 1)
                } else if (t === 218) {
                    var s = this.lookU16();
                    i = this.decodeUtf8String(s, 2)
                } else if (t === 219) {
                    var s = this.lookU32();
                    i = this.decodeUtf8String(s, 4)
                } else if (t === 220) {
                    var n = this.readU16();
                    if (n !== 0) {
                        this.pushArrayState(n),
                            this.complete();
                        continue e
                    } else
                        i = []
                } else if (t === 221) {
                    var n = this.readU32();
                    if (n !== 0) {
                        this.pushArrayState(n),
                            this.complete();
                        continue e
                    } else
                        i = []
                } else if (t === 222) {
                    var n = this.readU16();
                    if (n !== 0) {
                        this.pushMapState(n),
                            this.complete();
                        continue e
                    } else
                        i = {}
                } else if (t === 223) {
                    var n = this.readU32();
                    if (n !== 0) {
                        this.pushMapState(n),
                            this.complete();
                        continue e
                    } else
                        i = {}
                } else if (t === 196) {
                    var n = this.lookU8();
                    i = this.decodeBinary(n, 1)
                } else if (t === 197) {
                    var n = this.lookU16();
                    i = this.decodeBinary(n, 2)
                } else if (t === 198) {
                    var n = this.lookU32();
                    i = this.decodeBinary(n, 4)
                } else if (t === 212)
                    i = this.decodeExtension(1, 0);
                else if (t === 213)
                    i = this.decodeExtension(2, 0);
                else if (t === 214)
                    i = this.decodeExtension(4, 0);
                else if (t === 215)
                    i = this.decodeExtension(8, 0);
                else if (t === 216)
                    i = this.decodeExtension(16, 0);
                else if (t === 199) {
                    var n = this.lookU8();
                    i = this.decodeExtension(n, 1)
                } else if (t === 200) {
                    var n = this.lookU16();
                    i = this.decodeExtension(n, 2)
                } else if (t === 201) {
                    var n = this.lookU32();
                    i = this.decodeExtension(n, 4)
                } else
                    throw new Je("Unrecognized type byte: ".concat(Wn(t)));
                this.complete();
                for (var r = this.stack; r.length > 0; ) {
                    var o = r[r.length - 1];
                    if (o.type === 0)
                        if (o.array[o.position] = i,
                            o.position++,
                            o.position === o.size)
                            r.pop(),
                                i = o.array;
                        else
                            continue e;
                    else if (o.type === 1) {
                        if (!Bl(i))
                            throw new Je("The type of key must be string or number but " + typeof i);
                        if (i === "__proto__")
                            throw new Je("The key __proto__ is not allowed");
                        o.key = i,
                            o.type = 2;
                        continue e
                    } else if (o.map[o.key] = i,
                               o.readCount++,
                               o.readCount === o.size)
                        r.pop(),
                            i = o.map;
                    else {
                        o.key = null,
                            o.type = 1;
                        continue e
                    }
                }
                return i
            }
        }
            ,
            e.prototype.readHeadByte = function() {
            return this.headByte === Ii && (this.headByte = this.readU8()),
                this.headByte
        }
            ,
            e.prototype.complete = function() {
            this.headByte = Ii
        }
            ,
            e.prototype.readArraySize = function() {
            var t = this.readHeadByte();
            switch (t) {
                case 220:
                    return this.readU16();
                case 221:
                    return this.readU32();
                default:
                    {
                        if (t < 160)
                            return t - 144;
                        throw new Je("Unrecognized array type byte: ".concat(Wn(t)))
                    }
            }
        }
            ,
            e.prototype.pushMapState = function(t) {
            if (t > this.maxMapLength)
                throw new Je("Max length exceeded: map length (".concat(t, ") > maxMapLengthLength (").concat(this.maxMapLength, ")"));
            this.stack.push({
                type: 1,
                size: t,
                key: null,
                readCount: 0,
                map: {}
            })
        }
            ,
            e.prototype.pushArrayState = function(t) {
            if (t > this.maxArrayLength)
                throw new Je("Max length exceeded: array length (".concat(t, ") > maxArrayLength (").concat(this.maxArrayLength, ")"));
            this.stack.push({
                type: 0,
                size: t,
                array: new Array(t),
                position: 0
            })
        }
            ,
            e.prototype.decodeUtf8String = function(t, i) {
            var n;
            if (t > this.maxStrLength)
                throw new Je("Max length exceeded: UTF-8 byte length (".concat(t, ") > maxStrLength (").concat(this.maxStrLength, ")"));
            if (this.bytes.byteLength < this.pos + i + t)
                throw xr;
            var s = this.pos + i, r;
            return this.stateIsMapKey() && (!((n = this.keyDecoder) === null || n === void 0) && n.canBeCached(t)) ? r = this.keyDecoder.decode(this.bytes, s, t) : t > gl ? r = yl(this.bytes, s, t) : r = Ho(this.bytes, s, t),
                this.pos += i + t,
                r
        }
            ,
            e.prototype.stateIsMapKey = function() {
            if (this.stack.length > 0) {
                var t = this.stack[this.stack.length - 1];
                return t.type === 1
            }
            return !1
        }
            ,
            e.prototype.decodeBinary = function(t, i) {
            if (t > this.maxBinLength)
                throw new Je("Max length exceeded: bin length (".concat(t, ") > maxBinLength (").concat(this.maxBinLength, ")"));
            if (!this.hasRemaining(t + i))
                throw xr;
            var n = this.pos + i
            , s = this.bytes.subarray(n, n + t);
            return this.pos += i + t,
                s
        }
            ,
            e.prototype.decodeExtension = function(t, i) {
            if (t > this.maxExtLength)
                throw new Je("Max length exceeded: ext length (".concat(t, ") > maxExtLength (").concat(this.maxExtLength, ")"));
            var n = this.view.getInt8(this.pos + i)
            , s = this.decodeBinary(t, i + 1);
            return this.extensionCodec.decode(s, n, this.context)
        }
            ,
            e.prototype.lookU8 = function() {
            return this.view.getUint8(this.pos)
        }
            ,
            e.prototype.lookU16 = function() {
            return this.view.getUint16(this.pos)
        }
            ,
            e.prototype.lookU32 = function() {
            return this.view.getUint32(this.pos)
        }
            ,
            e.prototype.readU8 = function() {
            var t = this.view.getUint8(this.pos);
            return this.pos++,
                t
        }
            ,
            e.prototype.readI8 = function() {
            var t = this.view.getInt8(this.pos);
            return this.pos++,
                t
        }
            ,
            e.prototype.readU16 = function() {
            var t = this.view.getUint16(this.pos);
            return this.pos += 2,
                t
        }
            ,
            e.prototype.readI16 = function() {
            var t = this.view.getInt16(this.pos);
            return this.pos += 2,
                t
        }
            ,
            e.prototype.readU32 = function() {
            var t = this.view.getUint32(this.pos);
            return this.pos += 4,
                t
        }
            ,
            e.prototype.readI32 = function() {
            var t = this.view.getInt32(this.pos);
            return this.pos += 4,
                t
        }
            ,
            e.prototype.readU64 = function() {
            var t = ll(this.view, this.pos);
            return this.pos += 8,
                t
        }
            ,
            e.prototype.readI64 = function() {
            var t = Bo(this.view, this.pos);
            return this.pos += 8,
                t
        }
            ,
            e.prototype.readF32 = function() {
            var t = this.view.getFloat32(this.pos);
            return this.pos += 4,
                t
        }
            ,
            e.prototype.readF64 = function() {
            var t = this.view.getFloat64(this.pos);
            return this.pos += 8,
                t
        }
            ,
            e
    }()
    , Vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
    function An(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    var Fo = {
        exports: {}
    }, xe = Fo.exports = {}, Qe, je;
    function Is() {
        throw new Error("setTimeout has not been defined")
    }
    function Ts() {
        throw new Error("clearTimeout has not been defined")
    }
    (function() {
        try {
            typeof setTimeout == "function" ? Qe = setTimeout : Qe = Is
        } catch {
            Qe = Is
        }
        try {
            typeof clearTimeout == "function" ? je = clearTimeout : je = Ts
        } catch {
            je = Ts
        }
    }
    )();
    function Vo(e) {
        if (Qe === setTimeout)
            return setTimeout(e, 0);
        if ((Qe === Is || !Qe) && setTimeout)
            return Qe = setTimeout,
                setTimeout(e, 0);
        try {
            return Qe(e, 0)
        } catch {
            try {
                return Qe.call(null, e, 0)
            } catch {
                return Qe.call(this, e, 0)
            }
        }
    }
    function Vl(e) {
        if (je === clearTimeout)
            return clearTimeout(e);
        if ((je === Ts || !je) && clearTimeout)
            return je = clearTimeout,
                clearTimeout(e);
        try {
            return je(e)
        } catch {
            try {
                return je.call(null, e)
            } catch {
                return je.call(this, e)
            }
        }
    }
    var ct = [], li = !1, $t, on = -1;
    function Nl() {
        !li || !$t || (li = !1,
                       $t.length ? ct = $t.concat(ct) : on = -1,
                       ct.length && No())
    }
    function No() {
        if (!li) {
            var e = Vo(Nl);
            li = !0;
            for (var t = ct.length; t; ) {
                for ($t = ct,
                     ct = []; ++on < t; )
                    $t && $t[on].run();
                on = -1,
                    t = ct.length
            }
            $t = null,
                li = !1,
                Vl(e)
        }
    }
    xe.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++)
                t[i - 1] = arguments[i];
        ct.push(new Uo(e,t)),
            ct.length === 1 && !li && Vo(No)
    }
    ;
    function Uo(e, t) {
        this.fun = e,
            this.array = t
    }
    Uo.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ;
    xe.title = "browser";
    xe.browser = !0;
    xe.env = {};
    xe.argv = [];
    xe.version = "";
    xe.versions = {};
    function ft() {}
    xe.on = ft;
    xe.addListener = ft;
    xe.once = ft;
    xe.off = ft;
    xe.removeListener = ft;
    xe.removeAllListeners = ft;
    xe.emit = ft;
    xe.prependListener = ft;
    xe.prependOnceListener = ft;
    xe.listeners = function(e) {
        return []
    }
    ;
    xe.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ;
    xe.cwd = function() {
        return "/"
    }
    ;
    xe.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ;
    xe.umask = function() {
        return 0
    }
    ;
    var Ul = Fo.exports;
    const Ms = An(Ul)
    , Wl = 1920
    , Xl = 1080
    , ql = 9
    , Wo = Ms && Ms.argv.indexOf("--largeserver") != -1 ? 80 : 40
    , Gl = Wo + 10
    , Yl = 6
    , Kl = 3e3
    , Zl = 10
    , Jl = 5
    , Ql = 50
    , jl = 4.5
    , ec = 15
    , tc = .9
    , ic = 3e3
    , nc = 60
    , sc = 35
    , rc = 3e3
    , oc = 500
    , ac = Ms && {}.IS_SANDBOX
    , lc = 100
    , cc = Math.PI / 2.6
    , hc = 10
    , uc = .25
    , fc = Math.PI / 2
    , dc = 35
    , pc = .0016
    , mc = .993
    , gc = 34
    , yc = ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"]
    , wc = 7
    , vc = .06
    , kc = ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"]
    , xc = Math.PI / 3
    , an = [{
        id: 0,
        src: "",
        xp: 0,
        val: 1
    }, {
        id: 1,
        src: "_g",
        xp: 3e3,
        val: 1.1
    }, {
        id: 2,
        src: "_d",
        xp: 7e3,
        val: 1.18
    }, {
        id: 3,
        src: "_r",
        poison: !0,
        xp: 12e3,
        val: 1.18
    }]
    , bc = function(e) {
        const t = e.weaponXP[e.weaponIndex] || 0;
        for (let i = an.length - 1; i >= 0; --i)
            if (t >= an[i].xp)
                return an[i]
    }
    , Sc = ["wood", "food", "stone", "points"]
    , Ic = 7
    , Tc = 9
    , Mc = 3
    , Ec = 32
    , Cc = 7
    , Pc = 724
    , $c = 114
    , Rc = .0011
    , Ac = 1e-4
    , Dc = 1.3
    , Oc = [150, 160, 165, 175]
    , _c = [80, 85, 95]
    , zc = [80, 85, 90]
    , Bc = 2400
    , Hc = .75
    , Lc = 15
    , Ks = 14400
    , Fc = 40
    , Vc = 2200
    , Nc = .6
    , Uc = 1
    , Wc = .3
    , Xc = .3
    , qc = 144e4
    , Zs = 320
    , Gc = 100
    , Yc = 2
    , Kc = 3200
    , Zc = 1440
    , Jc = .2
    , Qc = -1
    , jc = Ks - Zs - 120
    , eh = Ks - Zs - 120
    , T = {
        maxScreenWidth: Wl,
        maxScreenHeight: Xl,
        serverUpdateRate: ql,
        maxPlayers: Wo,
        maxPlayersHard: Gl,
        collisionDepth: Yl,
        minimapRate: Kl,
        colGrid: Zl,
        clientSendRate: Jl,
        healthBarWidth: Ql,
        healthBarPad: jl,
        iconPadding: ec,
        iconPad: tc,
        deathFadeout: ic,
        crownIconScale: nc,
        crownPad: sc,
        chatCountdown: rc,
        chatCooldown: oc,
        inSandbox: ac,
        maxAge: lc,
        gatherAngle: cc,
        gatherWiggle: hc,
        hitReturnRatio: uc,
        hitAngle: fc,
        playerScale: dc,
        playerSpeed: pc,
        playerDecel: mc,
        nameY: gc,
        skinColors: yc,
        animalCount: wc,
        aiTurnRandom: vc,
        cowNames: kc,
        shieldAngle: xc,
        weaponVariants: an,
        fetchVariant: bc,
        resourceTypes: Sc,
        areaCount: Ic,
        treesPerArea: Tc,
        bushesPerArea: Mc,
        totalRocks: Ec,
        goldOres: Cc,
        riverWidth: Pc,
        riverPadding: $c,
        waterCurrent: Rc,
        waveSpeed: Ac,
        waveMax: Dc,
        treeScales: Oc,
        bushScales: _c,
        rockScales: zc,
        snowBiomeTop: Bc,
        snowSpeed: Hc,
        maxNameLength: Lc,
        mapScale: Ks,
        mapPingScale: Fc,
        mapPingTime: Vc,
        volcanoScale: Zs,
        innerVolcanoScale: Gc,
        volcanoAnimalStrength: Yc,
        volcanoAnimationDuration: Kc,
        volcanoAggressionRadius: Zc,
        volcanoAggressionPercentage: Jc,
        volcanoDamagePerSecond: Qc,
        volcanoLocationX: jc,
        volcanoLocationY: eh,
        MAX_ATTACK: Nc,
        MAX_SPAWN_DELAY: Uc,
        MAX_SPEED: Wc,
        MAX_TURN_SPEED: Xc,
        DAY_INTERVAL: qc
    }
    , th = new Rl
    , ih = new Fl
    , me = {
        socket: null,
        connected: !1,
        socketId: -1,
        connect: function(e, t, i) {
            if (this.socket)
                return;
            const n = this;
            try {
                let s = !1;
                const r = e;
                this.socket = new WebSocket(e),
                    this.socket.binaryType = "arraybuffer",
                    this.socket.onmessage = function(o) {
                    var a = new Uint8Array(o.data);
                    const l = ih.decode(a)
                    , c = l[0];
                    var a = l[1];
                    c == "io-init" ? n.socketId = a[0] : i[c].apply(void 0, a)
                }
                    ,
                    this.socket.onopen = function() {
                    n.connected = !0,
                        t()
                }
                    ,
                    this.socket.onclose = function(o) {
                    n.connected = !1,
                        o.code == 4001 ? t("Invalid Connection") : s || t("disconnected")
                }
                    ,
                    this.socket.onerror = function(o) {
                    this.socket && this.socket.readyState != WebSocket.OPEN && (s = !0,
                                                                                console.error("Socket error", arguments),
                                                                                t("Socket error"))
                }
            } catch (s) {
                console.warn("Socket connection error:", s),
                    t(s)
            }
        },
        send: function(e) {
            const t = Array.prototype.slice.call(arguments, 1)
            , i = th.encode([e, t]);
            this.socket && this.socket.send(i)
        },
        socketReady: function() {
            return this.socket && this.connected
        },
        close: function() {
            this.socket && this.socket.close(),
                this.socket = null,
                this.connected = !1
        }
    };
    var Xo = Math.abs;
    const nh = Math.sqrt;
    var Xo = Math.abs;
    const sh = Math.atan2
    , qn = Math.PI
    , rh = function(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    , oh = function(e, t) {
        return Math.random() * (t - e + 1) + e
    }
    , ah = function(e, t, i) {
        return e + (t - e) * i
    }
    , lh = function(e, t) {
        return e > 0 ? e = Math.max(0, e - t) : e < 0 && (e = Math.min(0, e + t)),
            e
    }
    , ch = function(e, t, i, n) {
        return nh((i -= e) * i + (n -= t) * n)
    }
    , hh = function(e, t, i, n) {
        return sh(t - n, e - i)
    }
    , uh = function(e, t) {
        const i = Xo(t - e) % (qn * 2);
        return i > qn ? qn * 2 - i : i
    }
    , fh = function(e) {
        return typeof e == "number" && !isNaN(e) && isFinite(e)
    }
    , dh = function(e) {
        return e && typeof e == "string"
    }
    , ph = function(e) {
        return e > 999 ? (e / 1e3).toFixed(1) + "k" : e
    }
    , mh = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    , gh = function(e, t) {
        return e ? parseFloat(e.toFixed(t)) : 0
    }
    , yh = function(e, t) {
        return parseFloat(t.points) - parseFloat(e.points)
    }
    , wh = function(e, t, i, n, s, r, o, l) {
        let c = s
        , a = o;
        if (s > o && (c = o,
                      a = s),
            a > i && (a = i),
            c < e && (c = e),
            c > a)
            return !1;
        let f = r
        , d = l;
        const u = o - s;
        if (Math.abs(u) > 1e-7) {
            const p = (l - r) / u
            , w = r - p * s;
            f = p * c + w,
                d = p * a + w
        }
        if (f > d) {
            const p = d;
            d = f,
                f = p
        }
        return d > n && (d = n),
            f < t && (f = t),
            !(f > d)
    }
    , qo = function(e, t, i) {
        const n = e.getBoundingClientRect()
        , s = n.left + window.scrollX
        , r = n.top + window.scrollY
        , o = n.width
        , l = n.height
        , c = t > s && t < s + o
        , a = i > r && i < r + l;
        return c && a
    }
    , ln = function(e) {
        const t = e.changedTouches[0];
        e.screenX = t.screenX,
            e.screenY = t.screenY,
            e.clientX = t.clientX,
            e.clientY = t.clientY,
            e.pageX = t.pageX,
            e.pageY = t.pageY
    }
    , Go = function(e, t) {
        const i = !t;
        let n = !1;
        const s = !1;
        e.addEventListener("touchstart", lt(r), s),
            e.addEventListener("touchmove", lt(o), s),
            e.addEventListener("touchend", lt(l), s),
            e.addEventListener("touchcancel", lt(l), s),
            e.addEventListener("touchleave", lt(l), s);
        function r(c) {
            ln(c),
                window.setUsingTouch(!0),
                i && (c.preventDefault(),
                      c.stopPropagation()),
                e.onmouseover && e.onmouseover(c),
                n = !0
        }
        function o(c) {
            ln(c),
                window.setUsingTouch(!0),
                i && (c.preventDefault(),
                      c.stopPropagation()),
                qo(e, c.pageX, c.pageY) ? n || (e.onmouseover && e.onmouseover(c),
                                                n = !0) : n && (e.onmouseout && e.onmouseout(c),
                                                                n = !1)
        }
        function l(c) {
            ln(c),
                window.setUsingTouch(!0),
                i && (c.preventDefault(),
                      c.stopPropagation()),
                n && (e.onclick && e.onclick(c),
                      e.onmouseout && e.onmouseout(c),
                      n = !1)
        }
    }
    , vh = function(e) {
        for (; e.hasChildNodes(); )
            e.removeChild(e.lastChild)
    }
    , kh = function(e) {
        const t = document.createElement(e.tag || "div");
        function i(n, s) {
            e[n] && (t[s] = e[n])
        }
        i("text", "textContent"),
            i("html", "innerHTML"),
            i("class", "className");
        for (const n in e) {
            switch (n) {
                case "tag":
                case "text":
                case "html":
                case "class":
                case "style":
                case "hookTouch":
                case "parent":
                case "children":
                    continue
            }
            t[n] = e[n]
        }
        if (t.onclick && (t.onclick = lt(t.onclick)),
            t.onmouseover && (t.onmouseover = lt(t.onmouseover)),
            t.onmouseout && (t.onmouseout = lt(t.onmouseout)),
            e.style && (t.style.cssText = e.style),
            e.hookTouch && Go(t),
            e.parent && e.parent.appendChild(t),
            e.children)
            for (let n = 0; n < e.children.length; n++)
                t.appendChild(e.children[n]);
        return t
    }
    , Yo = function(e) {
        return e && typeof e.isTrusted == "boolean" ? e.isTrusted : !0
    }
    , lt = function(e) {
        return function(t) {
            t && t instanceof Event && Yo(t) && e(t)
        }
    }
    , xh = function(e) {
        let t = "";
        const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let n = 0; n < e; n++)
            t += i.charAt(Math.floor(Math.random() * i.length));
        return t
    }
    , bh = function(e, t) {
        let i = 0;
        for (let n = 0; n < e.length; n++)
            e[n] === t && i++;
        return i
    }
    , A = {
        randInt: rh,
        randFloat: oh,
        lerp: ah,
        decel: lh,
        getDistance: ch,
        getDirection: hh,
        getAngleDist: uh,
        isNumber: fh,
        isString: dh,
        kFormat: ph,
        capitalizeFirst: mh,
        fixTo: gh,
        sortByPoints: yh,
        lineInRect: wh,
        containsPoint: qo,
        mousifyTouchEvent: ln,
        hookTouchEvents: Go,
        removeAllChildren: vh,
        generateElement: kh,
        eventIsTrusted: Yo,
        checkTrusted: lt,
        randomString: xh,
        countInArray: bh
    }
    , Sh = function() {
        this.init = function(e, t, i, n, s, r, o) {
            this.x = e,
                this.y = t,
                this.color = o,
                this.scale = i,
                this.startScale = this.scale,
                this.maxScale = i * 1.5,
                this.scaleSpeed = .7,
                this.speed = n,
                this.life = s,
                this.text = r
        }
            ,
            this.update = function(e) {
            this.life && (this.life -= e,
                          this.y -= this.speed * e,
                          this.scale += this.scaleSpeed * e,
                          this.scale >= this.maxScale ? (this.scale = this.maxScale,
                                                         this.scaleSpeed *= -1) : this.scale <= this.startScale && (this.scale = this.startScale,
                                                                                                                    this.scaleSpeed = 0),
                          this.life <= 0 && (this.life = 0))
        }
            ,
            this.render = function(e, t, i) {
            e.fillStyle = this.color,
                e.font = this.scale + "px Hammersmith One",
                e.fillText(this.text, this.x - t, this.y - i)
        }
    }
    , Ih = function() {
        this.texts = [],
            this.update = function(e, t, i, n) {
            t.textBaseline = "middle",
                t.textAlign = "center";
            for (let s = 0; s < this.texts.length; ++s)
                this.texts[s].life && (this.texts[s].update(e),
                                       this.texts[s].render(t, i, n))
        }
            ,
            this.showText = function(e, t, i, n, s, r, o) {
            let l;
            for (let c = 0; c < this.texts.length; ++c)
                if (!this.texts[c].life) {
                    l = this.texts[c];
                    break
                }
            l || (l = new Sh,
                  this.texts.push(l)),
                l.init(e, t, i, n, s, r, o)
        }
    }
    , Th = function(e, t) {
        let i;
        this.sounds = [],
            this.active = !0,
            this.play = function(n, s, r) {
            !s || !this.active || (i = this.sounds[n],
                                   i || (i = new Howl({
                src: ".././sound/" + n + ".mp3"
            }),
                                         this.sounds[n] = i),
                                   (!r || !i.isPlaying) && (i.isPlaying = !0,
                                                            i.play(),
                                                            i.volume((s || 1) * e.volumeMult),
                                                            i.loop(r)))
        }
            ,
            this.toggleMute = function(n, s) {
            i = this.sounds[n],
                i && i.mute(s)
        }
            ,
            this.stop = function(n) {
            i = this.sounds[n],
                i && (i.stop(),
                      i.isPlaying = !1)
        }
    }
    , br = Math.floor
    , Sr = Math.abs
    , Ti = Math.cos
    , Mi = Math.sin
    , Mh = Math.sqrt;
    function Eh(e, t, i, n, s, r) {
        this.objects = t,
            this.grids = {},
            this.updateObjects = [];
        let o, l;
        const c = n.mapScale / n.colGrid;
        this.setObjectGrids = function(u) {
            const p = Math.min(n.mapScale, Math.max(0, u.x))
            , w = Math.min(n.mapScale, Math.max(0, u.y));
            for (let x = 0; x < n.colGrid; ++x) {
                o = x * c;
                for (let b = 0; b < n.colGrid; ++b)
                    l = b * c,
                        p + u.scale >= o && p - u.scale <= o + c && w + u.scale >= l && w - u.scale <= l + c && (this.grids[x + "_" + b] || (this.grids[x + "_" + b] = []),
                                                                                                                 this.grids[x + "_" + b].push(u),
                                                                                                                 u.gridLocations.push(x + "_" + b))
            }
        }
            ,
            this.removeObjGrid = function(u) {
            let p;
            for (let w = 0; w < u.gridLocations.length; ++w)
                p = this.grids[u.gridLocations[w]].indexOf(u),
                    p >= 0 && this.grids[u.gridLocations[w]].splice(p, 1)
        }
            ,
            this.disableObj = function(u) {
            if (u.active = !1,
                r) {
                u.owner && u.pps && (u.owner.pps -= u.pps),
                    this.removeObjGrid(u);
                const p = this.updateObjects.indexOf(u);
                p >= 0 && this.updateObjects.splice(p, 1)
            }
        }
            ,
            this.hitObj = function(u, p) {
            for (let w = 0; w < s.length; ++w)
                s[w].active && (u.sentTo[s[w].id] && (u.active ? s[w].canSee(u) && r.send(s[w].id, "L", i.fixTo(p, 1), u.sid) : r.send(s[w].id, "Q", u.sid)),
                                !u.active && u.owner == s[w] && s[w].changeItemCount(u.group.id, -1))
        }
        ;
        const a = [];
        let f;
        this.getGridArrays = function(u, p, w) {
            o = br(u / c),
                l = br(p / c),
                a.length = 0;
            try {
                this.grids[o + "_" + l] && a.push(this.grids[o + "_" + l]),
                    u + w >= (o + 1) * c && (f = this.grids[o + 1 + "_" + l],
                                             f && a.push(f),
                                             l && p - w <= l * c ? (f = this.grids[o + 1 + "_" + (l - 1)],
                                                                    f && a.push(f)) : p + w >= (l + 1) * c && (f = this.grids[o + 1 + "_" + (l + 1)],
                                                                                                               f && a.push(f))),
                    o && u - w <= o * c && (f = this.grids[o - 1 + "_" + l],
                                            f && a.push(f),
                                            l && p - w <= l * c ? (f = this.grids[o - 1 + "_" + (l - 1)],
                                                                   f && a.push(f)) : p + w >= (l + 1) * c && (f = this.grids[o - 1 + "_" + (l + 1)],
                                                                                                              f && a.push(f))),
                    p + w >= (l + 1) * c && (f = this.grids[o + "_" + (l + 1)],
                                             f && a.push(f)),
                    l && p - w <= l * c && (f = this.grids[o + "_" + (l - 1)],
                                            f && a.push(f))
            } catch {}
            return a
        }
        ;
        let d;
        this.add = function(u, p, w, x, b, $, v, S, R) {
            d = null;
            for (var G = 0; G < t.length; ++G)
                if (t[G].sid == u) {
                    d = t[G];
                    break
                }
            if (!d) {
                for (var G = 0; G < t.length; ++G)
                    if (!t[G].active) {
                        d = t[G];
                        break
                    }
            }
            d || (d = new e(u),
                  t.push(d)),
                S && (d.sid = u),
                d.init(p, w, x, b, $, v, R),
                r && (this.setObjectGrids(d),
                      d.doUpdate && this.updateObjects.push(d))
        }
            ,
            this.disableBySid = function(u) {
            for (let p = 0; p < t.length; ++p)
                if (t[p].sid == u) {
                    this.disableObj(t[p]);
                    break
                }
        }
            ,
            this.removeAllItems = function(u, p) {
            for (let w = 0; w < t.length; ++w)
                t[w].active && t[w].owner && t[w].owner.sid == u && this.disableObj(t[w]);
            p && p.broadcast("R", u)
        }
            ,
            this.fetchSpawnObj = function(u) {
            let p = null;
            for (let w = 0; w < t.length; ++w)
                if (d = t[w],
                    d.active && d.owner && d.owner.sid == u && d.spawnPoint) {
                    p = [d.x, d.y],
                        this.disableObj(d),
                        r.broadcast("Q", d.sid),
                        d.owner && d.owner.changeItemCount(d.group.id, -1);
                    break
                }
            return p
        }
            ,
            this.checkItemLocation = function(u, p, w, x, b, $, v) {
            for (let S = 0; S < t.length; ++S) {
                const R = t[S].blocker ? t[S].blocker : t[S].getScale(x, t[S].isItem);
                if (t[S].active && i.getDistance(u, p, t[S].x, t[S].y) < w + R)
                    return !1
            }
            return !(!$ && b != 18 && p >= n.mapScale / 2 - n.riverWidth / 2 && p <= n.mapScale / 2 + n.riverWidth / 2)
        }
            ,
            this.addProjectile = function(u, p, w, x, b) {
            const $ = items.projectiles[b];
            let v;
            for (let S = 0; S < projectiles.length; ++S)
                if (!projectiles[S].active) {
                    v = projectiles[S];
                    break
                }
            v || (v = new Projectile(s,i),
                  projectiles.push(v)),
                v.init(b, u, p, w, $.speed, x, $.scale)
        }
            ,
            this.checkCollision = function(u, p, w) {
            w = w || 1;
            const x = u.x - p.x
            , b = u.y - p.y;
            let $ = u.scale + p.scale;
            if (Sr(x) <= $ || Sr(b) <= $) {
                $ = u.scale + (p.getScale ? p.getScale() : p.scale);
                let v = Mh(x * x + b * b) - $;
                if (v <= 0) {
                    if (p.ignoreCollision)
                        p.trap && !u.noTrap && p.owner != u && !(p.owner && p.owner.team && p.owner.team == u.team) ? (u.lockMove = !0,
                                                                                                                       p.hideFromEnemy = !1) : p.boostSpeed ? (u.xVel += w * p.boostSpeed * (p.weightM || 1) * Ti(p.dir),
                    u.yVel += w * p.boostSpeed * (p.weightM || 1) * Mi(p.dir)) : p.healCol ? u.healCol = p.healCol : p.teleport && (u.x = i.randInt(0, n.mapScale),
                                                                                                                                    u.y = i.randInt(0, n.mapScale));
                    else {
                        const S = i.getDirection(u.x, u.y, p.x, p.y);
                        if (i.getDistance(u.x, u.y, p.x, p.y),
                            p.isPlayer ? (v = v * -1 / 2,
                                          u.x += v * Ti(S),
                                          u.y += v * Mi(S),
                                          p.x -= v * Ti(S),
                                          p.y -= v * Mi(S)) : (u.x = p.x + $ * Ti(S),
                                                               u.y = p.y + $ * Mi(S),
                                                               u.xVel *= .75,
                                                               u.yVel *= .75),
                            p.dmg && p.owner != u && !(p.owner && p.owner.team && p.owner.team == u.team)) {
                            u.changeHealth(-p.dmg, p.owner, p);
                            const R = 1.5 * (p.weightM || 1);
                            u.xVel += R * Ti(S),
                                u.yVel += R * Mi(S),
                                p.pDmg && !(u.skin && u.skin.poisonRes) && (u.dmgOverTime.dmg = p.pDmg,
                                                                            u.dmgOverTime.time = 5,
                                                                            u.dmgOverTime.doer = p.owner),
                                u.colDmg && p.health && (p.changeHealth(-u.colDmg) && this.disableObj(p),
                                                         this.hitObj(p, i.getDirection(u.x, u.y, p.x, p.y)))
                        }
                    }
                    return p.zIndex > u.zIndex && (u.zIndex = p.zIndex),
                        !0
                }
            }
            return !1
        }
    }
    function Ch(e, t, i, n, s, r, o, l, c) {
        this.addProjectile = function(a, f, d, u, p, w, x, b, $) {
            const v = r.projectiles[w];
            let S;
            for (let R = 0; R < t.length; ++R)
                if (!t[R].active) {
                    S = t[R];
                    break
                }
            return S || (S = new e(i,n,s,r,o,l,c),
                         S.sid = t.length,
                         t.push(S)),
                S.init(w, a, f, d, p, v.dmg, u, v.scale, x),
                S.ignoreObj = b,
                S.layer = $ || v.layer,
                S.src = v.src,
                S
        }
    }
    function Ph(e, t, i, n, s, r, o, l, c) {
        this.aiTypes = [{
            id: 0,
            src: "cow_1",
            killScore: 150,
            health: 500,
            weightM: .8,
            speed: 95e-5,
            turnSpeed: .001,
            scale: 72,
            drop: ["food", 50]
        }, {
            id: 1,
            src: "pig_1",
            killScore: 200,
            health: 800,
            weightM: .6,
            speed: 85e-5,
            turnSpeed: .001,
            scale: 72,
            drop: ["food", 80]
        }, {
            id: 2,
            name: "Bull",
            src: "bull_2",
            hostile: !0,
            dmg: 20,
            killScore: 1e3,
            health: 1800,
            weightM: .5,
            speed: 94e-5,
            turnSpeed: 74e-5,
            scale: 78,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 100]
        }, {
            id: 3,
            name: "Bully",
            src: "bull_1",
            hostile: !0,
            dmg: 20,
            killScore: 2e3,
            health: 2800,
            weightM: .45,
            speed: .001,
            turnSpeed: 8e-4,
            scale: 90,
            viewRange: 900,
            chargePlayer: !0,
            drop: ["food", 400]
        }, {
            id: 4,
            name: "Wolf",
            src: "wolf_1",
            hostile: !0,
            dmg: 8,
            killScore: 500,
            health: 300,
            weightM: .45,
            speed: .001,
            turnSpeed: .002,
            scale: 84,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 200]
        }, {
            id: 5,
            name: "Quack",
            src: "chicken_1",
            dmg: 8,
            killScore: 2e3,
            noTrap: !0,
            health: 300,
            weightM: .2,
            speed: .0018,
            turnSpeed: .006,
            scale: 70,
            drop: ["food", 100]
        }, {
            id: 6,
            name: "MOOSTAFA",
            nameScale: 50,
            src: "enemy",
            hostile: !0,
            dontRun: !0,
            fixedSpawn: !0,
            spawnDelay: 6e4,
            noTrap: !0,
            colDmg: 100,
            dmg: 40,
            killScore: 8e3,
            health: 18e3,
            weightM: .4,
            speed: 7e-4,
            turnSpeed: .01,
            scale: 80,
            spriteMlt: 1.8,
            leapForce: .9,
            viewRange: 1e3,
            hitRange: 210,
            hitDelay: 1e3,
            chargePlayer: !0,
            drop: ["food", 100]
        }, {
            id: 7,
            name: "Treasure",
            hostile: !0,
            nameScale: 35,
            src: "crate_1",
            fixedSpawn: !0,
            spawnDelay: 12e4,
            colDmg: 200,
            killScore: 5e3,
            health: 2e4,
            weightM: .1,
            speed: 0,
            turnSpeed: 0,
            scale: 70,
            spriteMlt: 1
        }, {
            id: 8,
            name: "MOOFIE",
            src: "wolf_2",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 4,
            spawnDelay: 3e4,
            noTrap: !0,
            nameScale: 35,
            dmg: 10,
            colDmg: 100,
            killScore: 3e3,
            health: 7e3,
            weightM: .45,
            speed: .0015,
            turnSpeed: .002,
            scale: 90,
            viewRange: 800,
            chargePlayer: !0,
            drop: ["food", 1e3]
        }, {
            id: 9,
            name: "💀MOOFIE",
            src: "wolf_2",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            spawnDelay: 6e4,
            noTrap: !0,
            nameScale: 35,
            dmg: 12,
            colDmg: 100,
            killScore: 3e3,
            health: 9e3,
            weightM: .45,
            speed: .0015,
            turnSpeed: .0025,
            scale: 94,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 3e3],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }, {
            id: 10,
            name: "💀Wolf",
            src: "wolf_1",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            spawnDelay: 3e4,
            dmg: 10,
            killScore: 700,
            health: 500,
            weightM: .45,
            speed: .00115,
            turnSpeed: .0025,
            scale: 88,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 400],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }, {
            id: 11,
            name: "💀Bully",
            src: "bull_1",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            dmg: 20,
            killScore: 5e3,
            health: 5e3,
            spawnDelay: 1e5,
            weightM: .45,
            speed: .00115,
            turnSpeed: .0025,
            scale: 94,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 800],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }],
            this.spawn = function(a, f, d, u) {
            if (!this.aiTypes[u])
                return console.error("missing ai type", u),
                    this.spawn(a, f, d, 0);
            let p;
            for (let w = 0; w < e.length; ++w)
                if (!e[w].active) {
                    p = e[w];
                    break
                }
            return p || (p = new t(e.length,s,i,n,o,r,l,c),
                         e.push(p)),
                p.init(a, f, d, u, this.aiTypes[u]),
                p
        }
    }
    const Nt = Math.PI * 2
    , Gn = 0;
    function $h(e, t, i, n, s, r, o, l) {
        this.sid = e,
            this.isAI = !0,
            this.nameIndex = s.randInt(0, r.cowNames.length - 1),
            this.init = function(d, u, p, w, x) {
            this.x = d,
                this.y = u,
                this.startX = x.fixedSpawn ? d : null,
                this.startY = x.fixedSpawn ? u : null,
                this.xVel = 0,
                this.yVel = 0,
                this.zIndex = 0,
                this.dir = p,
                this.dirPlus = 0,
                this.index = w,
                this.src = x.src,
                x.name && (this.name = x.name),
                (this.name || "").startsWith("💀") && (this.isVolcanoAi = !0),
                this.weightM = x.weightM,
                this.speed = x.speed,
                this.killScore = x.killScore,
                this.turnSpeed = x.turnSpeed,
                this.scale = x.scale,
                this.maxHealth = x.health,
                this.leapForce = x.leapForce,
                this.health = this.maxHealth,
                this.chargePlayer = x.chargePlayer,
                this.viewRange = x.viewRange,
                this.drop = x.drop,
                this.dmg = x.dmg,
                this.hostile = x.hostile,
                this.dontRun = x.dontRun,
                this.hitRange = x.hitRange,
                this.hitDelay = x.hitDelay,
                this.hitScare = x.hitScare,
                this.spriteMlt = x.spriteMlt,
                this.nameScale = x.nameScale,
                this.colDmg = x.colDmg,
                this.noTrap = x.noTrap,
                this.spawnDelay = x.spawnDelay,
                this.minSpawnRange = x.minSpawnRange,
                this.maxSpawnRange = x.maxSpawnRange,
                this.hitWait = 0,
                this.waitCount = 1e3,
                this.moveCount = 0,
                this.targetDir = 0,
                this.active = !0,
                this.alive = !0,
                this.runFrom = null,
                this.chargeTarget = null,
                this.dmgOverTime = {}
        }
            ,
            this.getVolcanoAggression = function() {
            const d = s.getDistance(this.x, this.y, r.volcanoLocationX, r.volcanoLocationY)
            , u = d > r.volcanoAggressionRadius ? 0 : r.volcanoAggressionRadius - d;
            return 1 + r.volcanoAggressionPercentage * (1 - u / r.volcanoAggressionRadius)
        }
        ;
        let c = 0;
        this.update = function(d) {
            if (this.active) {
                if (this.spawnCounter) {
                    if (this.spawnCounter -= d * (1 + 0) * this.getVolcanoAggression(),
                        this.spawnCounter <= 0)
                        if (this.spawnCounter = 0,
                            this.minSpawnRange || this.maxSpawnRange) {
                            const V = r.mapScale * this.minSpawnRange
                            , F = r.mapScale * this.maxSpawnRange;
                            this.x = s.randInt(V, F),
                                this.y = s.randInt(V, F)
                        } else
                            this.x = this.startX || s.randInt(0, r.mapScale),
                                this.y = this.startY || s.randInt(0, r.mapScale);
                    return
                }
                c -= d,
                    c <= 0 && (this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer),
                                                        this.dmgOverTime.time -= 1,
                                                        this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)),
                               c = 1e3);
                let v = !1
                , S = 1;
                if (!this.zIndex && !this.lockMove && this.y >= r.mapScale / 2 - r.riverWidth / 2 && this.y <= r.mapScale / 2 + r.riverWidth / 2 && (S = .33,
                                                                                                                                                     this.xVel += r.waterCurrent * d),
                    this.lockMove)
                    this.xVel = 0,
                        this.yVel = 0;
                else if (this.waitCount > 0) {
                    if (this.waitCount -= d,
                        this.waitCount <= 0)
                        if (this.chargePlayer) {
                            let V, F, _;
                            for (var u = 0; u < i.length; ++u)
                                i[u].alive && !(i[u].skin && i[u].skin.bullRepel) && (_ = s.getDistance(this.x, this.y, i[u].x, i[u].y),
                                                                                      _ <= this.viewRange && (!V || _ < F) && (F = _,
                                                                                                                               V = i[u]));
                            V ? (this.chargeTarget = V,
                                 this.moveCount = s.randInt(8e3, 12e3)) : (this.moveCount = s.randInt(1e3, 2e3),
                                                                           this.targetDir = s.randFloat(-Math.PI, Math.PI))
                        } else
                            this.moveCount = s.randInt(4e3, 1e4),
                                this.targetDir = s.randFloat(-Math.PI, Math.PI)
                } else if (this.moveCount > 0) {
                    var p = this.speed * S * (1 + r.MAX_SPEED * Gn) * this.getVolcanoAggression();
                    if (this.runFrom && this.runFrom.active && !(this.runFrom.isPlayer && !this.runFrom.alive) ? (this.targetDir = s.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y),
                                                                                                                  p *= 1.42) : this.chargeTarget && this.chargeTarget.alive && (this.targetDir = s.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y),
                p *= 1.75,
                v = !0),
                        this.hitWait && (p *= .3),
                        this.dir != this.targetDir) {
                        this.dir %= Nt;
                        const V = (this.dir - this.targetDir + Nt) % Nt
                        , F = Math.min(Math.abs(V - Nt), V, this.turnSpeed * d)
                        , _ = V - Math.PI >= 0 ? 1 : -1;
                        this.dir += _ * F + Nt
                    }
                    this.dir %= Nt,
                        this.xVel += p * d * Math.cos(this.dir),
                        this.yVel += p * d * Math.sin(this.dir),
                        this.moveCount -= d,
                        this.moveCount <= 0 && (this.runFrom = null,
                                                this.chargeTarget = null,
                                                this.waitCount = this.hostile ? 1500 : s.randInt(1500, 6e3))
                }
                this.zIndex = 0,
                    this.lockMove = !1;
                var w;
                const R = s.getDistance(0, 0, this.xVel * d, this.yVel * d)
                , G = Math.min(4, Math.max(1, Math.round(R / 40)))
                , X = 1 / G;
                for (var u = 0; u < G; ++u) {
                    this.xVel && (this.x += this.xVel * d * X),
                        this.yVel && (this.y += this.yVel * d * X),
                        w = t.getGridArrays(this.x, this.y, this.scale);
                    for (var x = 0; x < w.length; ++x)
                        for (let F = 0; F < w[x].length; ++F)
                            w[x][F].active && t.checkCollision(this, w[x][F], X)
                }
                let W = !1;
                if (this.hitWait > 0 && (this.hitWait -= d,
                                         this.hitWait <= 0)) {
                    W = !0,
                        this.hitWait = 0,
                        this.leapForce && !s.randInt(0, 2) && (this.xVel += this.leapForce * Math.cos(this.dir),
                                                               this.yVel += this.leapForce * Math.sin(this.dir));
                    var w = t.getGridArrays(this.x, this.y, this.hitRange), b, $;
                    for (let F = 0; F < w.length; ++F)
                        for (var x = 0; x < w[F].length; ++x)
                            b = w[F][x],
                                b.health && ($ = s.getDistance(this.x, this.y, b.x, b.y),
                                             $ < b.scale + this.hitRange && (b.changeHealth(-this.dmg * 5) && t.disableObj(b),
                                                                             t.hitObj(b, s.getDirection(this.x, this.y, b.x, b.y))));
                    for (var x = 0; x < i.length; ++x)
                        i[x].canSee(this) && l.send(i[x].id, "J", this.sid)
                }
                if (v || W) {
                    var b, $;
                    let _;
                    for (var u = 0; u < i.length; ++u)
                        b = i[u],
                            b && b.alive && ($ = s.getDistance(this.x, this.y, b.x, b.y),
                                             this.hitRange ? !this.hitWait && $ <= this.hitRange + b.scale && (W ? (_ = s.getDirection(b.x, b.y, this.x, this.y),
                                                                                                                    b.changeHealth(-this.dmg * (1 + r.MAX_ATTACK * Gn) * this.getVolcanoAggression()),
                                                                                                                    b.xVel += .6 * Math.cos(_),
                                                                                                                    b.yVel += .6 * Math.sin(_),
                                                                                                                    this.runFrom = null,
                                                                                                                    this.chargeTarget = null,
                                                                                                                    this.waitCount = 3e3,
                                                                                                                    this.hitWait = s.randInt(0, 2) ? 0 : 600) : this.hitWait = this.hitDelay) : $ <= this.scale + b.scale && (_ = s.getDirection(b.x, b.y, this.x, this.y),
                    b.changeHealth(-this.dmg * (1 + r.MAX_ATTACK * Gn) * this.getVolcanoAggression()),
                    b.xVel += .55 * Math.cos(_),
                    b.yVel += .55 * Math.sin(_)))
                }
                this.xVel && (this.xVel *= Math.pow(r.playerDecel, d)),
                    this.yVel && (this.yVel *= Math.pow(r.playerDecel, d));
                const M = this.scale;
                this.x - M < 0 ? (this.x = M,
                                  this.xVel = 0) : this.x + M > r.mapScale && (this.x = r.mapScale - M,
                                                                               this.xVel = 0),
                    this.y - M < 0 ? (this.y = M,
                                      this.yVel = 0) : this.y + M > r.mapScale && (this.y = r.mapScale - M,
                                                                                   this.yVel = 0),
                    this.isVolcanoAi && (this.chargeTarget && (s.getDistance(this.chargeTarget.x, this.chargeTarget.y, r.volcanoLocationX, r.volcanoLocationY) || 0) > r.volcanoAggressionRadius && (this.chargeTarget = null),
                                         this.xVel && (this.x < r.volcanoLocationX - r.volcanoAggressionRadius ? (this.x = r.volcanoLocationX - r.volcanoAggressionRadius,
                                                                                                                  this.xVel = 0) : this.x > r.volcanoLocationX + r.volcanoAggressionRadius && (this.x = r.volcanoLocationX + r.volcanoAggressionRadius,
            this.xVel = 0)),
                                         this.yVel && (this.y < r.volcanoLocationY - r.volcanoAggressionRadius ? (this.y = r.volcanoLocationY - r.volcanoAggressionRadius,
                                                                                                                  this.yVel = 0) : this.y > r.volcanoLocationY + r.volcanoAggressionRadius && (this.y = r.volcanoLocationY + r.volcanoAggressionRadius,
            this.yVel = 0)))
            }
        }
            ,
            this.canSee = function(d) {
            if (!d || d.skin && d.skin.invisTimer && d.noMovTimer >= d.skin.invisTimer)
                return !1;
            const u = Math.abs(d.x - this.x) - d.scale
            , p = Math.abs(d.y - this.y) - d.scale;
            return u <= r.maxScreenWidth / 2 * 1.3 && p <= r.maxScreenHeight / 2 * 1.3
        }
        ;
        let a = 0
        , f = 0;
        this.animate = function(d) {
            this.animTime > 0 && (this.animTime -= d,
                                  this.animTime <= 0 ? (this.animTime = 0,
                                                        this.dirPlus = 0,
                                                        a = 0,
                                                        f = 0) : f == 0 ? (a += d / (this.animSpeed * r.hitReturnRatio),
                                                                           this.dirPlus = s.lerp(0, this.targetAngle, Math.min(1, a)),
                                                                           a >= 1 && (a = 1,
                                                                                      f = 1)) : (a -= d / (this.animSpeed * (1 - r.hitReturnRatio)),
                                                                                                 this.dirPlus = s.lerp(0, this.targetAngle, Math.max(0, a))))
        }
            ,
            this.startAnim = function() {
            this.animTime = this.animSpeed = 600,
                this.targetAngle = Math.PI * .8,
                a = 0,
                f = 0
        }
            ,
            this.changeHealth = function(d, u, p) {
            if (this.active && (this.health += d,
                                p && (this.hitScare && !s.randInt(0, this.hitScare) ? (this.runFrom = p,
                                                                                       this.waitCount = 0,
                                                                                       this.moveCount = 2e3) : this.hostile && this.chargePlayer && p.isPlayer ? (this.chargeTarget = p,
        this.waitCount = 0,
        this.moveCount = 8e3) : this.dontRun || (this.runFrom = p,
                                                 this.waitCount = 0,
                                                 this.moveCount = 2e3)),
                                d < 0 && this.hitRange && s.randInt(0, 1) && (this.hitWait = 500),
                                u && u.canSee(this) && d < 0 && l.send(u.id, "8", Math.round(this.x), Math.round(this.y), Math.round(-d), 1),
                                this.health <= 0)) {
                if (this.spawnDelay)
                    this.spawnCounter = this.spawnDelay,
                        this.x = -1e6,
                        this.y = -1e6;
                else if (this.minSpawnRange || this.maxSpawnRange) {
                    const w = r.mapScale * this.minSpawnRange
                    , x = r.mapScale * this.maxSpawnRange;
                    this.x = s.randInt(w, x),
                        this.y = s.randInt(w, x)
                } else
                    this.x = this.startX || s.randInt(0, r.mapScale),
                        this.y = this.startY || s.randInt(0, r.mapScale);
                if (this.health = this.maxHealth,
                    this.runFrom = null,
                    u && (o(u, this.killScore),
                          this.drop))
                    for (let w = 0; w < this.drop.length; )
                        u.addResource(r.resourceTypes.indexOf(this.drop[w]), this.drop[w + 1]),
                            w += 2
            }
        }
    }
    function Rh(e) {
        this.sid = e,
            this.init = function(t, i, n, s, r, o, l) {
            o = o || {},
                this.sentTo = {},
                this.gridLocations = [],
                this.active = !0,
                this.doUpdate = o.doUpdate,
                this.x = t,
                this.y = i,
                this.dir = n,
                this.xWiggle = 0,
                this.yWiggle = 0,
                this.scale = s,
                this.type = r,
                this.id = o.id,
                this.owner = l,
                this.name = o.name,
                this.isItem = this.id != null,
                this.group = o.group,
                this.health = o.health,
                this.layer = 2,
                this.group != null ? this.layer = this.group.layer : this.type == 0 ? this.layer = 3 : this.type == 2 ? this.layer = 0 : this.type == 4 && (this.layer = -1),
                this.colDiv = o.colDiv || 1,
                this.blocker = o.blocker,
                this.ignoreCollision = o.ignoreCollision,
                this.dontGather = o.dontGather,
                this.hideFromEnemy = o.hideFromEnemy,
                this.friction = o.friction,
                this.projDmg = o.projDmg,
                this.dmg = o.dmg,
                this.pDmg = o.pDmg,
                this.pps = o.pps,
                this.zIndex = o.zIndex || 0,
                this.turnSpeed = o.turnSpeed,
                this.req = o.req,
                this.trap = o.trap,
                this.healCol = o.healCol,
                this.teleport = o.teleport,
                this.boostSpeed = o.boostSpeed,
                this.projectile = o.projectile,
                this.shootRange = o.shootRange,
                this.shootRate = o.shootRate,
                this.shootCount = this.shootRate,
                this.spawnPoint = o.spawnPoint
        }
            ,
            this.changeHealth = function(t, i) {
            return this.health += t,
                this.health <= 0
        }
            ,
            this.getScale = function(t, i) {
            return t = t || 1,
                this.scale * (this.isItem || this.type == 2 || this.type == 3 || this.type == 4 ? 1 : .6 * t) * (i ? 1 : this.colDiv)
        }
            ,
            this.visibleToPlayer = function(t) {
            return !this.hideFromEnemy || this.owner && (this.owner == t || this.owner.team && t.team == this.owner.team)
        }
            ,
            this.update = function(t) {
            this.active && (this.xWiggle && (this.xWiggle *= Math.pow(.99, t)),
                            this.yWiggle && (this.yWiggle *= Math.pow(.99, t)),
                            this.turnSpeed && (this.dir += this.turnSpeed * t))
        }
    }
    const de = [{
        id: 0,
        name: "food",
        layer: 0
    }, {
        id: 1,
        name: "walls",
        place: !0,
        limit: 30,
        layer: 0
    }, {
        id: 2,
        name: "spikes",
        place: !0,
        limit: 15,
        layer: 0
    }, {
        id: 3,
        name: "mill",
        place: !0,
        limit: 7,
        sandboxLimit: 299,
        layer: 1
    }, {
        id: 4,
        name: "mine",
        place: !0,
        limit: 1,
        layer: 0
    }, {
        id: 5,
        name: "trap",
        place: !0,
        limit: 6,
        layer: -1
    }, {
        id: 6,
        name: "booster",
        place: !0,
        limit: 12,
        sandboxLimit: 299,
        layer: -1
    }, {
        id: 7,
        name: "turret",
        place: !0,
        limit: 2,
        layer: 1
    }, {
        id: 8,
        name: "watchtower",
        place: !0,
        limit: 12,
        layer: 1
    }, {
        id: 9,
        name: "buff",
        place: !0,
        limit: 4,
        layer: -1
    }, {
        id: 10,
        name: "spawn",
        place: !0,
        limit: 1,
        layer: -1
    }, {
        id: 11,
        name: "sapling",
        place: !0,
        limit: 2,
        layer: 0
    }, {
        id: 12,
        name: "blocker",
        place: !0,
        limit: 3,
        layer: -1
    }, {
        id: 13,
        name: "teleporter",
        place: !0,
        limit: 2,
        sandboxLimit: 299,
        layer: -1
    }]
    , Ah = [{
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 25,
        speed: 1.6,
        scale: 103,
        range: 1e3
    }, {
        indx: 1,
        layer: 1,
        dmg: 25,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 35,
        speed: 2.5,
        scale: 103,
        range: 1200
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 30,
        speed: 2,
        scale: 103,
        range: 1200
    }, {
        indx: 1,
        layer: 1,
        dmg: 16,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "bullet_1",
        dmg: 50,
        speed: 3.6,
        scale: 160,
        range: 1400
    }]
    , Dh = [{
        id: 0,
        type: 0,
        name: "tool hammer",
        desc: "tool for gathering all resources",
        src: "hammer_1",
        length: 140,
        width: 140,
        xOff: -3,
        yOff: 18,
        dmg: 25,
        range: 65,
        gather: 1,
        speed: 300
    }, {
        id: 1,
        type: 0,
        age: 2,
        name: "hand axe",
        desc: "gathers resources at a higher rate",
        src: "axe_1",
        length: 140,
        width: 140,
        xOff: 3,
        yOff: 24,
        dmg: 30,
        spdMult: 1,
        range: 70,
        gather: 2,
        speed: 400
    }, {
        id: 2,
        type: 0,
        age: 8,
        pre: 1,
        name: "great axe",
        desc: "deal more damage and gather more resources",
        src: "great_axe_1",
        length: 140,
        width: 140,
        xOff: -8,
        yOff: 25,
        dmg: 35,
        spdMult: 1,
        range: 75,
        gather: 4,
        speed: 400
    }, {
        id: 3,
        type: 0,
        age: 2,
        name: "short sword",
        desc: "increased attack power but slower move speed",
        src: "sword_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 46,
        dmg: 35,
        spdMult: .85,
        range: 110,
        gather: 1,
        speed: 300
    }, {
        id: 4,
        type: 0,
        age: 8,
        pre: 3,
        name: "katana",
        desc: "greater range and damage",
        src: "samurai_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 59,
        dmg: 40,
        spdMult: .8,
        range: 118,
        gather: 1,
        speed: 300
    }, {
        id: 5,
        type: 0,
        age: 2,
        name: "polearm",
        desc: "long range melee weapon",
        src: "spear_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 53,
        dmg: 45,
        knock: .2,
        spdMult: .82,
        range: 142,
        gather: 1,
        speed: 700
    }, {
        id: 6,
        type: 0,
        age: 2,
        name: "bat",
        desc: "fast long range melee weapon",
        src: "bat_1",
        iPad: 1.3,
        length: 110,
        width: 180,
        xOff: -8,
        yOff: 53,
        dmg: 20,
        knock: .7,
        range: 110,
        gather: 1,
        speed: 300
    }, {
        id: 7,
        type: 0,
        age: 2,
        name: "daggers",
        desc: "really fast short range weapon",
        src: "dagger_1",
        iPad: .8,
        length: 110,
        width: 110,
        xOff: 18,
        yOff: 0,
        dmg: 20,
        knock: .1,
        range: 65,
        gather: 1,
        hitSlow: .1,
        spdMult: 1.13,
        speed: 100
    }, {
        id: 8,
        type: 0,
        age: 2,
        name: "stick",
        desc: "great for gathering but very weak",
        src: "stick_1",
        length: 140,
        width: 140,
        xOff: 3,
        yOff: 24,
        dmg: 1,
        spdMult: 1,
        range: 70,
        gather: 7,
        speed: 400
    }, {
        id: 9,
        type: 1,
        age: 6,
        name: "hunting bow",
        desc: "bow used for ranged combat and hunting",
        src: "bow_1",
        req: ["wood", 4],
        length: 120,
        width: 120,
        xOff: -6,
        yOff: 0,
        projectile: 0,
        spdMult: .75,
        speed: 600
    }, {
        id: 10,
        type: 1,
        age: 6,
        name: "great hammer",
        desc: "hammer used for destroying structures",
        src: "great_hammer_1",
        length: 140,
        width: 140,
        xOff: -9,
        yOff: 25,
        dmg: 10,
        spdMult: .88,
        range: 75,
        sDmg: 7.5,
        gather: 1,
        speed: 400
    }, {
        id: 11,
        type: 1,
        age: 6,
        name: "wooden shield",
        desc: "blocks projectiles and reduces melee damage",
        src: "shield_1",
        length: 120,
        width: 120,
        shield: .2,
        xOff: 6,
        yOff: 0,
        spdMult: .7
    }, {
        id: 12,
        type: 1,
        age: 8,
        pre: 9,
        name: "crossbow",
        desc: "deals more damage and has greater range",
        src: "crossbow_1",
        req: ["wood", 5],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 2,
        spdMult: .7,
        speed: 700
    }, {
        id: 13,
        type: 1,
        age: 9,
        pre: 12,
        name: "repeater crossbow",
        desc: "high firerate crossbow with reduced damage",
        src: "crossbow_2",
        req: ["wood", 10],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 3,
        spdMult: .7,
        speed: 230
    }, {
        id: 14,
        type: 1,
        age: 6,
        name: "mc grabby",
        desc: "steals resources from enemies",
        src: "grab_1",
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 53,
        dmg: 0,
        steal: 250,
        knock: .2,
        spdMult: 1.05,
        range: 125,
        gather: 0,
        speed: 700
    }, {
        id: 15,
        type: 1,
        age: 9,
        pre: 12,
        name: "musket",
        desc: "slow firerate but high damage and range",
        src: "musket_1",
        req: ["stone", 10],
        aboveHand: !0,
        rec: .35,
        armS: .6,
        hndS: .3,
        hndD: 1.6,
        length: 205,
        width: 205,
        xOff: 25,
        yOff: 0,
        projectile: 5,
        hideProjectile: !0,
        spdMult: .6,
        speed: 1500
    }]
    , Zt = [{
        group: de[0],
        name: "apple",
        desc: "restores 20 health when consumed",
        req: ["food", 10],
        consume: function(e) {
            return e.changeHealth(20, e)
        },
        scale: 22,
        holdOffset: 15
    }, {
        age: 3,
        group: de[0],
        name: "cookie",
        desc: "restores 40 health when consumed",
        req: ["food", 15],
        consume: function(e) {
            return e.changeHealth(40, e)
        },
        scale: 27,
        holdOffset: 15
    }, {
        age: 7,
        group: de[0],
        name: "cheese",
        desc: "restores 30 health and another 50 over 5 seconds",
        req: ["food", 25],
        consume: function(e) {
            return e.changeHealth(30, e) || e.health < 100 ? (e.dmgOverTime.dmg = -10,
                                                              e.dmgOverTime.doer = e,
                                                              e.dmgOverTime.time = 5,
                                                              !0) : !1
        },
        scale: 27,
        holdOffset: 15
    }, {
        group: de[1],
        name: "wood wall",
        desc: "provides protection for your village",
        req: ["wood", 10],
        projDmg: !0,
        health: 380,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 3,
        group: de[1],
        name: "stone wall",
        desc: "provides improved protection for your village",
        req: ["stone", 25],
        health: 900,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        pre: 1,
        group: de[1],
        name: "castle wall",
        desc: "provides powerful protection for your village",
        req: ["stone", 35],
        health: 1500,
        scale: 52,
        holdOffset: 20,
        placeOffset: -5
    }, {
        group: de[2],
        name: "spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 20, "stone", 5],
        health: 400,
        dmg: 20,
        scale: 49,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 5,
        group: de[2],
        name: "greater spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 30, "stone", 10],
        health: 500,
        dmg: 35,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 9,
        pre: 1,
        group: de[2],
        name: "poison spikes",
        desc: "poisons enemies when they touch them",
        req: ["wood", 35, "stone", 15],
        health: 600,
        dmg: 30,
        pDmg: 5,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 9,
        pre: 2,
        group: de[2],
        name: "spinning spikes",
        desc: "damages enemies when they touch them",
        req: ["wood", 30, "stone", 20],
        health: 500,
        dmg: 45,
        turnSpeed: .003,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        group: de[3],
        name: "windmill",
        desc: "generates gold over time",
        req: ["wood", 50, "stone", 10],
        health: 400,
        pps: 1,
        turnSpeed: .0016,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 45,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 5,
        pre: 1,
        group: de[3],
        name: "faster windmill",
        desc: "generates more gold over time",
        req: ["wood", 60, "stone", 20],
        health: 500,
        pps: 1.5,
        turnSpeed: .0025,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 8,
        pre: 1,
        group: de[3],
        name: "power mill",
        desc: "generates more gold over time",
        req: ["wood", 100, "stone", 50],
        health: 800,
        pps: 2,
        turnSpeed: .005,
        spritePadding: 25,
        iconLineMult: 12,
        scale: 47,
        holdOffset: 20,
        placeOffset: 5
    }, {
        age: 5,
        group: de[4],
        type: 2,
        name: "mine",
        desc: "allows you to mine stone",
        req: ["wood", 20, "stone", 100],
        iconLineMult: 12,
        scale: 65,
        holdOffset: 20,
        placeOffset: 0
    }, {
        age: 5,
        group: de[11],
        type: 0,
        name: "sapling",
        desc: "allows you to farm wood",
        req: ["wood", 150],
        iconLineMult: 12,
        colDiv: .5,
        scale: 110,
        holdOffset: 50,
        placeOffset: -15
    }, {
        age: 4,
        group: de[5],
        name: "pit trap",
        desc: "pit that traps enemies if they walk over it",
        req: ["wood", 30, "stone", 30],
        trap: !0,
        ignoreCollision: !0,
        hideFromEnemy: !0,
        health: 500,
        colDiv: .2,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 4,
        group: de[6],
        name: "boost pad",
        desc: "provides boost when stepped on",
        req: ["stone", 20, "wood", 5],
        ignoreCollision: !0,
        boostSpeed: 1.5,
        health: 150,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: de[7],
        doUpdate: !0,
        name: "turret",
        desc: "defensive structure that shoots at enemies",
        req: ["wood", 200, "stone", 150],
        health: 800,
        projectile: 1,
        shootRange: 700,
        shootRate: 2200,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: de[8],
        name: "platform",
        desc: "platform to shoot over walls and cross over water",
        req: ["wood", 20],
        ignoreCollision: !0,
        zIndex: 1,
        health: 300,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: de[9],
        name: "healing pad",
        desc: "standing on it will slowly heal you",
        req: ["wood", 30, "food", 10],
        ignoreCollision: !0,
        healCol: 15,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 9,
        group: de[10],
        name: "spawn pad",
        desc: "you will spawn here when you die but it will dissapear",
        req: ["wood", 100, "stone", 100],
        health: 400,
        ignoreCollision: !0,
        spawnPoint: !0,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: de[12],
        name: "blocker",
        desc: "blocks building in radius",
        req: ["wood", 30, "stone", 25],
        ignoreCollision: !0,
        blocker: 300,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: de[13],
        name: "teleporter",
        desc: "teleports you to a random point on the map",
        req: ["wood", 60, "stone", 60],
        ignoreCollision: !0,
        teleport: !0,
        health: 200,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }];
    for (let e = 0; e < Zt.length; ++e)
        Zt[e].id = e,
            Zt[e].pre && (Zt[e].pre = e - Zt[e].pre);
    const L = {
        groups: de,
        projectiles: Ah,
        weapons: Dh,
        list: Zt
    }
    , Oh = ["ahole", "anus", "ash0le", "ash0les", "asholes", "ass", "Ass Monkey", "Assface", "assh0le", "assh0lez", "asshole", "assholes", "assholz", "asswipe", "azzhole", "bassterds", "bastard", "bastards", "bastardz", "basterds", "basterdz", "Biatch", "bitch", "bitches", "Blow Job", "boffing", "butthole", "buttwipe", "c0ck", "c0cks", "c0k", "Carpet Muncher", "cawk", "cawks", "Clit", "cnts", "cntz", "cock", "cockhead", "cock-head", "cocks", "CockSucker", "cock-sucker", "crap", "cum", "cunt", "cunts", "cuntz", "dick", "dild0", "dild0s", "dildo", "dildos", "dilld0", "dilld0s", "dominatricks", "dominatrics", "dominatrix", "dyke", "enema", "f u c k", "f u c k e r", "fag", "fag1t", "faget", "fagg1t", "faggit", "faggot", "fagg0t", "fagit", "fags", "fagz", "faig", "faigs", "fart", "flipping the bird", "fuck", "fucker", "fuckin", "fucking", "fucks", "Fudge Packer", "fuk", "Fukah", "Fuken", "fuker", "Fukin", "Fukk", "Fukkah", "Fukken", "Fukker", "Fukkin", "g00k", "God-damned", "h00r", "h0ar", "h0re", "hells", "hoar", "hoor", "hoore", "jackoff", "jap", "japs", "jerk-off", "jisim", "jiss", "jizm", "jizz", "knob", "knobs", "knobz", "kunt", "kunts", "kuntz", "Lezzian", "Lipshits", "Lipshitz", "masochist", "masokist", "massterbait", "masstrbait", "masstrbate", "masterbaiter", "masterbate", "masterbates", "Motha Fucker", "Motha Fuker", "Motha Fukkah", "Motha Fukker", "Mother Fucker", "Mother Fukah", "Mother Fuker", "Mother Fukkah", "Mother Fukker", "mother-fucker", "Mutha Fucker", "Mutha Fukah", "Mutha Fuker", "Mutha Fukkah", "Mutha Fukker", "n1gr", "nastt", "nigger;", "nigur;", "niiger;", "niigr;", "orafis", "orgasim;", "orgasm", "orgasum", "oriface", "orifice", "orifiss", "packi", "packie", "packy", "paki", "pakie", "paky", "pecker", "peeenus", "peeenusss", "peenus", "peinus", "pen1s", "penas", "penis", "penis-breath", "penus", "penuus", "Phuc", "Phuck", "Phuk", "Phuker", "Phukker", "polac", "polack", "polak", "Poonani", "pr1c", "pr1ck", "pr1k", "pusse", "pussee", "pussy", "puuke", "puuker", "qweir", "recktum", "rectum", "retard", "sadist", "scank", "schlong", "screwing", "semen", "sex", "sexy", "Sh!t", "sh1t", "sh1ter", "sh1ts", "sh1tter", "sh1tz", "shit", "shits", "shitter", "Shitty", "Shity", "shitz", "Shyt", "Shyte", "Shytty", "Shyty", "skanck", "skank", "skankee", "skankey", "skanks", "Skanky", "slag", "slut", "sluts", "Slutty", "slutz", "son-of-a-bitch", "tit", "turd", "va1jina", "vag1na", "vagiina", "vagina", "vaj1na", "vajina", "vullva", "vulva", "w0p", "wh00r", "wh0re", "whore", "xrated", "xxx", "b!+ch", "bitch", "blowjob", "clit", "arschloch", "fuck", "shit", "ass", "asshole", "b!tch", "b17ch", "b1tch", "bastard", "bi+ch", "boiolas", "buceta", "c0ck", "cawk", "chink", "cipa", "clits", "cock", "cum", "cunt", "dildo", "dirsa", "ejakulate", "fatass", "fcuk", "fuk", "fux0r", "hoer", "hore", "jism", "kawk", "l3itch", "l3i+ch", "masturbate", "masterbat*", "masterbat3", "motherfucker", "s.o.b.", "mofo", "nazi", "nigga", "nigger", "nutsack", "phuck", "pimpis", "pusse", "pussy", "scrotum", "sh!t", "shemale", "shi+", "sh!+", "slut", "smut", "teets", "tits", "boobs", "b00bs", "teez", "testical", "testicle", "titt", "w00se", "jackoff", "wank", "whoar", "whore", "*damn", "*dyke", "*fuck*", "*shit*", "@$$", "amcik", "andskota", "arse*", "assrammer", "ayir", "bi7ch", "bitch*", "bollock*", "breasts", "butt-pirate", "cabron", "cazzo", "chraa", "chuj", "Cock*", "cunt*", "d4mn", "daygo", "dego", "dick*", "dike*", "dupa", "dziwka", "ejackulate", "Ekrem*", "Ekto", "enculer", "faen", "fag*", "fanculo", "fanny", "feces", "feg", "Felcher", "ficken", "fitt*", "Flikker", "foreskin", "Fotze", "Fu(*", "fuk*", "futkretzn", "gook", "guiena", "h0r", "h4x0r", "hell", "helvete", "hoer*", "honkey", "Huevon", "hui", "injun", "jizz", "kanker*", "kike", "klootzak", "kraut", "knulle", "kuk", "kuksuger", "Kurac", "kurwa", "kusi*", "kyrpa*", "lesbo", "mamhoon", "masturbat*", "merd*", "mibun", "monkleigh", "mouliewop", "muie", "mulkku", "muschi", "nazis", "nepesaurio", "nigger*", "orospu", "paska*", "perse", "picka", "pierdol*", "pillu*", "pimmel", "piss*", "pizda", "poontsee", "poop", "porn", "p0rn", "pr0n", "preteen", "pula", "pule", "puta", "puto", "qahbeh", "queef*", "rautenberg", "schaffer", "scheiss*", "schlampe", "schmuck", "screw", "sh!t*", "sharmuta", "sharmute", "shipal", "shiz", "skribz", "skurwysyn", "sphencter", "spic", "spierdalaj", "splooge", "suka", "b00b*", "testicle*", "titt*", "twat", "vittu", "wank*", "wetback*", "wichser", "wop*", "yed", "zabourah"]
    , _h = {
        words: Oh
    };
    var zh = {
        "4r5e": 1,
        "5h1t": 1,
        "5hit": 1,
        a55: 1,
        anal: 1,
        anus: 1,
        ar5e: 1,
        arrse: 1,
        arse: 1,
        ass: 1,
        "ass-fucker": 1,
        asses: 1,
        assfucker: 1,
        assfukka: 1,
        asshole: 1,
        assholes: 1,
        asswhole: 1,
        a_s_s: 1,
        "b!tch": 1,
        b00bs: 1,
        b17ch: 1,
        b1tch: 1,
        ballbag: 1,
        balls: 1,
        ballsack: 1,
        bastard: 1,
        beastial: 1,
        beastiality: 1,
        bellend: 1,
        bestial: 1,
        bestiality: 1,
        "bi+ch": 1,
        biatch: 1,
        bitch: 1,
        bitcher: 1,
        bitchers: 1,
        bitches: 1,
        bitchin: 1,
        bitching: 1,
        bloody: 1,
        "blow job": 1,
        blowjob: 1,
        blowjobs: 1,
        boiolas: 1,
        bollock: 1,
        bollok: 1,
        boner: 1,
        boob: 1,
        boobs: 1,
        booobs: 1,
        boooobs: 1,
        booooobs: 1,
        booooooobs: 1,
        breasts: 1,
        buceta: 1,
        bugger: 1,
        bum: 1,
        "bunny fucker": 1,
        butt: 1,
        butthole: 1,
        buttmuch: 1,
        buttplug: 1,
        c0ck: 1,
        c0cksucker: 1,
        "carpet muncher": 1,
        cawk: 1,
        chink: 1,
        cipa: 1,
        cl1t: 1,
        clit: 1,
        clitoris: 1,
        clits: 1,
        cnut: 1,
        cock: 1,
        "cock-sucker": 1,
        cockface: 1,
        cockhead: 1,
        cockmunch: 1,
        cockmuncher: 1,
        cocks: 1,
        cocksuck: 1,
        cocksucked: 1,
        cocksucker: 1,
        cocksucking: 1,
        cocksucks: 1,
        cocksuka: 1,
        cocksukka: 1,
        cok: 1,
        cokmuncher: 1,
        coksucka: 1,
        coon: 1,
        cox: 1,
        crap: 1,
        cum: 1,
        cummer: 1,
        cumming: 1,
        cums: 1,
        cumshot: 1,
        cunilingus: 1,
        cunillingus: 1,
        cunnilingus: 1,
        cunt: 1,
        cuntlick: 1,
        cuntlicker: 1,
        cuntlicking: 1,
        cunts: 1,
        cyalis: 1,
        cyberfuc: 1,
        cyberfuck: 1,
        cyberfucked: 1,
        cyberfucker: 1,
        cyberfuckers: 1,
        cyberfucking: 1,
        d1ck: 1,
        damn: 1,
        dick: 1,
        dickhead: 1,
        dildo: 1,
        dildos: 1,
        dink: 1,
        dinks: 1,
        dirsa: 1,
        dlck: 1,
        "dog-fucker": 1,
        doggin: 1,
        dogging: 1,
        donkeyribber: 1,
        doosh: 1,
        duche: 1,
        dyke: 1,
        ejaculate: 1,
        ejaculated: 1,
        ejaculates: 1,
        ejaculating: 1,
        ejaculatings: 1,
        ejaculation: 1,
        ejakulate: 1,
        "f u c k": 1,
        "f u c k e r": 1,
        f4nny: 1,
        fag: 1,
        fagging: 1,
        faggitt: 1,
        faggot: 1,
        faggs: 1,
        fagot: 1,
        fagots: 1,
        fags: 1,
        fanny: 1,
        fannyflaps: 1,
        fannyfucker: 1,
        fanyy: 1,
        fatass: 1,
        fcuk: 1,
        fcuker: 1,
        fcuking: 1,
        feck: 1,
        fecker: 1,
        felching: 1,
        fellate: 1,
        fellatio: 1,
        fingerfuck: 1,
        fingerfucked: 1,
        fingerfucker: 1,
        fingerfuckers: 1,
        fingerfucking: 1,
        fingerfucks: 1,
        fistfuck: 1,
        fistfucked: 1,
        fistfucker: 1,
        fistfuckers: 1,
        fistfucking: 1,
        fistfuckings: 1,
        fistfucks: 1,
        flange: 1,
        fook: 1,
        fooker: 1,
        fuck: 1,
        fucka: 1,
        fucked: 1,
        fucker: 1,
        fuckers: 1,
        fuckhead: 1,
        fuckheads: 1,
        fuckin: 1,
        fucking: 1,
        fuckings: 1,
        fuckingshitmotherfucker: 1,
        fuckme: 1,
        fucks: 1,
        fuckwhit: 1,
        fuckwit: 1,
        "fudge packer": 1,
        fudgepacker: 1,
        fuk: 1,
        fuker: 1,
        fukker: 1,
        fukkin: 1,
        fuks: 1,
        fukwhit: 1,
        fukwit: 1,
        fux: 1,
        fux0r: 1,
        f_u_c_k: 1,
        gangbang: 1,
        gangbanged: 1,
        gangbangs: 1,
        gaylord: 1,
        gaysex: 1,
        goatse: 1,
        God: 1,
        "god-dam": 1,
        "god-damned": 1,
        goddamn: 1,
        goddamned: 1,
        hardcoresex: 1,
        hell: 1,
        heshe: 1,
        hoar: 1,
        hoare: 1,
        hoer: 1,
        homo: 1,
        hore: 1,
        horniest: 1,
        horny: 1,
        hotsex: 1,
        "jack-off": 1,
        jackoff: 1,
        jap: 1,
        "jerk-off": 1,
        jism: 1,
        jiz: 1,
        jizm: 1,
        jizz: 1,
        kawk: 1,
        knob: 1,
        knobead: 1,
        knobed: 1,
        knobend: 1,
        knobhead: 1,
        knobjocky: 1,
        knobjokey: 1,
        kock: 1,
        kondum: 1,
        kondums: 1,
        kum: 1,
        kummer: 1,
        kumming: 1,
        kums: 1,
        kunilingus: 1,
        "l3i+ch": 1,
        l3itch: 1,
        labia: 1,
        lust: 1,
        lusting: 1,
        m0f0: 1,
        m0fo: 1,
        m45terbate: 1,
        ma5terb8: 1,
        ma5terbate: 1,
        masochist: 1,
        "master-bate": 1,
        masterb8: 1,
        "masterbat*": 1,
        masterbat3: 1,
        masterbate: 1,
        masterbation: 1,
        masterbations: 1,
        masturbate: 1,
        "mo-fo": 1,
        mof0: 1,
        mofo: 1,
        mothafuck: 1,
        mothafucka: 1,
        mothafuckas: 1,
        mothafuckaz: 1,
        mothafucked: 1,
        mothafucker: 1,
        mothafuckers: 1,
        mothafuckin: 1,
        mothafucking: 1,
        mothafuckings: 1,
        mothafucks: 1,
        "mother fucker": 1,
        motherfuck: 1,
        motherfucked: 1,
        motherfucker: 1,
        motherfuckers: 1,
        motherfuckin: 1,
        motherfucking: 1,
        motherfuckings: 1,
        motherfuckka: 1,
        motherfucks: 1,
        muff: 1,
        mutha: 1,
        muthafecker: 1,
        muthafuckker: 1,
        muther: 1,
        mutherfucker: 1,
        n1gga: 1,
        n1gger: 1,
        nazi: 1,
        nigg3r: 1,
        nigg4h: 1,
        nigga: 1,
        niggah: 1,
        niggas: 1,
        niggaz: 1,
        nigger: 1,
        niggers: 1,
        nob: 1,
        "nob jokey": 1,
        nobhead: 1,
        nobjocky: 1,
        nobjokey: 1,
        numbnuts: 1,
        nutsack: 1,
        orgasim: 1,
        orgasims: 1,
        orgasm: 1,
        orgasms: 1,
        p0rn: 1,
        pawn: 1,
        pecker: 1,
        penis: 1,
        penisfucker: 1,
        phonesex: 1,
        phuck: 1,
        phuk: 1,
        phuked: 1,
        phuking: 1,
        phukked: 1,
        phukking: 1,
        phuks: 1,
        phuq: 1,
        pigfucker: 1,
        pimpis: 1,
        piss: 1,
        pissed: 1,
        pisser: 1,
        pissers: 1,
        pisses: 1,
        pissflaps: 1,
        pissin: 1,
        pissing: 1,
        pissoff: 1,
        poop: 1,
        porn: 1,
        porno: 1,
        pornography: 1,
        pornos: 1,
        prick: 1,
        pricks: 1,
        pron: 1,
        pube: 1,
        pusse: 1,
        pussi: 1,
        pussies: 1,
        pussy: 1,
        pussys: 1,
        rectum: 1,
        retard: 1,
        rimjaw: 1,
        rimming: 1,
        "s hit": 1,
        "s.o.b.": 1,
        sadist: 1,
        schlong: 1,
        screwing: 1,
        scroat: 1,
        scrote: 1,
        scrotum: 1,
        semen: 1,
        sex: 1,
        "sh!+": 1,
        "sh!t": 1,
        sh1t: 1,
        shag: 1,
        shagger: 1,
        shaggin: 1,
        shagging: 1,
        shemale: 1,
        "shi+": 1,
        shit: 1,
        shitdick: 1,
        shite: 1,
        shited: 1,
        shitey: 1,
        shitfuck: 1,
        shitfull: 1,
        shithead: 1,
        shiting: 1,
        shitings: 1,
        shits: 1,
        shitted: 1,
        shitter: 1,
        shitters: 1,
        shitting: 1,
        shittings: 1,
        shitty: 1,
        skank: 1,
        slut: 1,
        sluts: 1,
        smegma: 1,
        smut: 1,
        snatch: 1,
        "son-of-a-bitch": 1,
        spac: 1,
        spunk: 1,
        s_h_i_t: 1,
        t1tt1e5: 1,
        t1tties: 1,
        teets: 1,
        teez: 1,
        testical: 1,
        testicle: 1,
        tit: 1,
        titfuck: 1,
        tits: 1,
        titt: 1,
        tittie5: 1,
        tittiefucker: 1,
        titties: 1,
        tittyfuck: 1,
        tittywank: 1,
        titwank: 1,
        tosser: 1,
        turd: 1,
        tw4t: 1,
        twat: 1,
        twathead: 1,
        twatty: 1,
        twunt: 1,
        twunter: 1,
        v14gra: 1,
        v1gra: 1,
        vagina: 1,
        viagra: 1,
        vulva: 1,
        w00se: 1,
        wang: 1,
        wank: 1,
        wanker: 1,
        wanky: 1,
        whoar: 1,
        whore: 1,
        willies: 1,
        willy: 1,
        xrated: 1,
        xxx: 1
    }
    , Bh = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"]
    , Hh = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi
    , Lh = {
        object: zh,
        array: Bh,
        regex: Hh
    };
    const Fh = _h.words
    , Vh = Lh.array;
    class Nh {
        constructor(t={}) {
            Object.assign(this, {
                list: t.emptyList && [] || Array.prototype.concat.apply(Fh, [Vh, t.list || []]),
                exclude: t.exclude || [],
                splitRegex: t.splitRegex || /\b/,
                placeHolder: t.placeHolder || "*",
                regex: t.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
                replaceRegex: t.replaceRegex || /\w/g
            })
        }
        isProfane(t) {
            return this.list.filter(i => {
                const n = new RegExp(`\\b${i.replace(/(\W)/g, "\\$1")}\\b`,"gi");
                return !this.exclude.includes(i.toLowerCase()) && n.test(t)
            }
                                   ).length > 0 || !1
        }
        replaceWord(t) {
            return t.replace(this.regex, "").replace(this.replaceRegex, this.placeHolder)
        }
        clean(t) {
            return t.split(this.splitRegex).map(i => this.isProfane(i) ? this.replaceWord(i) : i).join(this.splitRegex.exec(t)[0])
        }
        addWords() {
            let t = Array.from(arguments);
            this.list.push(...t),
                t.map(i => i.toLowerCase()).forEach(i => {
                this.exclude.includes(i) && this.exclude.splice(this.exclude.indexOf(i), 1)
            }
                                                   )
        }
        removeWords() {
            this.exclude.push(...Array.from(arguments).map(t => t.toLowerCase()))
        }
    }
    var Uh = Nh;
    const Wh = An(Uh)
    , Ko = new Wh
    , Xh = ["jew", "black", "baby", "child", "white", "porn", "pedo", "trump", "clinton", "hitler", "nazi", "gay", "pride", "sex", "pleasure", "touch", "poo", "kids", "rape", "white power", "nigga", "nig nog", "doggy", "rapist", "boner", "nigger", "nigg", "finger", "nogger", "nagger", "nig", "fag", "gai", "pole", "stripper", "penis", "vagina", "pussy", "nazi", "hitler", "stalin", "burn", "chamber", "cock", "peen", "dick", "spick", "nieger", "die", "satan", "n|ig", "nlg", "cunt", "c0ck", "fag", "lick", "condom", "anal", "shit", "phile", "little", "kids", "free KR", "tiny", "sidney", "ass", "kill", ".io", "(dot)", "[dot]", "mini", "whiore", "whore", "faggot", "github", "1337", "666", "satan", "senpa", "discord", "d1scord", "mistik", ".io", "senpa.io", "sidney", "sid", "senpaio", "vries", "asa"];
    Ko.addWords(...Xh);
    const Ir = Math.abs
    , Ut = Math.cos
    , Wt = Math.sin
    , Tr = Math.pow
    , qh = Math.sqrt;
    function Gh(e, t, i, n, s, r, o, l, c, a, f, d, u, p) {
        this.id = e,
            this.sid = t,
            this.tmpScore = 0,
            this.team = null,
            this.skinIndex = 0,
            this.tailIndex = 0,
            this.hitTime = 0,
            this.tails = {};
        for (var w = 0; w < f.length; ++w)
            f[w].price <= 0 && (this.tails[f[w].id] = 1);
        this.skins = {};
        for (var w = 0; w < a.length; ++w)
            a[w].price <= 0 && (this.skins[a[w].id] = 1);
        this.points = 0,
            this.dt = 0,
            this.hidden = !1,
            this.itemCounts = {},
            this.isPlayer = !0,
            this.pps = 0,
            this.moveDir = void 0,
            this.skinRot = 0,
            this.lastPing = 0,
            this.iconIndex = 0,
            this.skinColor = 0,
            this.spawn = function(v) {
            this.active = !0,
                this.alive = !0,
                this.lockMove = !1,
                this.lockDir = !1,
                this.minimapCounter = 0,
                this.chatCountdown = 0,
                this.shameCount = 0,
                this.shameTimer = 0,
                this.sentTo = {},
                this.gathering = 0,
                this.autoGather = 0,
                this.animTime = 0,
                this.animSpeed = 0,
                this.mouseState = 0,
                this.buildIndex = -1,
                this.weaponIndex = 0,
                this.dmgOverTime = {},
                this.noMovTimer = 0,
                this.maxXP = 300,
                this.XP = 0,
                this.age = 1,
                this.kills = 0,
                this.upgrAge = 2,
                this.upgradePoints = 0,
                this.x = 0,
                this.y = 0,
                this.zIndex = 0,
                this.xVel = 0,
                this.yVel = 0,
                this.slowMult = 1,
                this.dir = 0,
                this.dirPlus = 0,
                this.targetDir = 0,
                this.targetAngle = 0,
                this.maxHealth = 100,
                this.health = this.maxHealth,
                this.scale = i.playerScale,
                this.speed = i.playerSpeed,
                this.resetMoveDir(),
                this.resetResources(v),
                this.items = [0, 3, 6, 10],
                this.weapons = [0],
                this.shootCount = 0,
                this.weaponXP = [],
                this.reloads = {},
                this.timeSpentNearVolcano = 0
        }
            ,
            this.resetMoveDir = function() {
            this.moveDir = void 0
        }
            ,
            this.resetResources = function(v) {
            for (let S = 0; S < i.resourceTypes.length; ++S)
                this[i.resourceTypes[S]] = v ? 100 : 0
        }
            ,
            this.addItem = function(v) {
            const S = c.list[v];
            if (S) {
                for (let R = 0; R < this.items.length; ++R)
                    if (c.list[this.items[R]].group == S.group)
                        return this.buildIndex == this.items[R] && (this.buildIndex = v),
                            this.items[R] = v,
                            !0;
                return this.items.push(v),
                    !0
            }
            return !1
        }
            ,
            this.setUserData = function(v) {
            if (v) {
                this.name = "unknown";
                let S = v.name + "";
                S = S.slice(0, i.maxNameLength),
                    S = S.replace(/[^\w:\(\)\/? -]+/gmi, " "),
                    S = S.replace(/[^\x00-\x7F]/g, " "),
                    S = S.trim();
                let R = !1;
                const G = S.toLowerCase().replace(/\s/g, "").replace(/1/g, "i").replace(/0/g, "o").replace(/5/g, "s");
                for (const X of Ko.list)
                    if (G.indexOf(X) != -1) {
                        R = !0;
                        break
                    }
                S.length > 0 && !R && (this.name = S),
                    this.skinColor = 0,
                    i.skinColors[v.skin] && (this.skinColor = v.skin)
            }
        }
            ,
            this.getData = function() {
            return [this.id, this.sid, this.name, n.fixTo(this.x, 2), n.fixTo(this.y, 2), n.fixTo(this.dir, 3), this.health, this.maxHealth, this.scale, this.skinColor]
        }
            ,
            this.setData = function(v) {
            this.id = v[0],
                this.sid = v[1],
                this.name = v[2],
                this.x = v[3],
                this.y = v[4],
                this.dir = v[5],
                this.health = v[6],
                this.maxHealth = v[7],
                this.scale = v[8],
                this.skinColor = v[9]
        }
        ;
        let x = 0;
        this.update = function(v) {
            if (!this.alive)
                return;
            if ((n.getDistance(this.x, this.y, i.volcanoLocationX, i.volcanoLocationY) || 0) < i.volcanoAggressionRadius && (this.timeSpentNearVolcano += v,
                                                                                                                             this.timeSpentNearVolcano >= 1e3 && (this.changeHealth(i.volcanoDamagePerSecond, null),
        d.send(this.id, "8", Math.round(this.x), Math.round(this.y), i.volcanoDamagePerSecond, -1),
        this.timeSpentNearVolcano %= 1e3)),
                this.shameTimer > 0 && (this.shameTimer -= v,
                                        this.shameTimer <= 0 && (this.shameTimer = 0,
                                                                 this.shameCount = 0)),
                x -= v,
                x <= 0) {
                const _ = (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) + (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
                _ && this.changeHealth(_, this),
                    this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer),
                                             this.dmgOverTime.time -= 1,
                                             this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)),
                    this.healCol && this.changeHealth(this.healCol, this),
                    x = 1e3
            }
            if (!this.alive)
                return;
            if (this.slowMult < 1 && (this.slowMult += 8e-4 * v,
                                      this.slowMult > 1 && (this.slowMult = 1)),
                this.noMovTimer += v,
                (this.xVel || this.yVel) && (this.noMovTimer = 0),
                this.lockMove)
                this.xVel = 0,
                    this.yVel = 0;
            else {
                let _ = (this.buildIndex >= 0 ? .5 : 1) * (c.weapons[this.weaponIndex].spdMult || 1) * (this.skin && this.skin.spdMult || 1) * (this.tail && this.tail.spdMult || 1) * (this.y <= i.snowBiomeTop ? this.skin && this.skin.coldM ? 1 : i.snowSpeed : 1) * this.slowMult;
                !this.zIndex && this.y >= i.mapScale / 2 - i.riverWidth / 2 && this.y <= i.mapScale / 2 + i.riverWidth / 2 && (this.skin && this.skin.watrImm ? (_ *= .75,
            this.xVel += i.waterCurrent * .4 * v) : (_ *= .33,
                                                     this.xVel += i.waterCurrent * v));
                let D = this.moveDir != null ? Ut(this.moveDir) : 0
                , z = this.moveDir != null ? Wt(this.moveDir) : 0;
                const N = qh(D * D + z * z);
                N != 0 && (D /= N,
                           z /= N),
                    D && (this.xVel += D * this.speed * _ * v),
                    z && (this.yVel += z * this.speed * _ * v)
            }
            this.zIndex = 0,
                this.lockMove = !1,
                this.healCol = 0;
            let R;
            const G = n.getDistance(0, 0, this.xVel * v, this.yVel * v)
            , X = Math.min(4, Math.max(1, Math.round(G / 40)))
            , W = 1 / X;
            let M = {};
            for (var V = 0; V < X; ++V) {
                this.xVel && (this.x += this.xVel * v * W),
                    this.yVel && (this.y += this.yVel * v * W),
                    R = r.getGridArrays(this.x, this.y, this.scale);
                for (let _ = 0; _ < R.length; ++_) {
                    for (let D = 0; D < R[_].length && !(R[_][D].active && !M[R[_][D].sid] && r.checkCollision(this, R[_][D], W) && (M[R[_][D].sid] = !0,
                                                                                                                                     !this.alive)); ++D)
                        ;
                    if (!this.alive)
                        break
                }
                if (!this.alive)
                    break
            }
            for (var F = o.indexOf(this), V = F + 1; V < o.length; ++V)
                o[V] != this && o[V].alive && r.checkCollision(this, o[V]);
            if (this.xVel && (this.xVel *= Tr(i.playerDecel, v),
                              this.xVel <= .01 && this.xVel >= -.01 && (this.xVel = 0)),
                this.yVel && (this.yVel *= Tr(i.playerDecel, v),
                              this.yVel <= .01 && this.yVel >= -.01 && (this.yVel = 0)),
                this.x - this.scale < 0 ? this.x = this.scale : this.x + this.scale > i.mapScale && (this.x = i.mapScale - this.scale),
                this.y - this.scale < 0 ? this.y = this.scale : this.y + this.scale > i.mapScale && (this.y = i.mapScale - this.scale),
                this.buildIndex < 0) {
                if (this.reloads[this.weaponIndex] > 0)
                    this.reloads[this.weaponIndex] -= v,
                        this.gathering = this.mouseState;
                else if (this.gathering || this.autoGather) {
                    let _ = !0;
                    if (c.weapons[this.weaponIndex].gather != null)
                        this.gather(o);
                    else if (c.weapons[this.weaponIndex].projectile != null && this.hasRes(c.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0)) {
                        this.useRes(c.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0),
                            this.noMovTimer = 0;
                        var F = c.weapons[this.weaponIndex].projectile;
                        const z = this.scale * 2
                        , N = this.skin && this.skin.aMlt ? this.skin.aMlt : 1;
                        c.weapons[this.weaponIndex].rec && (this.xVel -= c.weapons[this.weaponIndex].rec * Ut(this.dir),
                                                            this.yVel -= c.weapons[this.weaponIndex].rec * Wt(this.dir)),
                            s.addProjectile(this.x + z * Ut(this.dir), this.y + z * Wt(this.dir), this.dir, c.projectiles[F].range * N, c.projectiles[F].speed * N, F, this, null, this.zIndex)
                    } else
                        _ = !1;
                    this.gathering = this.mouseState,
                        _ && (this.reloads[this.weaponIndex] = c.weapons[this.weaponIndex].speed * (this.skin && this.skin.atkSpd || 1))
                }
            }
        }
            ,
            this.addWeaponXP = function(v) {
            this.weaponXP[this.weaponIndex] || (this.weaponXP[this.weaponIndex] = 0),
                this.weaponXP[this.weaponIndex] += v
        }
            ,
            this.earnXP = function(v) {
            this.age < i.maxAge && (this.XP += v,
                                    this.XP >= this.maxXP ? (this.age < i.maxAge ? (this.age++,
                                                                                    this.XP = 0,
                                                                                    this.maxXP *= 1.2) : this.XP = this.maxXP,
                                                             this.upgradePoints++,
                                                             d.send(this.id, "U", this.upgradePoints, this.upgrAge),
                                                             d.send(this.id, "T", this.XP, n.fixTo(this.maxXP, 1), this.age)) : d.send(this.id, "T", this.XP))
        }
            ,
            this.changeHealth = function(v, S) {
            if (v > 0 && this.health >= this.maxHealth)
                return !1;
            v < 0 && this.skin && (v *= this.skin.dmgMult || 1),
                v < 0 && this.tail && (v *= this.tail.dmgMult || 1),
                v < 0 && (this.hitTime = Date.now()),
                this.health += v,
                this.health > this.maxHealth && (v -= this.health - this.maxHealth,
                                                 this.health = this.maxHealth),
                this.health <= 0 && this.kill(S);
            for (let R = 0; R < o.length; ++R)
                this.sentTo[o[R].id] && d.send(o[R].id, "O", this.sid, this.health);
            return S && S.canSee(this) && !(S == this && v < 0) && d.send(S.id, "8", Math.round(this.x), Math.round(this.y), Math.round(-v), 1),
                !0
        }
            ,
            this.kill = function(v) {
            v && v.alive && (v.kills++,
                             v.skin && v.skin.goldSteal ? u(v, Math.round(this.points / 2)) : u(v, Math.round(this.age * 100 * (v.skin && v.skin.kScrM ? v.skin.kScrM : 1))),
                             d.send(v.id, "N", "kills", v.kills, 1)),
                this.alive = !1,
                d.send(this.id, "P"),
                p()
        }
            ,
            this.addResource = function(v, S, R) {
            !R && S > 0 && this.addWeaponXP(S),
                v == 3 ? u(this, S, !0) : (this[i.resourceTypes[v]] += S,
                                           d.send(this.id, "N", i.resourceTypes[v], this[i.resourceTypes[v]], 1))
        }
            ,
            this.changeItemCount = function(v, S) {
            this.itemCounts[v] = this.itemCounts[v] || 0,
                this.itemCounts[v] += S,
                d.send(this.id, "S", v, this.itemCounts[v])
        }
            ,
            this.buildItem = function(v) {
            const S = this.scale + v.scale + (v.placeOffset || 0)
            , R = this.x + S * Ut(this.dir)
            , G = this.y + S * Wt(this.dir);
            if (this.canBuild(v) && !(v.consume && this.skin && this.skin.noEat) && (v.consume || r.checkItemLocation(R, G, v.scale, .6, v.id, !1, this))) {
                let X = !1;
                if (v.consume) {
                    if (this.hitTime) {
                        const W = Date.now() - this.hitTime;
                        this.hitTime = 0,
                            W <= 120 ? (this.shameCount++,
                                        this.shameCount >= 8 && (this.shameTimer = 3e4,
                                                                 this.shameCount = 0)) : (this.shameCount -= 2,
                                                                                          this.shameCount <= 0 && (this.shameCount = 0))
                    }
                    this.shameTimer <= 0 && (X = v.consume(this))
                } else
                    X = !0,
                        v.group.limit && this.changeItemCount(v.group.id, 1),
                        v.pps && (this.pps += v.pps),
                        r.add(r.objects.length, R, G, this.dir, v.scale, v.type, v, !1, this);
                X && (this.useRes(v),
                      this.buildIndex = -1)
            }
        }
            ,
            this.hasRes = function(v, S) {
            for (let R = 0; R < v.req.length; ) {
                if (this[v.req[R]] < Math.round(v.req[R + 1] * (S || 1)))
                    return !1;
                R += 2
            }
            return !0
        }
            ,
            this.useRes = function(v, S) {
            if (!i.inSandbox)
                for (let R = 0; R < v.req.length; )
                    this.addResource(i.resourceTypes.indexOf(v.req[R]), -Math.round(v.req[R + 1] * (S || 1))),
                        R += 2
        }
            ,
            this.canBuild = function(v) {
            const S = i.inSandbox ? v.group.sandboxLimit || Math.max(v.group.limit * 3, 99) : v.group.limit;
            return S && this.itemCounts[v.group.id] >= S ? !1 : i.inSandbox ? !0 : this.hasRes(v)
        }
            ,
            this.gather = function() {
            this.noMovTimer = 0,
                this.slowMult -= c.weapons[this.weaponIndex].hitSlow || .3,
                this.slowMult < 0 && (this.slowMult = 0);
            const v = i.fetchVariant(this)
            , S = v.poison
            , R = v.val
            , G = {};
            let X, W, M, V;
            const F = r.getGridArrays(this.x, this.y, c.weapons[this.weaponIndex].range);
            for (let D = 0; D < F.length; ++D)
                for (var _ = 0; _ < F[D].length; ++_)
                    if (M = F[D][_],
                        M.active && !M.dontGather && !G[M.sid] && M.visibleToPlayer(this) && (X = n.getDistance(this.x, this.y, M.x, M.y) - M.scale,
                                                                                              X <= c.weapons[this.weaponIndex].range && (W = n.getDirection(M.x, M.y, this.x, this.y),
                                                                                                                                         n.getAngleDist(W, this.dir) <= i.gatherAngle))) {
                        if (G[M.sid] = 1,
                            M.health) {
                            if (M.changeHealth(-c.weapons[this.weaponIndex].dmg * R * (c.weapons[this.weaponIndex].sDmg || 1) * (this.skin && this.skin.bDmg ? this.skin.bDmg : 1), this)) {
                                for (let z = 0; z < M.req.length; )
                                    this.addResource(i.resourceTypes.indexOf(M.req[z]), M.req[z + 1]),
                                        z += 2;
                                r.disableObj(M)
                            }
                        } else {
                            if (M.name === "volcano")
                                this.hitVolcano(c.weapons[this.weaponIndex].gather);
                            else {
                                this.earnXP(4 * c.weapons[this.weaponIndex].gather);
                                const z = c.weapons[this.weaponIndex].gather + (M.type == 3 ? 4 : 0);
                                this.addResource(M.type, z)
                            }
                            this.skin && this.skin.extraGold && this.addResource(3, 1)
                        }
                        V = !0,
                            r.hitObj(M, W)
                    }
            for (var _ = 0; _ < o.length + l.length; ++_)
                if (M = o[_] || l[_ - o.length],
                    M != this && M.alive && !(M.team && M.team == this.team) && (X = n.getDistance(this.x, this.y, M.x, M.y) - M.scale * 1.8,
                                                                                 X <= c.weapons[this.weaponIndex].range && (W = n.getDirection(M.x, M.y, this.x, this.y),
                                                                                                                            n.getAngleDist(W, this.dir) <= i.gatherAngle))) {
                    let z = c.weapons[this.weaponIndex].steal;
                    z && M.addResource && (z = Math.min(M.points || 0, z),
                                           this.addResource(3, z),
                                           M.addResource(3, -z));
                    let N = R;
                    M.weaponIndex != null && c.weapons[M.weaponIndex].shield && n.getAngleDist(W + Math.PI, M.dir) <= i.shieldAngle && (N = c.weapons[M.weaponIndex].shield);
                    const Y = c.weapons[this.weaponIndex].dmg
                    , K = Y * (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) * (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1)
                    , ie = .3 * (M.weightM || 1) + (c.weapons[this.weaponIndex].knock || 0);
                    M.xVel += ie * Ut(W),
                        M.yVel += ie * Wt(W),
                        this.skin && this.skin.healD && this.changeHealth(K * N * this.skin.healD, this),
                        this.tail && this.tail.healD && this.changeHealth(K * N * this.tail.healD, this),
                        M.skin && M.skin.dmg && this.changeHealth(-Y * M.skin.dmg, M),
                        M.tail && M.tail.dmg && this.changeHealth(-Y * M.tail.dmg, M),
                        M.dmgOverTime && this.skin && this.skin.poisonDmg && !(M.skin && M.skin.poisonRes) && (M.dmgOverTime.dmg = this.skin.poisonDmg,
                                                                                                               M.dmgOverTime.time = this.skin.poisonTime || 1,
                                                                                                               M.dmgOverTime.doer = this),
                        M.dmgOverTime && S && !(M.skin && M.skin.poisonRes) && (M.dmgOverTime.dmg = 5,
                                                                                M.dmgOverTime.time = 5,
                                                                                M.dmgOverTime.doer = this),
                        M.skin && M.skin.dmgK && (this.xVel -= M.skin.dmgK * Ut(W),
                                                  this.yVel -= M.skin.dmgK * Wt(W)),
                        M.changeHealth(-K * N, this, this)
                }
            this.sendAnimation(V ? 1 : 0)
        }
            ,
            this.hitVolcano = function(v) {
            const S = 5 + Math.round(v / 3.5);
            this.addResource(2, S),
                this.addResource(3, S)
        }
            ,
            this.sendAnimation = function(v) {
            for (let S = 0; S < o.length; ++S)
                this.sentTo[o[S].id] && this.canSee(o[S]) && d.send(o[S].id, "K", this.sid, v ? 1 : 0, this.weaponIndex)
        }
        ;
        let b = 0
        , $ = 0;
        this.animate = function(v) {
            this.animTime > 0 && (this.animTime -= v,
                                  this.animTime <= 0 ? (this.animTime = 0,
                                                        this.dirPlus = 0,
                                                        b = 0,
                                                        $ = 0) : $ == 0 ? (b += v / (this.animSpeed * i.hitReturnRatio),
                                                                           this.dirPlus = n.lerp(0, this.targetAngle, Math.min(1, b)),
                                                                           b >= 1 && (b = 1,
                                                                                      $ = 1)) : (b -= v / (this.animSpeed * (1 - i.hitReturnRatio)),
                                                                                                 this.dirPlus = n.lerp(0, this.targetAngle, Math.max(0, b))))
        }
            ,
            this.startAnim = function(v, S) {
            this.animTime = this.animSpeed = c.weapons[S].speed,
                this.targetAngle = v ? -i.hitAngle : -Math.PI,
                b = 0,
                $ = 0
        }
            ,
            this.canSee = function(v) {
            if (!v || v.skin && v.skin.invisTimer && v.noMovTimer >= v.skin.invisTimer)
                return !1;
            const S = Ir(v.x - this.x) - v.scale
            , R = Ir(v.y - this.y) - v.scale;
            return S <= i.maxScreenWidth / 2 * 1.3 && R <= i.maxScreenHeight / 2 * 1.3
        }
    }
    const Yh = [{
        id: 45,
        name: "Shame!",
        dontSell: !0,
        price: 0,
        scale: 120,
        desc: "hacks are for losers"
    }, {
        id: 51,
        name: "Moo Cap",
        price: 0,
        scale: 120,
        desc: "coolest mooer around"
    }, {
        id: 50,
        name: "Apple Cap",
        price: 0,
        scale: 120,
        desc: "apple farms remembers"
    }, {
        id: 28,
        name: "Moo Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 29,
        name: "Pig Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 30,
        name: "Fluff Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 36,
        name: "Pandou Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 37,
        name: "Bear Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 38,
        name: "Monkey Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 44,
        name: "Polar Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 35,
        name: "Fez Hat",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 42,
        name: "Enigma Hat",
        price: 0,
        scale: 120,
        desc: "join the enigma army"
    }, {
        id: 43,
        name: "Blitz Hat",
        price: 0,
        scale: 120,
        desc: "hey everybody i'm blitz"
    }, {
        id: 49,
        name: "Bob XIII Hat",
        price: 0,
        scale: 120,
        desc: "like and subscribe"
    }, {
        id: 57,
        name: "Pumpkin",
        price: 50,
        scale: 120,
        desc: "Spooooky"
    }, {
        id: 8,
        name: "Bummle Hat",
        price: 100,
        scale: 120,
        desc: "no effect"
    }, {
        id: 2,
        name: "Straw Hat",
        price: 500,
        scale: 120,
        desc: "no effect"
    }, {
        id: 15,
        name: "Winter Cap",
        price: 600,
        scale: 120,
        desc: "allows you to move at normal speed in snow",
        coldM: 1
    }, {
        id: 5,
        name: "Cowboy Hat",
        price: 1e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 4,
        name: "Ranger Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 18,
        name: "Explorer Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 31,
        name: "Flipper Hat",
        price: 2500,
        scale: 120,
        desc: "have more control while in water",
        watrImm: !0
    }, {
        id: 1,
        name: "Marksman Cap",
        price: 3e3,
        scale: 120,
        desc: "increases arrow speed and range",
        aMlt: 1.3
    }, {
        id: 10,
        name: "Bush Gear",
        price: 3e3,
        scale: 160,
        desc: "allows you to disguise yourself as a bush"
    }, {
        id: 48,
        name: "Halo",
        price: 3e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 6,
        name: "Soldier Helmet",
        price: 4e3,
        scale: 120,
        desc: "reduces damage taken but slows movement",
        spdMult: .94,
        dmgMult: .75
    }, {
        id: 23,
        name: "Anti Venom Gear",
        price: 4e3,
        scale: 120,
        desc: "makes you immune to poison",
        poisonRes: 1
    }, {
        id: 13,
        name: "Medic Gear",
        price: 5e3,
        scale: 110,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 9,
        name: "Miners Helmet",
        price: 5e3,
        scale: 120,
        desc: "earn 1 extra gold per resource",
        extraGold: 1
    }, {
        id: 32,
        name: "Musketeer Hat",
        price: 5e3,
        scale: 120,
        desc: "reduces cost of projectiles",
        projCost: .5
    }, {
        id: 7,
        name: "Bull Helmet",
        price: 6e3,
        scale: 120,
        desc: "increases damage done but drains health",
        healthRegen: -5,
        dmgMultO: 1.5,
        spdMult: .96
    }, {
        id: 22,
        name: "Emp Helmet",
        price: 6e3,
        scale: 120,
        desc: "turrets won't attack but you move slower",
        antiTurret: 1,
        spdMult: .7
    }, {
        id: 12,
        name: "Booster Hat",
        price: 6e3,
        scale: 120,
        desc: "increases your movement speed",
        spdMult: 1.16
    }, {
        id: 26,
        name: "Barbarian Armor",
        price: 8e3,
        scale: 120,
        desc: "knocks back enemies that attack you",
        dmgK: .6
    }, {
        id: 21,
        name: "Plague Mask",
        price: 1e4,
        scale: 120,
        desc: "melee attacks deal poison damage",
        poisonDmg: 5,
        poisonTime: 6
    }, {
        id: 46,
        name: "Bull Mask",
        price: 1e4,
        scale: 120,
        desc: "bulls won't target you unless you attack them",
        bullRepel: 1
    }, {
        id: 14,
        name: "Windmill Hat",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "generates points while worn",
        pps: 1.5
    }, {
        id: 11,
        name: "Spike Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "deal damage to players that damage you",
        dmg: .45
    }, {
        id: 53,
        name: "Turret Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "you become a walking turret",
        turret: {
            proj: 1,
            range: 700,
            rate: 2500
        },
        spdMult: .7
    }, {
        id: 20,
        name: "Samurai Armor",
        price: 12e3,
        scale: 120,
        desc: "increased attack speed and fire rate",
        atkSpd: .78
    }, {
        id: 58,
        name: "Dark Knight",
        price: 12e3,
        scale: 120,
        desc: "restores health when you deal damage",
        healD: .4
    }, {
        id: 27,
        name: "Scavenger Gear",
        price: 15e3,
        scale: 120,
        desc: "earn double points for each kill",
        kScrM: 2
    }, {
        id: 40,
        name: "Tank Gear",
        price: 15e3,
        scale: 120,
        desc: "increased damage to buildings but slower movement",
        spdMult: .3,
        bDmg: 3.3
    }, {
        id: 52,
        name: "Thief Gear",
        price: 15e3,
        scale: 120,
        desc: "steal half of a players gold when you kill them",
        goldSteal: .5
    }, {
        id: 55,
        name: "Bloodthirster",
        price: 2e4,
        scale: 120,
        desc: "Restore Health when dealing damage. And increased damage",
        healD: .25,
        dmgMultO: 1.2
    }, {
        id: 56,
        name: "Assassin Gear",
        price: 2e4,
        scale: 120,
        desc: "Go invisible when not moving. Can't eat. Increased speed",
        noEat: !0,
        spdMult: 1.1,
        invisTimer: 1e3
    }]
    , Kh = [{
        id: 12,
        name: "Snowball",
        price: 1e3,
        scale: 105,
        xOff: 18,
        desc: "no effect"
    }, {
        id: 9,
        name: "Tree Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 10,
        name: "Stone Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 3,
        name: "Cookie Cape",
        price: 1500,
        scale: 90,
        desc: "no effect"
    }, {
        id: 8,
        name: "Cow Cape",
        price: 2e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 11,
        name: "Monkey Tail",
        price: 2e3,
        scale: 97,
        xOff: 25,
        desc: "Super speed but reduced damage",
        spdMult: 1.35,
        dmgMultO: .2
    }, {
        id: 17,
        name: "Apple Basket",
        price: 3e3,
        scale: 80,
        xOff: 12,
        desc: "slowly regenerates health over time",
        healthRegen: 1
    }, {
        id: 6,
        name: "Winter Cape",
        price: 3e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 4,
        name: "Skull Cape",
        price: 4e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 5,
        name: "Dash Cape",
        price: 5e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 2,
        name: "Dragon Cape",
        price: 6e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 1,
        name: "Super Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 7,
        name: "Troll Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 14,
        name: "Thorns",
        price: 1e4,
        scale: 115,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 15,
        name: "Blockades",
        price: 1e4,
        scale: 95,
        xOff: 15,
        desc: "no effect"
    }, {
        id: 20,
        name: "Devils Tail",
        price: 1e4,
        scale: 95,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 16,
        name: "Sawblade",
        price: 12e3,
        scale: 90,
        spin: !0,
        xOff: 0,
        desc: "deal damage to players that damage you",
        dmg: .15
    }, {
        id: 13,
        name: "Angel Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 19,
        name: "Shadow Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "increased movement speed",
        spdMult: 1.1
    }, {
        id: 18,
        name: "Blood Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "restores health when you deal damage",
        healD: .2
    }, {
        id: 21,
        name: "Corrupt X Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "deal damage to players that damage you",
        dmg: .25
    }]
    , Zo = {
        hats: Yh,
        accessories: Kh
    };
    function Zh(e, t, i, n, s, r, o) {
        this.init = function(a, f, d, u, p, w, x, b, $) {
            this.active = !0,
                this.indx = a,
                this.x = f,
                this.y = d,
                this.dir = u,
                this.skipMov = !0,
                this.speed = p,
                this.dmg = w,
                this.scale = b,
                this.range = x,
                this.owner = $,
                o && (this.sentTo = {})
        }
        ;
        const l = [];
        let c;
        this.update = function(a) {
            if (this.active) {
                let d = this.speed * a, u;
                if (this.skipMov ? this.skipMov = !1 : (this.x += d * Math.cos(this.dir),
                                                        this.y += d * Math.sin(this.dir),
                                                        this.range -= d,
                                                        this.range <= 0 && (this.x += this.range * Math.cos(this.dir),
                                                                            this.y += this.range * Math.sin(this.dir),
                                                                            d = 1,
                                                                            this.range = 0,
                                                                            this.active = !1)),
                    o) {
                    for (var f = 0; f < e.length; ++f)
                        !this.sentTo[e[f].id] && e[f].canSee(this) && (this.sentTo[e[f].id] = 1,
                                                                       o.send(e[f].id, "X", r.fixTo(this.x, 1), r.fixTo(this.y, 1), r.fixTo(this.dir, 2), r.fixTo(this.range, 1), this.speed, this.indx, this.layer, this.sid));
                    l.length = 0;
                    for (var f = 0; f < e.length + t.length; ++f)
                        c = e[f] || t[f - e.length],
                            c.alive && c != this.owner && !(this.owner.team && c.team == this.owner.team) && r.lineInRect(c.x - c.scale, c.y - c.scale, c.x + c.scale, c.y + c.scale, this.x, this.y, this.x + d * Math.cos(this.dir), this.y + d * Math.sin(this.dir)) && l.push(c);
                    const p = i.getGridArrays(this.x, this.y, this.scale);
                    for (let w = 0; w < p.length; ++w)
                        for (let x = 0; x < p[w].length; ++x)
                            c = p[w][x],
                                u = c.getScale(),
                                c.active && this.ignoreObj != c.sid && this.layer <= c.layer && l.indexOf(c) < 0 && !c.ignoreCollision && r.lineInRect(c.x - u, c.y - u, c.x + u, c.y + u, this.x, this.y, this.x + d * Math.cos(this.dir), this.y + d * Math.sin(this.dir)) && l.push(c);
                    if (l.length > 0) {
                        let w = null
                        , x = null
                        , b = null;
                        for (var f = 0; f < l.length; ++f)
                            b = r.getDistance(this.x, this.y, l[f].x, l[f].y),
                                (x == null || b < x) && (x = b,
                                                         w = l[f]);
                        if (w.isPlayer || w.isAI) {
                            const $ = .3 * (w.weightM || 1);
                            w.xVel += $ * Math.cos(this.dir),
                                w.yVel += $ * Math.sin(this.dir),
                                (w.weaponIndex == null || !(n.weapons[w.weaponIndex].shield && r.getAngleDist(this.dir + Math.PI, w.dir) <= s.shieldAngle)) && w.changeHealth(-this.dmg, this.owner, this.owner)
                        } else {
                            w.projDmg && w.health && w.changeHealth(-this.dmg) && i.disableObj(w);
                            for (var f = 0; f < e.length; ++f)
                                e[f].active && (w.sentTo[e[f].id] && (w.active ? e[f].canSee(w) && o.send(e[f].id, "L", r.fixTo(this.dir, 2), w.sid) : o.send(e[f].id, "Q", w.sid)),
                                                !w.active && w.owner == e[f] && e[f].changeItemCount(w.group.id, -1))
                        }
                        this.active = !1;
                        for (var f = 0; f < e.length; ++f)
                            this.sentTo[e[f].id] && o.send(e[f].id, "Y", this.sid, r.fixTo(x, 1))
                    }
                }
            }
        }
    }
    var Jo = {
        exports: {}
    }
    , Qo = {
        exports: {}
    };
    (function() {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        , t = {
            rotl: function(i, n) {
                return i << n | i >>> 32 - n
            },
            rotr: function(i, n) {
                return i << 32 - n | i >>> n
            },
            endian: function(i) {
                if (i.constructor == Number)
                    return t.rotl(i, 8) & 16711935 | t.rotl(i, 24) & 4278255360;
                for (var n = 0; n < i.length; n++)
                    i[n] = t.endian(i[n]);
                return i
            },
            randomBytes: function(i) {
                for (var n = []; i > 0; i--)
                    n.push(Math.floor(Math.random() * 256));
                return n
            },
            bytesToWords: function(i) {
                for (var n = [], s = 0, r = 0; s < i.length; s++,
                     r += 8)
                    n[r >>> 5] |= i[s] << 24 - r % 32;
                return n
            },
            wordsToBytes: function(i) {
                for (var n = [], s = 0; s < i.length * 32; s += 8)
                    n.push(i[s >>> 5] >>> 24 - s % 32 & 255);
                return n
            },
            bytesToHex: function(i) {
                for (var n = [], s = 0; s < i.length; s++)
                    n.push((i[s] >>> 4).toString(16)),
                        n.push((i[s] & 15).toString(16));
                return n.join("")
            },
            hexToBytes: function(i) {
                for (var n = [], s = 0; s < i.length; s += 2)
                    n.push(parseInt(i.substr(s, 2), 16));
                return n
            },
            bytesToBase64: function(i) {
                for (var n = [], s = 0; s < i.length; s += 3)
                    for (var r = i[s] << 16 | i[s + 1] << 8 | i[s + 2], o = 0; o < 4; o++)
                        s * 8 + o * 6 <= i.length * 8 ? n.push(e.charAt(r >>> 6 * (3 - o) & 63)) : n.push("=");
                return n.join("")
            },
            base64ToBytes: function(i) {
                i = i.replace(/[^A-Z0-9+\/]/ig, "");
                for (var n = [], s = 0, r = 0; s < i.length; r = ++s % 4)
                    r != 0 && n.push((e.indexOf(i.charAt(s - 1)) & Math.pow(2, -2 * r + 8) - 1) << r * 2 | e.indexOf(i.charAt(s)) >>> 6 - r * 2);
                return n
            }
        };
        Qo.exports = t
    }
    )();
    var Jh = Qo.exports
    , Es = {
        utf8: {
            stringToBytes: function(e) {
                return Es.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(Es.bin.bytesToString(e)))
            }
        },
        bin: {
            stringToBytes: function(e) {
                for (var t = [], i = 0; i < e.length; i++)
                    t.push(e.charCodeAt(i) & 255);
                return t
            },
            bytesToString: function(e) {
                for (var t = [], i = 0; i < e.length; i++)
                    t.push(String.fromCharCode(e[i]));
                return t.join("")
            }
        }
    }
    , Mr = Es;
    /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
    var Qh = function(e) {
        return e != null && (jo(e) || jh(e) || !!e._isBuffer)
    };
    function jo(e) {
        return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e)
    }
    function jh(e) {
        return typeof e.readFloatLE == "function" && typeof e.slice == "function" && jo(e.slice(0, 0))
    }
    (function() {
        var e = Jh
        , t = Mr.utf8
        , i = Qh
        , n = Mr.bin
        , s = function(r, o) {
            r.constructor == String ? o && o.encoding === "binary" ? r = n.stringToBytes(r) : r = t.stringToBytes(r) : i(r) ? r = Array.prototype.slice.call(r, 0) : !Array.isArray(r) && r.constructor !== Uint8Array && (r = r.toString());
            for (var l = e.bytesToWords(r), c = r.length * 8, a = 1732584193, f = -271733879, d = -1732584194, u = 271733878, p = 0; p < l.length; p++)
                l[p] = (l[p] << 8 | l[p] >>> 24) & 16711935 | (l[p] << 24 | l[p] >>> 8) & 4278255360;
            l[c >>> 5] |= 128 << c % 32,
                l[(c + 64 >>> 9 << 4) + 14] = c;
            for (var w = s._ff, x = s._gg, b = s._hh, $ = s._ii, p = 0; p < l.length; p += 16) {
                var v = a
                , S = f
                , R = d
                , G = u;
                a = w(a, f, d, u, l[p + 0], 7, -680876936),
                    u = w(u, a, f, d, l[p + 1], 12, -389564586),
                    d = w(d, u, a, f, l[p + 2], 17, 606105819),
                    f = w(f, d, u, a, l[p + 3], 22, -1044525330),
                    a = w(a, f, d, u, l[p + 4], 7, -176418897),
                    u = w(u, a, f, d, l[p + 5], 12, 1200080426),
                    d = w(d, u, a, f, l[p + 6], 17, -1473231341),
                    f = w(f, d, u, a, l[p + 7], 22, -45705983),
                    a = w(a, f, d, u, l[p + 8], 7, 1770035416),
                    u = w(u, a, f, d, l[p + 9], 12, -1958414417),
                    d = w(d, u, a, f, l[p + 10], 17, -42063),
                    f = w(f, d, u, a, l[p + 11], 22, -1990404162),
                    a = w(a, f, d, u, l[p + 12], 7, 1804603682),
                    u = w(u, a, f, d, l[p + 13], 12, -40341101),
                    d = w(d, u, a, f, l[p + 14], 17, -1502002290),
                    f = w(f, d, u, a, l[p + 15], 22, 1236535329),
                    a = x(a, f, d, u, l[p + 1], 5, -165796510),
                    u = x(u, a, f, d, l[p + 6], 9, -1069501632),
                    d = x(d, u, a, f, l[p + 11], 14, 643717713),
                    f = x(f, d, u, a, l[p + 0], 20, -373897302),
                    a = x(a, f, d, u, l[p + 5], 5, -701558691),
                    u = x(u, a, f, d, l[p + 10], 9, 38016083),
                    d = x(d, u, a, f, l[p + 15], 14, -660478335),
                    f = x(f, d, u, a, l[p + 4], 20, -405537848),
                    a = x(a, f, d, u, l[p + 9], 5, 568446438),
                    u = x(u, a, f, d, l[p + 14], 9, -1019803690),
                    d = x(d, u, a, f, l[p + 3], 14, -187363961),
                    f = x(f, d, u, a, l[p + 8], 20, 1163531501),
                    a = x(a, f, d, u, l[p + 13], 5, -1444681467),
                    u = x(u, a, f, d, l[p + 2], 9, -51403784),
                    d = x(d, u, a, f, l[p + 7], 14, 1735328473),
                    f = x(f, d, u, a, l[p + 12], 20, -1926607734),
                    a = b(a, f, d, u, l[p + 5], 4, -378558),
                    u = b(u, a, f, d, l[p + 8], 11, -2022574463),
                    d = b(d, u, a, f, l[p + 11], 16, 1839030562),
                    f = b(f, d, u, a, l[p + 14], 23, -35309556),
                    a = b(a, f, d, u, l[p + 1], 4, -1530992060),
                    u = b(u, a, f, d, l[p + 4], 11, 1272893353),
                    d = b(d, u, a, f, l[p + 7], 16, -155497632),
                    f = b(f, d, u, a, l[p + 10], 23, -1094730640),
                    a = b(a, f, d, u, l[p + 13], 4, 681279174),
                    u = b(u, a, f, d, l[p + 0], 11, -358537222),
                    d = b(d, u, a, f, l[p + 3], 16, -722521979),
                    f = b(f, d, u, a, l[p + 6], 23, 76029189),
                    a = b(a, f, d, u, l[p + 9], 4, -640364487),
                    u = b(u, a, f, d, l[p + 12], 11, -421815835),
                    d = b(d, u, a, f, l[p + 15], 16, 530742520),
                    f = b(f, d, u, a, l[p + 2], 23, -995338651),
                    a = $(a, f, d, u, l[p + 0], 6, -198630844),
                    u = $(u, a, f, d, l[p + 7], 10, 1126891415),
                    d = $(d, u, a, f, l[p + 14], 15, -1416354905),
                    f = $(f, d, u, a, l[p + 5], 21, -57434055),
                    a = $(a, f, d, u, l[p + 12], 6, 1700485571),
                    u = $(u, a, f, d, l[p + 3], 10, -1894986606),
                    d = $(d, u, a, f, l[p + 10], 15, -1051523),
                    f = $(f, d, u, a, l[p + 1], 21, -2054922799),
                    a = $(a, f, d, u, l[p + 8], 6, 1873313359),
                    u = $(u, a, f, d, l[p + 15], 10, -30611744),
                    d = $(d, u, a, f, l[p + 6], 15, -1560198380),
                    f = $(f, d, u, a, l[p + 13], 21, 1309151649),
                    a = $(a, f, d, u, l[p + 4], 6, -145523070),
                    u = $(u, a, f, d, l[p + 11], 10, -1120210379),
                    d = $(d, u, a, f, l[p + 2], 15, 718787259),
                    f = $(f, d, u, a, l[p + 9], 21, -343485551),
                    a = a + v >>> 0,
                    f = f + S >>> 0,
                    d = d + R >>> 0,
                    u = u + G >>> 0
            }
            return e.endian([a, f, d, u])
        };
        s._ff = function(r, o, l, c, a, f, d) {
            var u = r + (o & l | ~o & c) + (a >>> 0) + d;
            return (u << f | u >>> 32 - f) + o
        }
            ,
            s._gg = function(r, o, l, c, a, f, d) {
            var u = r + (o & c | l & ~c) + (a >>> 0) + d;
            return (u << f | u >>> 32 - f) + o
        }
            ,
            s._hh = function(r, o, l, c, a, f, d) {
            var u = r + (o ^ l ^ c) + (a >>> 0) + d;
            return (u << f | u >>> 32 - f) + o
        }
            ,
            s._ii = function(r, o, l, c, a, f, d) {
            var u = r + (l ^ (o | ~c)) + (a >>> 0) + d;
            return (u << f | u >>> 32 - f) + o
        }
            ,
            s._blocksize = 16,
            s._digestsize = 16,
            Jo.exports = function(r, o) {
            if (r == null)
                throw new Error("Illegal argument " + r);
            var l = e.wordsToBytes(s(r, o));
            return o && o.asBytes ? l : o && o.asString ? n.bytesToString(l) : e.bytesToHex(l)
        }
    }
    )();
    var eu = Jo.exports;
    const tu = An(eu);
    var Yn, Er;
    function It() {
        if (Er)
            return Yn;
        Er = 1;
        function e(t, i, n, s, r, o) {
            return {
                tag: t,
                key: i,
                attrs: n,
                children: s,
                text: r,
                dom: o,
                domSize: void 0,
                state: void 0,
                events: void 0,
                instance: void 0
            }
        }
        return e.normalize = function(t) {
            return Array.isArray(t) ? e("[", void 0, void 0, e.normalizeChildren(t), void 0, void 0) : t == null || typeof t == "boolean" ? null : typeof t == "object" ? t : e("#", void 0, void 0, String(t), void 0, void 0)
        }
            ,
            e.normalizeChildren = function(t) {
            var i = [];
            if (t.length) {
                for (var n = t[0] != null && t[0].key != null, s = 1; s < t.length; s++)
                    if ((t[s] != null && t[s].key != null) !== n)
                        throw new TypeError(n && (t[s] != null || typeof t[s] == "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys.");
                for (var s = 0; s < t.length; s++)
                    i[s] = e.normalize(t[s])
            }
            return i
        }
            ,
            Yn = e,
            Yn
    }
    var iu = It()
    , ea = function() {
        var e = arguments[this], t = this + 1, i;
        if (e == null ? e = {} : (typeof e != "object" || e.tag != null || Array.isArray(e)) && (e = {},
                                                                                                 t = this),
            arguments.length === t + 1)
            i = arguments[t],
                Array.isArray(i) || (i = [i]);
        else
            for (i = []; t < arguments.length; )
                i.push(arguments[t++]);
        return iu("", e.key, e, i)
    }
    , Dn = {}.hasOwnProperty
    , nu = It()
    , su = ea
    , Jt = Dn
    , ru = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
    , ta = {};
    function Cr(e) {
        for (var t in e)
            if (Jt.call(e, t))
                return !1;
        return !0
    }
    function ou(e) {
        for (var t, i = "div", n = [], s = {}; t = ru.exec(e); ) {
            var r = t[1]
            , o = t[2];
            if (r === "" && o !== "")
                i = o;
            else if (r === "#")
                s.id = o;
            else if (r === ".")
                n.push(o);
            else if (t[3][0] === "[") {
                var l = t[6];
                l && (l = l.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")),
                    t[4] === "class" ? n.push(l) : s[t[4]] = l === "" ? l : l || !0
            }
        }
        return n.length > 0 && (s.className = n.join(" ")),
            ta[e] = {
            tag: i,
            attrs: s
        }
    }
    function au(e, t) {
        var i = t.attrs
        , n = Jt.call(i, "class")
        , s = n ? i.class : i.className;
        if (t.tag = e.tag,
            t.attrs = {},
            !Cr(e.attrs) && !Cr(i)) {
            var r = {};
            for (var o in i)
                Jt.call(i, o) && (r[o] = i[o]);
            i = r
        }
        for (var o in e.attrs)
            Jt.call(e.attrs, o) && o !== "className" && !Jt.call(i, o) && (i[o] = e.attrs[o]);
        (s != null || e.attrs.className != null) && (i.className = s != null ? e.attrs.className != null ? String(e.attrs.className) + " " + String(s) : s : e.attrs.className != null ? e.attrs.className : null),
            n && (i.class = null);
        for (var o in i)
            if (Jt.call(i, o) && o !== "key") {
                t.attrs = i;
                break
            }
        return t
    }
    function lu(e) {
        if (e == null || typeof e != "string" && typeof e != "function" && typeof e.view != "function")
            throw Error("The selector must be either a string or a component.");
        var t = su.apply(1, arguments);
        return typeof e == "string" && (t.children = nu.normalizeChildren(t.children),
                                        e !== "[") ? au(ta[e] || ou(e), t) : (t.tag = e,
                                                                              t)
    }
    var ia = lu
    , cu = It()
    , hu = function(e) {
        return e == null && (e = ""),
            cu("<", void 0, void 0, e, void 0, void 0)
    }
    , uu = It()
    , fu = ea
    , du = function() {
        var e = fu.apply(0, arguments);
        return e.tag = "[",
            e.children = uu.normalizeChildren(e.children),
            e
    }
    , Js = ia;
    Js.trust = hu;
    Js.fragment = du;
    var pu = Js, cn = {
        exports: {}
    }, Kn, Pr;
    function na() {
        if (Pr)
            return Kn;
        Pr = 1;
        var e = function(t) {
            if (!(this instanceof e))
                throw new Error("Promise must be called with 'new'.");
            if (typeof t != "function")
                throw new TypeError("executor must be a function.");
            var i = this
            , n = []
            , s = []
            , r = a(n, !0)
            , o = a(s, !1)
            , l = i._instance = {
                resolvers: n,
                rejectors: s
            }
            , c = typeof setImmediate == "function" ? setImmediate : setTimeout;
            function a(d, u) {
                return function p(w) {
                    var x;
                    try {
                        if (u && w != null && (typeof w == "object" || typeof w == "function") && typeof (x = w.then) == "function") {
                            if (w === i)
                                throw new TypeError("Promise can't be resolved with itself.");
                            f(x.bind(w))
                        } else
                            c(function() {
                                !u && d.length === 0 && console.error("Possible unhandled promise rejection:", w);
                                for (var b = 0; b < d.length; b++)
                                    d[b](w);
                                n.length = 0,
                                    s.length = 0,
                                    l.state = u,
                                    l.retry = function() {
                                    p(w)
                                }
                            })
                    } catch (b) {
                        o(b)
                    }
                }
            }
            function f(d) {
                var u = 0;
                function p(x) {
                    return function(b) {
                        u++ > 0 || x(b)
                    }
                }
                var w = p(o);
                try {
                    d(p(r), w)
                } catch (x) {
                    w(x)
                }
            }
            f(t)
        };
        return e.prototype.then = function(t, i) {
            var n = this
            , s = n._instance;
            function r(a, f, d, u) {
                f.push(function(p) {
                    if (typeof a != "function")
                        d(p);
                    else
                        try {
                            o(a(p))
                        } catch (w) {
                            l && l(w)
                        }
                }),
                    typeof s.retry == "function" && u === s.state && s.retry()
            }
            var o, l, c = new e(function(a, f) {
                o = a,
                    l = f
            }
                               );
            return r(t, s.resolvers, o, !0),
                r(i, s.rejectors, l, !1),
                c
        }
            ,
            e.prototype.catch = function(t) {
            return this.then(null, t)
        }
            ,
            e.prototype.finally = function(t) {
            return this.then(function(i) {
                return e.resolve(t()).then(function() {
                    return i
                })
            }, function(i) {
                return e.resolve(t()).then(function() {
                    return e.reject(i)
                })
            })
        }
            ,
            e.resolve = function(t) {
            return t instanceof e ? t : new e(function(i) {
                i(t)
            }
                                             )
        }
            ,
            e.reject = function(t) {
            return new e(function(i, n) {
                n(t)
            }
                        )
        }
            ,
            e.all = function(t) {
            return new e(function(i, n) {
                var s = t.length
                , r = 0
                , o = [];
                if (t.length === 0)
                    i([]);
                else
                    for (var l = 0; l < t.length; l++)
                        (function(c) {
                            function a(f) {
                                r++,
                                    o[c] = f,
                                    r === s && i(o)
                            }
                            t[c] != null && (typeof t[c] == "object" || typeof t[c] == "function") && typeof t[c].then == "function" ? t[c].then(a, n) : a(t[c])
                        }
                        )(l)
            }
                        )
        }
            ,
            e.race = function(t) {
            return new e(function(i, n) {
                for (var s = 0; s < t.length; s++)
                    t[s].then(i, n)
            }
                        )
        }
            ,
            Kn = e,
            Kn
    }
    var Ei = na();
    typeof window < "u" ? (typeof window.Promise > "u" ? window.Promise = Ei : window.Promise.prototype.finally || (window.Promise.prototype.finally = Ei.prototype.finally),
                           cn.exports = window.Promise) : typeof Vt < "u" ? (typeof Vt.Promise > "u" ? Vt.Promise = Ei : Vt.Promise.prototype.finally || (Vt.Promise.prototype.finally = Ei.prototype.finally),
                                                                             cn.exports = Vt.Promise) : cn.exports = Ei;
    var sa = cn.exports, Zn = It(), mu = function(e) {
        var t = e && e.document, i, n = {
            svg: "http://www.w3.org/2000/svg",
            math: "http://www.w3.org/1998/Math/MathML"
        };
        function s(m) {
            return m.attrs && m.attrs.xmlns || n[m.tag]
        }
        function r(m, h) {
            if (m.state !== h)
                throw new Error("'vnode.state' must not be modified.")
        }
        function o(m) {
            var h = m.state;
            try {
                return this.apply(h, arguments)
            } finally {
                r(m, h)
            }
        }
        function l() {
            try {
                return t.activeElement
            } catch {
                return null
            }
        }
        function c(m, h, g, I, E, O, q) {
            for (var Z = g; Z < I; Z++) {
                var U = h[Z];
                U != null && a(m, U, E, q, O)
            }
        }
        function a(m, h, g, I, E) {
            var O = h.tag;
            if (typeof O == "string")
                switch (h.state = {},
                        h.attrs != null && yi(h.attrs, h, g),
                        O) {
                    case "#":
                        f(m, h, E);
                        break;
                    case "<":
                        u(m, h, I, E);
                        break;
                    case "[":
                        p(m, h, g, I, E);
                        break;
                    default:
                        w(m, h, g, I, E)
                }
            else
                b(m, h, g, I, E)
        }
        function f(m, h, g) {
            h.dom = t.createTextNode(h.children),
                N(m, h.dom, g)
        }
        var d = {
            caption: "table",
            thead: "table",
            tbody: "table",
            tfoot: "table",
            tr: "tbody",
            th: "tr",
            td: "tr",
            colgroup: "table",
            col: "colgroup"
        };
        function u(m, h, g, I) {
            var E = h.children.match(/^\s*?<(\w+)/im) || []
            , O = t.createElement(d[E[1]] || "div");
            g === "http://www.w3.org/2000/svg" ? (O.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + h.children + "</svg>",
                                                  O = O.firstChild) : O.innerHTML = h.children,
                h.dom = O.firstChild,
                h.domSize = O.childNodes.length,
                h.instance = [];
            for (var q = t.createDocumentFragment(), Z; Z = O.firstChild; )
                h.instance.push(Z),
                    q.appendChild(Z);
            N(m, q, I)
        }
        function p(m, h, g, I, E) {
            var O = t.createDocumentFragment();
            if (h.children != null) {
                var q = h.children;
                c(O, q, 0, q.length, g, null, I)
            }
            h.dom = O.firstChild,
                h.domSize = O.childNodes.length,
                N(m, O, E)
        }
        function w(m, h, g, I, E) {
            var O = h.tag
            , q = h.attrs
            , Z = q && q.is;
            I = s(h) || I;
            var U = I ? Z ? t.createElementNS(I, O, {
                is: Z
            }) : t.createElementNS(I, O) : Z ? t.createElement(O, {
                is: Z
            }) : t.createElement(O);
            if (h.dom = U,
                q != null && zt(h, q, I),
                N(m, U, E),
                !Y(h) && h.children != null) {
                var j = h.children;
                c(U, j, 0, j.length, g, null, I),
                    h.tag === "select" && q != null && Be(h, q)
            }
        }
        function x(m, h) {
            var g;
            if (typeof m.tag.view == "function") {
                if (m.state = Object.create(m.tag),
                    g = m.state.view,
                    g.$$reentrantLock$$ != null)
                    return;
                g.$$reentrantLock$$ = !0
            } else {
                if (m.state = void 0,
                    g = m.tag,
                    g.$$reentrantLock$$ != null)
                    return;
                g.$$reentrantLock$$ = !0,
                    m.state = m.tag.prototype != null && typeof m.tag.prototype.view == "function" ? new m.tag(m) : m.tag(m)
            }
            if (yi(m.state, m, h),
                m.attrs != null && yi(m.attrs, m, h),
                m.instance = Zn.normalize(o.call(m.state.view, m)),
                m.instance === m)
                throw Error("A view cannot return the vnode it received as argument");
            g.$$reentrantLock$$ = null
        }
        function b(m, h, g, I, E) {
            x(h, g),
                h.instance != null ? (a(m, h.instance, g, I, E),
                                      h.dom = h.instance.dom,
                                      h.domSize = h.dom != null ? h.instance.domSize : 0) : h.domSize = 0
        }
        function $(m, h, g, I, E, O) {
            if (!(h === g || h == null && g == null))
                if (h == null || h.length === 0)
                    c(m, g, 0, g.length, I, E, O);
                else if (g == null || g.length === 0)
                    K(m, h, 0, h.length);
                else {
                    var q = h[0] != null && h[0].key != null
                    , Z = g[0] != null && g[0].key != null
                    , U = 0
                    , j = 0;
                    if (!q)
                        for (; j < h.length && h[j] == null; )
                            j++;
                    if (!Z)
                        for (; U < g.length && g[U] == null; )
                            U++;
                    if (q !== Z)
                        K(m, h, j, h.length),
                            c(m, g, U, g.length, I, E, O);
                    else if (Z) {
                        for (var Ce = h.length - 1, pe = g.length - 1, Bt, be, ue, Ie, re, ki; Ce >= j && pe >= U && (Ie = h[Ce],
                                                                                                                      re = g[pe],
                                                                                                                      Ie.key === re.key); )
                            Ie !== re && v(m, Ie, re, I, E, O),
                                re.dom != null && (E = re.dom),
                                Ce--,
                                pe--;
                        for (; Ce >= j && pe >= U && (be = h[j],
                                                      ue = g[U],
                                                      be.key === ue.key); )
                            j++,
                                U++,
                                be !== ue && v(m, be, ue, I, _(h, j, E), O);
                        for (; Ce >= j && pe >= U && !(U === pe || be.key !== re.key || Ie.key !== ue.key); )
                            ki = _(h, j, E),
                                D(m, Ie, ki),
                                Ie !== ue && v(m, Ie, ue, I, ki, O),
                                ++U <= --pe && D(m, be, E),
                                be !== re && v(m, be, re, I, E, O),
                                re.dom != null && (E = re.dom),
                                j++,
                                Ce--,
                                Ie = h[Ce],
                                re = g[pe],
                                be = h[j],
                                ue = g[U];
                        for (; Ce >= j && pe >= U && Ie.key === re.key; )
                            Ie !== re && v(m, Ie, re, I, E, O),
                                re.dom != null && (E = re.dom),
                                Ce--,
                                pe--,
                                Ie = h[Ce],
                                re = g[pe];
                        if (U > pe)
                            K(m, h, j, Ce + 1);
                        else if (j > Ce)
                            c(m, g, U, pe + 1, I, E, O);
                        else {
                            var Mt = E, xi = pe - U + 1, gt = new Array(xi), Ht = 0, fe = 0, Lt = 2147483647, nt = 0, Bt, Ft;
                            for (fe = 0; fe < xi; fe++)
                                gt[fe] = -1;
                            for (fe = pe; fe >= U; fe--) {
                                Bt == null && (Bt = M(h, j, Ce + 1)),
                                    re = g[fe];
                                var st = Bt[re.key];
                                st != null && (Lt = st < Lt ? st : -1,
                                               gt[fe - U] = st,
                                               Ie = h[st],
                                               h[st] = null,
                                               Ie !== re && v(m, Ie, re, I, E, O),
                                               re.dom != null && (E = re.dom),
                                               nt++)
                            }
                            if (E = Mt,
                                nt !== Ce - j + 1 && K(m, h, j, Ce + 1),
                                nt === 0)
                                c(m, g, U, pe + 1, I, E, O);
                            else if (Lt === -1)
                                for (Ft = F(gt),
                                     Ht = Ft.length - 1,
                                     fe = pe; fe >= U; fe--)
                                    ue = g[fe],
                                        gt[fe - U] === -1 ? a(m, ue, I, O, E) : Ft[Ht] === fe - U ? Ht-- : D(m, ue, E),
                                        ue.dom != null && (E = g[fe].dom);
                            else
                                for (fe = pe; fe >= U; fe--)
                                    ue = g[fe],
                                        gt[fe - U] === -1 && a(m, ue, I, O, E),
                                        ue.dom != null && (E = g[fe].dom)
                        }
                    } else {
                        var vi = h.length < g.length ? h.length : g.length;
                        for (U = U < j ? U : j; U < vi; U++)
                            be = h[U],
                                ue = g[U],
                                !(be === ue || be == null && ue == null) && (be == null ? a(m, ue, I, O, _(h, U + 1, E)) : ue == null ? ie(m, be) : v(m, be, ue, I, _(h, U + 1, E), O));
                        h.length > vi && K(m, h, U, h.length),
                            g.length > vi && c(m, g, U, g.length, I, E, O)
                    }
                }
        }
        function v(m, h, g, I, E, O) {
            var q = h.tag
            , Z = g.tag;
            if (q === Z) {
                if (g.state = h.state,
                    g.events = h.events,
                    Ln(g, h))
                    return;
                if (typeof q == "string")
                    switch (g.attrs != null && wi(g.attrs, g, I),
                            q) {
                        case "#":
                            S(h, g);
                            break;
                        case "<":
                            R(m, h, g, O, E);
                            break;
                        case "[":
                            G(m, h, g, I, E, O);
                            break;
                        default:
                            X(h, g, I, O)
                    }
                else
                    W(m, h, g, I, E, O)
            } else
                ie(m, h),
                    a(m, g, I, O, E)
        }
        function S(m, h) {
            m.children.toString() !== h.children.toString() && (m.dom.nodeValue = h.children),
                h.dom = m.dom
        }
        function R(m, h, g, I, E) {
            h.children !== g.children ? (ae(m, h),
                                         u(m, g, I, E)) : (g.dom = h.dom,
                                                           g.domSize = h.domSize,
                                                           g.instance = h.instance)
        }
        function G(m, h, g, I, E, O) {
            $(m, h.children, g.children, I, E, O);
            var q = 0
            , Z = g.children;
            if (g.dom = null,
                Z != null) {
                for (var U = 0; U < Z.length; U++) {
                    var j = Z[U];
                    j != null && j.dom != null && (g.dom == null && (g.dom = j.dom),
                                                   q += j.domSize || 1)
                }
                q !== 1 && (g.domSize = q)
            }
        }
        function X(m, h, g, I) {
            var E = h.dom = m.dom;
            I = s(h) || I,
                h.tag === "textarea" && h.attrs == null && (h.attrs = {}),
                pt(h, m.attrs, h.attrs, I),
                Y(h) || $(E, m.children, h.children, g, null, I)
        }
        function W(m, h, g, I, E, O) {
            if (g.instance = Zn.normalize(o.call(g.state.view, g)),
                g.instance === g)
                throw Error("A view cannot return the vnode it received as argument");
            wi(g.state, g, I),
                g.attrs != null && wi(g.attrs, g, I),
                g.instance != null ? (h.instance == null ? a(m, g.instance, I, O, E) : v(m, h.instance, g.instance, I, E, O),
                                      g.dom = g.instance.dom,
                                      g.domSize = g.instance.domSize) : h.instance != null ? (ie(m, h.instance),
                                                                                              g.dom = void 0,
                                                                                              g.domSize = 0) : (g.dom = h.dom,
                                                                                                                g.domSize = h.domSize)
        }
        function M(m, h, g) {
            for (var I = Object.create(null); h < g; h++) {
                var E = m[h];
                if (E != null) {
                    var O = E.key;
                    O != null && (I[O] = h)
                }
            }
            return I
        }
        var V = [];
        function F(m) {
            for (var h = [0], g = 0, I = 0, E = 0, O = V.length = m.length, E = 0; E < O; E++)
                V[E] = m[E];
            for (var E = 0; E < O; ++E)
                if (m[E] !== -1) {
                    var q = h[h.length - 1];
                    if (m[q] < m[E]) {
                        V[E] = q,
                            h.push(E);
                        continue
                    }
                    for (g = 0,
                         I = h.length - 1; g < I; ) {
                        var Z = (g >>> 1) + (I >>> 1) + (g & I & 1);
                        m[h[Z]] < m[E] ? g = Z + 1 : I = Z
                    }
                    m[E] < m[h[g]] && (g > 0 && (V[E] = h[g - 1]),
                                       h[g] = E)
                }
            for (g = h.length,
                 I = h[g - 1]; g-- > 0; )
                h[g] = I,
                    I = V[I];
            return V.length = 0,
                h
        }
        function _(m, h, g) {
            for (; h < m.length; h++)
                if (m[h] != null && m[h].dom != null)
                    return m[h].dom;
            return g
        }
        function D(m, h, g) {
            var I = t.createDocumentFragment();
            z(m, I, h),
                N(m, I, g)
        }
        function z(m, h, g) {
            for (; g.dom != null && g.dom.parentNode === m; ) {
                if (typeof g.tag != "string") {
                    if (g = g.instance,
                        g != null)
                        continue
                } else if (g.tag === "<")
                    for (var I = 0; I < g.instance.length; I++)
                        h.appendChild(g.instance[I]);
                else if (g.tag !== "[")
                    h.appendChild(g.dom);
                else if (g.children.length === 1) {
                    if (g = g.children[0],
                        g != null)
                        continue
                } else
                    for (var I = 0; I < g.children.length; I++) {
                        var E = g.children[I];
                        E != null && z(m, h, E)
                    }
                break
            }
        }
        function N(m, h, g) {
            g != null ? m.insertBefore(h, g) : m.appendChild(h)
        }
        function Y(m) {
            if (m.attrs == null || m.attrs.contenteditable == null && m.attrs.contentEditable == null)
                return !1;
            var h = m.children;
            if (h != null && h.length === 1 && h[0].tag === "<") {
                var g = h[0].children;
                m.dom.innerHTML !== g && (m.dom.innerHTML = g)
            } else if (h != null && h.length !== 0)
                throw new Error("Child node of a contenteditable must be trusted.");
            return !0
        }
        function K(m, h, g, I) {
            for (var E = g; E < I; E++) {
                var O = h[E];
                O != null && ie(m, O)
            }
        }
        function ie(m, h) {
            var g = 0, I = h.state, E, O;
            if (typeof h.tag != "string" && typeof h.state.onbeforeremove == "function") {
                var q = o.call(h.state.onbeforeremove, h);
                q != null && typeof q.then == "function" && (g = 1,
                                                             E = q)
            }
            if (h.attrs && typeof h.attrs.onbeforeremove == "function") {
                var q = o.call(h.attrs.onbeforeremove, h);
                q != null && typeof q.then == "function" && (g |= 2,
                                                             O = q)
            }
            if (r(h, I),
                !g)
                Se(h),
                    J(m, h);
            else {
                if (E != null) {
                    var Z = function() {
                        g & 1 && (g &= 2,
                                  g || U())
                    };
                    E.then(Z, Z)
                }
                if (O != null) {
                    var Z = function() {
                        g & 2 && (g &= 1,
                                  g || U())
                    };
                    O.then(Z, Z)
                }
            }
            function U() {
                r(h, I),
                    Se(h),
                    J(m, h)
            }
        }
        function ae(m, h) {
            for (var g = 0; g < h.instance.length; g++)
                m.removeChild(h.instance[g])
        }
        function J(m, h) {
            for (; h.dom != null && h.dom.parentNode === m; ) {
                if (typeof h.tag != "string") {
                    if (h = h.instance,
                        h != null)
                        continue
                } else if (h.tag === "<")
                    ae(m, h);
                else {
                    if (h.tag !== "[" && (m.removeChild(h.dom),
                                          !Array.isArray(h.children)))
                        break;
                    if (h.children.length === 1) {
                        if (h = h.children[0],
                            h != null)
                            continue
                    } else
                        for (var g = 0; g < h.children.length; g++) {
                            var I = h.children[g];
                            I != null && J(m, I)
                        }
                }
                break
            }
        }
        function Se(m) {
            if (typeof m.tag != "string" && typeof m.state.onremove == "function" && o.call(m.state.onremove, m),
                m.attrs && typeof m.attrs.onremove == "function" && o.call(m.attrs.onremove, m),
                typeof m.tag != "string")
                m.instance != null && Se(m.instance);
            else {
                var h = m.children;
                if (Array.isArray(h))
                    for (var g = 0; g < h.length; g++) {
                        var I = h[g];
                        I != null && Se(I)
                    }
            }
        }
        function zt(m, h, g) {
            m.tag === "input" && h.type != null && m.dom.setAttribute("type", h.type);
            var I = h != null && m.tag === "input" && h.type === "file";
            for (var E in h)
                Ve(m, E, null, h[E], g, I)
        }
        function Ve(m, h, g, I, E, O) {
            if (!(h === "key" || h === "is" || I == null || mt(h) || g === I && !ne(m, h) && typeof I != "object" || h === "type" && m.tag === "input")) {
                if (h[0] === "o" && h[1] === "n")
                    return gi(m, h, I);
                if (h.slice(0, 6) === "xlink:")
                    m.dom.setAttributeNS("http://www.w3.org/1999/xlink", h.slice(6), I);
                else if (h === "style")
                    pi(m.dom, g, I);
                else if (Ne(m, h, E)) {
                    if (h === "value") {
                        if ((m.tag === "input" || m.tag === "textarea") && m.dom.value === "" + I && (O || m.dom === l()) || m.tag === "select" && g !== null && m.dom.value === "" + I || m.tag === "option" && g !== null && m.dom.value === "" + I)
                            return;
                        if (O && "" + I != "") {
                            console.error("`value` is read-only on file inputs!");
                            return
                        }
                    }
                    m.dom[h] = I
                } else
                    typeof I == "boolean" ? I ? m.dom.setAttribute(h, "") : m.dom.removeAttribute(h) : m.dom.setAttribute(h === "className" ? "class" : h, I)
            }
        }
        function te(m, h, g, I) {
            if (!(h === "key" || h === "is" || g == null || mt(h)))
                if (h[0] === "o" && h[1] === "n")
                    gi(m, h, void 0);
                else if (h === "style")
                    pi(m.dom, g, null);
                else if (Ne(m, h, I) && h !== "className" && h !== "title" && !(h === "value" && (m.tag === "option" || m.tag === "select" && m.dom.selectedIndex === -1 && m.dom === l())) && !(m.tag === "input" && h === "type"))
                    m.dom[h] = null;
                else {
                    var E = h.indexOf(":");
                    E !== -1 && (h = h.slice(E + 1)),
                        g !== !1 && m.dom.removeAttribute(h === "className" ? "class" : h)
                }
        }
        function Be(m, h) {
            if ("value"in h)
                if (h.value === null)
                    m.dom.selectedIndex !== -1 && (m.dom.value = null);
                else {
                    var g = "" + h.value;
                    (m.dom.value !== g || m.dom.selectedIndex === -1) && (m.dom.value = g)
                }
            "selectedIndex"in h && Ve(m, "selectedIndex", null, h.selectedIndex, void 0)
        }
        function pt(m, h, g, I) {
            if (h && h === g && console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major"),
                g != null) {
                m.tag === "input" && g.type != null && m.dom.setAttribute("type", g.type);
                var E = m.tag === "input" && g.type === "file";
                for (var O in g)
                    Ve(m, O, h && h[O], g[O], I, E)
            }
            var q;
            if (h != null)
                for (var O in h)
                    (q = h[O]) != null && (g == null || g[O] == null) && te(m, O, q, I)
        }
        function ne(m, h) {
            return h === "value" || h === "checked" || h === "selectedIndex" || h === "selected" && m.dom === l() || m.tag === "option" && m.dom.parentNode === t.activeElement
        }
        function mt(m) {
            return m === "oninit" || m === "oncreate" || m === "onupdate" || m === "onremove" || m === "onbeforeremove" || m === "onbeforeupdate"
        }
        function Ne(m, h, g) {
            return g === void 0 && (m.tag.indexOf("-") > -1 || m.attrs != null && m.attrs.is || h !== "href" && h !== "list" && h !== "form" && h !== "width" && h !== "height") && h in m.dom
        }
        var it = /[A-Z]/g;
        function Ze(m) {
            return "-" + m.toLowerCase()
        }
        function se(m) {
            return m[0] === "-" && m[1] === "-" ? m : m === "cssFloat" ? "float" : m.replace(it, Ze)
        }
        function pi(m, h, g) {
            if (h !== g)
                if (g == null)
                    m.style.cssText = "";
                else if (typeof g != "object")
                    m.style.cssText = g;
                else if (h == null || typeof h != "object") {
                    m.style.cssText = "";
                    for (var I in g) {
                        var E = g[I];
                        E != null && m.style.setProperty(se(I), String(E))
                    }
                } else {
                    for (var I in g) {
                        var E = g[I];
                        E != null && (E = String(E)) !== String(h[I]) && m.style.setProperty(se(I), E)
                    }
                    for (var I in h)
                        h[I] != null && g[I] == null && m.style.removeProperty(se(I))
                }
        }
        function mi() {
            this._ = i
        }
        mi.prototype = Object.create(null),
            mi.prototype.handleEvent = function(m) {
            var h = this["on" + m.type], g;
            typeof h == "function" ? g = h.call(m.currentTarget, m) : typeof h.handleEvent == "function" && h.handleEvent(m),
                this._ && m.redraw !== !1 && (0,
                                              this._)(),
                g === !1 && (m.preventDefault(),
                             m.stopPropagation())
        }
        ;
        function gi(m, h, g) {
            if (m.events != null) {
                if (m.events._ = i,
                    m.events[h] === g)
                    return;
                g != null && (typeof g == "function" || typeof g == "object") ? (m.events[h] == null && m.dom.addEventListener(h.slice(2), m.events, !1),
                                                                                 m.events[h] = g) : (m.events[h] != null && m.dom.removeEventListener(h.slice(2), m.events, !1),
                                                                                                     m.events[h] = void 0)
            } else
                g != null && (typeof g == "function" || typeof g == "object") && (m.events = new mi,
                                                                                  m.dom.addEventListener(h.slice(2), m.events, !1),
                                                                                  m.events[h] = g)
        }
        function yi(m, h, g) {
            typeof m.oninit == "function" && o.call(m.oninit, h),
                typeof m.oncreate == "function" && g.push(o.bind(m.oncreate, h))
        }
        function wi(m, h, g) {
            typeof m.onupdate == "function" && g.push(o.bind(m.onupdate, h))
        }
        function Ln(m, h) {
            do {
                if (m.attrs != null && typeof m.attrs.onbeforeupdate == "function") {
                    var g = o.call(m.attrs.onbeforeupdate, m, h);
                    if (g !== void 0 && !g)
                        break
                }
                if (typeof m.tag != "string" && typeof m.state.onbeforeupdate == "function") {
                    var g = o.call(m.state.onbeforeupdate, m, h);
                    if (g !== void 0 && !g)
                        break
                }
                return !1
            } while (!1);
            return m.dom = h.dom,
                m.domSize = h.domSize,
                m.instance = h.instance,
                m.attrs = h.attrs,
                m.children = h.children,
                m.text = h.text,
                !0
        }
        var Tt;
        return function(m, h, g) {
            if (!m)
                throw new TypeError("DOM element being rendered to does not exist.");
            if (Tt != null && m.contains(Tt))
                throw new TypeError("Node is currently being rendered to and thus is locked.");
            var I = i
            , E = Tt
            , O = []
            , q = l()
            , Z = m.namespaceURI;
            Tt = m,
                i = typeof g == "function" ? g : void 0;
            try {
                m.vnodes == null && (m.textContent = ""),
                    h = Zn.normalizeChildren(Array.isArray(h) ? h : [h]),
                    $(m, m.vnodes, h, O, null, Z === "http://www.w3.org/1999/xhtml" ? void 0 : Z),
                    m.vnodes = h,
                    q != null && l() !== q && typeof q.focus == "function" && q.focus();
                for (var U = 0; U < O.length; U++)
                    O[U]()
            } finally {
                i = I,
                    Tt = E
            }
        }
    }, ra = mu(typeof window < "u" ? window : null), $r = It(), gu = function(e, t, i) {
        var n = []
        , s = !1
        , r = -1;
        function o() {
            for (r = 0; r < n.length; r += 2)
                try {
                    e(n[r], $r(n[r + 1]), l)
                } catch (a) {
                    i.error(a)
                }
            r = -1
        }
        function l() {
            s || (s = !0,
                  t(function() {
                s = !1,
                    o()
            }))
        }
        l.sync = o;
        function c(a, f) {
            if (f != null && f.view == null && typeof f != "function")
                throw new TypeError("m.mount expects a component, not a vnode.");
            var d = n.indexOf(a);
            d >= 0 && (n.splice(d, 2),
                       d <= r && (r -= 2),
                       e(a, [])),
                f != null && (n.push(a, f),
                              e(a, $r(f), l))
        }
        return {
            mount: c,
            redraw: l
        }
    }, yu = ra, Qs = gu(yu, typeof requestAnimationFrame < "u" ? requestAnimationFrame : null, typeof console < "u" ? console : null), Jn, Rr;
    function oa() {
        return Rr || (Rr = 1,
                      Jn = function(e) {
            if (Object.prototype.toString.call(e) !== "[object Object]")
                return "";
            var t = [];
            for (var i in e)
                n(i, e[i]);
            return t.join("&");
            function n(s, r) {
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o++)
                        n(s + "[" + o + "]", r[o]);
                else if (Object.prototype.toString.call(r) === "[object Object]")
                    for (var o in r)
                        n(s + "[" + o + "]", r[o]);
                else
                    t.push(encodeURIComponent(s) + (r != null && r !== "" ? "=" + encodeURIComponent(r) : ""))
            }
        }
                     ),
            Jn
    }
    var Qn, Ar;
    function aa() {
        if (Ar)
            return Qn;
        Ar = 1;
        var e = Dn;
        return Qn = Object.assign || function(t, i) {
            for (var n in i)
                e.call(i, n) && (t[n] = i[n])
        }
            ,
            Qn
    }
    var jn, Dr;
    function js() {
        if (Dr)
            return jn;
        Dr = 1;
        var e = oa()
        , t = aa();
        return jn = function(i, n) {
            if (/:([^\/\.-]+)(\.{3})?:/.test(i))
                throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
            if (n == null)
                return i;
            var s = i.indexOf("?")
            , r = i.indexOf("#")
            , o = r < 0 ? i.length : r
            , l = s < 0 ? o : s
            , c = i.slice(0, l)
            , a = {};
            t(a, n);
            var f = c.replace(/:([^\/\.-]+)(\.{3})?/g, function($, v, S) {
                return delete a[v],
                    n[v] == null ? $ : S ? n[v] : encodeURIComponent(String(n[v]))
            })
            , d = f.indexOf("?")
            , u = f.indexOf("#")
            , p = u < 0 ? f.length : u
            , w = d < 0 ? p : d
            , x = f.slice(0, w);
            s >= 0 && (x += i.slice(s, o)),
                d >= 0 && (x += (s < 0 ? "?" : "&") + f.slice(d, p));
            var b = e(a);
            return b && (x += (s < 0 && d < 0 ? "?" : "&") + b),
                r >= 0 && (x += i.slice(r)),
                u >= 0 && (x += (r < 0 ? "" : "&") + f.slice(u)),
                x
        }
            ,
            jn
    }
    var wu = js(), Or = Dn, vu = function(e, t, i) {
        var n = 0;
        function s(l) {
            return new t(l)
        }
        s.prototype = t.prototype,
            s.__proto__ = t;
        function r(l) {
            return function(c, a) {
                typeof c != "string" ? (a = c,
                                        c = c.url) : a == null && (a = {});
                var f = new t(function(w, x) {
                    l(wu(c, a.params), a, function(b) {
                        if (typeof a.type == "function")
                            if (Array.isArray(b))
                                for (var $ = 0; $ < b.length; $++)
                                    b[$] = new a.type(b[$]);
                            else
                                b = new a.type(b);
                        w(b)
                    }, x)
                }
                             );
                if (a.background === !0)
                    return f;
                var d = 0;
                function u() {
                    --d === 0 && typeof i == "function" && i()
                }
                return p(f);
                function p(w) {
                    var x = w.then;
                    return w.constructor = s,
                        w.then = function() {
                        d++;
                        var b = x.apply(w, arguments);
                        return b.then(u, function($) {
                            if (u(),
                                d === 0)
                                throw $
                        }),
                            p(b)
                    }
                        ,
                        w
                }
            }
        }
        function o(l, c) {
            for (var a in l.headers)
                if (Or.call(l.headers, a) && a.toLowerCase() === c)
                    return !0;
            return !1
        }
        return {
            request: r(function(l, c, a, f) {
                var d = c.method != null ? c.method.toUpperCase() : "GET", u = c.body, p = (c.serialize == null || c.serialize === JSON.serialize) && !(u instanceof e.FormData || u instanceof e.URLSearchParams), w = c.responseType || (typeof c.extract == "function" ? "" : "json"), x = new e.XMLHttpRequest, b = !1, $ = !1, v = x, S, R = x.abort;
                x.abort = function() {
                    b = !0,
                        R.call(this)
                }
                    ,
                    x.open(d, l, c.async !== !1, typeof c.user == "string" ? c.user : void 0, typeof c.password == "string" ? c.password : void 0),
                    p && u != null && !o(c, "content-type") && x.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
                    typeof c.deserialize != "function" && !o(c, "accept") && x.setRequestHeader("Accept", "application/json, text/*"),
                    c.withCredentials && (x.withCredentials = c.withCredentials),
                    c.timeout && (x.timeout = c.timeout),
                    x.responseType = w;
                for (var G in c.headers)
                    Or.call(c.headers, G) && x.setRequestHeader(G, c.headers[G]);
                x.onreadystatechange = function(X) {
                    if (!b && X.target.readyState === 4)
                        try {
                            var W = X.target.status >= 200 && X.target.status < 300 || X.target.status === 304 || /^file:\/\//i.test(l), M = X.target.response, V;
                            if (w === "json") {
                                if (!X.target.responseType && typeof c.extract != "function")
                                    try {
                                        M = JSON.parse(X.target.responseText)
                                    } catch {
                                        M = null
                                    }
                            } else
                                (!w || w === "text") && M == null && (M = X.target.responseText);
                            if (typeof c.extract == "function" ? (M = c.extract(X.target, c),
                                                                  W = !0) : typeof c.deserialize == "function" && (M = c.deserialize(M)),
                                W)
                                a(M);
                            else {
                                var F = function() {
                                    try {
                                        V = X.target.responseText
                                    } catch {
                                        V = M
                                    }
                                    var _ = new Error(V);
                                    _.code = X.target.status,
                                        _.response = M,
                                        f(_)
                                };
                                x.status === 0 ? setTimeout(function() {
                                    $ || F()
                                }) : F()
                            }
                        } catch (_) {
                            f(_)
                        }
                }
                    ,
                    x.ontimeout = function(X) {
                    $ = !0;
                    var W = new Error("Request timed out");
                    W.code = X.target.status,
                        f(W)
                }
                    ,
                    typeof c.config == "function" && (x = c.config(x, c, l) || x,
                                                      x !== v && (S = x.abort,
                                                                  x.abort = function() {
                    b = !0,
                        S.call(this)
                }
                                                                 )),
                    u == null ? x.send() : typeof c.serialize == "function" ? x.send(c.serialize(u)) : u instanceof e.FormData || u instanceof e.URLSearchParams ? x.send(u) : x.send(JSON.stringify(u))
            }),
            jsonp: r(function(l, c, a, f) {
                var d = c.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + n++
                , u = e.document.createElement("script");
                e[d] = function(p) {
                    delete e[d],
                        u.parentNode.removeChild(u),
                        a(p)
                }
                    ,
                    u.onerror = function() {
                    delete e[d],
                        u.parentNode.removeChild(u),
                        f(new Error("JSONP request failed"))
                }
                    ,
                    u.src = l + (l.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(c.callbackKey || "callback") + "=" + encodeURIComponent(d),
                    e.document.documentElement.appendChild(u)
            })
        }
    }, ku = sa, xu = Qs, bu = vu(typeof window < "u" ? window : null, ku, xu.redraw), es, _r;
    function la() {
        if (_r)
            return es;
        _r = 1;
        function e(t) {
            try {
                return decodeURIComponent(t)
            } catch {
                return t
            }
        }
        return es = function(t) {
            if (t === "" || t == null)
                return {};
            t.charAt(0) === "?" && (t = t.slice(1));
            for (var i = t.split("&"), n = {}, s = {}, r = 0; r < i.length; r++) {
                var o = i[r].split("=")
                , l = e(o[0])
                , c = o.length === 2 ? e(o[1]) : "";
                c === "true" ? c = !0 : c === "false" && (c = !1);
                var a = l.split(/\]\[?|\[/)
                , f = s;
                l.indexOf("[") > -1 && a.pop();
                for (var d = 0; d < a.length; d++) {
                    var u = a[d]
                    , p = a[d + 1]
                    , w = p == "" || !isNaN(parseInt(p, 10));
                    if (u === "") {
                        var l = a.slice(0, d).join();
                        n[l] == null && (n[l] = Array.isArray(f) ? f.length : 0),
                            u = n[l]++
                    } else if (u === "__proto__")
                        break;
                    if (d === a.length - 1)
                        f[u] = c;
                    else {
                        var x = Object.getOwnPropertyDescriptor(f, u);
                        x != null && (x = x.value),
                            x == null && (f[u] = x = w ? [] : {}),
                            f = x
                    }
                }
            }
            return s
        }
            ,
            es
    }
    var ts, zr;
    function er() {
        if (zr)
            return ts;
        zr = 1;
        var e = la();
        return ts = function(t) {
            var i = t.indexOf("?")
            , n = t.indexOf("#")
            , s = n < 0 ? t.length : n
            , r = i < 0 ? s : i
            , o = t.slice(0, r).replace(/\/{2,}/g, "/");
            return o ? (o[0] !== "/" && (o = "/" + o),
                        o.length > 1 && o[o.length - 1] === "/" && (o = o.slice(0, -1))) : o = "/",
                {
                path: o,
                params: i < 0 ? {} : e(t.slice(i + 1, s))
            }
        }
            ,
            ts
    }
    var is, Br;
    function Su() {
        if (Br)
            return is;
        Br = 1;
        var e = er();
        return is = function(t) {
            var i = e(t)
            , n = Object.keys(i.params)
            , s = []
            , r = new RegExp("^" + i.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function(o, l, c) {
                return l == null ? "\\" + o : (s.push({
                    k: l,
                    r: c === "..."
                }),
                                               c === "..." ? "(.*)" : c === "." ? "([^/]+)\\." : "([^/]+)" + (c || ""))
            }) + "$");
            return function(o) {
                for (var l = 0; l < n.length; l++)
                    if (i.params[n[l]] !== o.params[n[l]])
                        return !1;
                if (!s.length)
                    return r.test(o.path);
                var c = r.exec(o.path);
                if (c == null)
                    return !1;
                for (var l = 0; l < s.length; l++)
                    o.params[s[l].k] = s[l].r ? c[l + 1] : decodeURIComponent(c[l + 1]);
                return !0
            }
        }
            ,
            is
    }
    var ns, Hr;
    function ca() {
        if (Hr)
            return ns;
        Hr = 1;
        var e = Dn
        , t = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
        return ns = function(i, n) {
            var s = {};
            if (n != null)
                for (var r in i)
                    e.call(i, r) && !t.test(r) && n.indexOf(r) < 0 && (s[r] = i[r]);
            else
                for (var r in i)
                    e.call(i, r) && !t.test(r) && (s[r] = i[r]);
            return s
        }
            ,
            ns
    }
    var ss, Lr;
    function Iu() {
        if (Lr)
            return ss;
        Lr = 1;
        var e = It()
        , t = ia
        , i = sa
        , n = js()
        , s = er()
        , r = Su()
        , o = aa()
        , l = ca()
        , c = {};
        function a(f) {
            try {
                return decodeURIComponent(f)
            } catch {
                return f
            }
        }
        return ss = function(f, d) {
            var u = f == null ? null : typeof f.setImmediate == "function" ? f.setImmediate : f.setTimeout, p = i.resolve(), w = !1, x = !1, b = 0, $, v, S = c, R, G, X, W, M = {
                onbeforeupdate: function() {
                    return b = b ? 2 : 1,
                        !(!b || c === S)
                },
                onremove: function() {
                    f.removeEventListener("popstate", _, !1),
                        f.removeEventListener("hashchange", F, !1)
                },
                view: function() {
                    if (!(!b || c === S)) {
                        var N = [e(R, G.key, G)];
                        return S && (N = S.render(N[0])),
                            N
                    }
                }
            }, V = z.SKIP = {};
            function F() {
                w = !1;
                var N = f.location.hash;
                z.prefix[0] !== "#" && (N = f.location.search + N,
                                        z.prefix[0] !== "?" && (N = f.location.pathname + N,
                                                                N[0] !== "/" && (N = "/" + N)));
                var Y = N.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, a).slice(z.prefix.length)
                , K = s(Y);
                o(K.params, f.history.state);
                function ie(J) {
                    console.error(J),
                        D(v, null, {
                        replace: !0
                    })
                }
                ae(0);
                function ae(J) {
                    for (; J < $.length; J++)
                        if ($[J].check(K)) {
                            var Se = $[J].component
                            , zt = $[J].route
                            , Ve = Se
                            , te = W = function(Be) {
                                if (te === W) {
                                    if (Be === V)
                                        return ae(J + 1);
                                    R = Be != null && (typeof Be.view == "function" || typeof Be == "function") ? Be : "div",
                                        G = K.params,
                                        X = Y,
                                        W = null,
                                        S = Se.render ? Se : null,
                                        b === 2 ? d.redraw() : (b = 2,
                                                                d.redraw.sync())
                                }
                            }
                            ;
                            Se.view || typeof Se == "function" ? (Se = {},
                                                                  te(Ve)) : Se.onmatch ? p.then(function() {
                                return Se.onmatch(K.params, Y, zt)
                            }).then(te, Y === v ? null : ie) : te("div");
                            return
                        }
                    if (Y === v)
                        throw new Error("Could not resolve default route " + v + ".");
                    D(v, null, {
                        replace: !0
                    })
                }
            }
            function _() {
                w || (w = !0,
                      u(F))
            }
            function D(N, Y, K) {
                if (N = n(N, Y),
                    x) {
                    _();
                    var ie = K ? K.state : null
                    , ae = K ? K.title : null;
                    K && K.replace ? f.history.replaceState(ie, ae, z.prefix + N) : f.history.pushState(ie, ae, z.prefix + N)
                } else
                    f.location.href = z.prefix + N
            }
            function z(N, Y, K) {
                if (!N)
                    throw new TypeError("DOM element being rendered to does not exist.");
                if ($ = Object.keys(K).map(function(ae) {
                    if (ae[0] !== "/")
                        throw new SyntaxError("Routes must start with a '/'.");
                    if (/:([^\/\.-]+)(\.{3})?:/.test(ae))
                        throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
                    return {
                        route: ae,
                        component: K[ae],
                        check: r(ae)
                    }
                }),
                    v = Y,
                    Y != null) {
                    var ie = s(Y);
                    if (!$.some(function(ae) {
                        return ae.check(ie)
                    }))
                        throw new ReferenceError("Default route doesn't match any known routes.")
                }
                typeof f.history.pushState == "function" ? f.addEventListener("popstate", _, !1) : z.prefix[0] === "#" && f.addEventListener("hashchange", F, !1),
                    x = !0,
                    d.mount(N, M),
                    F()
            }
            return z.set = function(N, Y, K) {
                W != null && (K = K || {},
                              K.replace = !0),
                    W = null,
                    D(N, Y, K)
            }
                ,
                z.get = function() {
                return X
            }
                ,
                z.prefix = "#!",
                z.Link = {
                view: function(N) {
                    var Y = t(N.attrs.selector || "a", l(N.attrs, ["options", "params", "selector", "onclick"]), N.children), K, ie, ae;
                    return (Y.attrs.disabled = !!Y.attrs.disabled) ? (Y.attrs.href = null,
                                                                      Y.attrs["aria-disabled"] = "true") : (K = N.attrs.options,
                                                                                                            ie = N.attrs.onclick,
                                                                                                            ae = n(Y.attrs.href, N.attrs.params),
                                                                                                            Y.attrs.href = z.prefix + ae,
                                                                                                            Y.attrs.onclick = function(J) {
                        var Se;
                        typeof ie == "function" ? Se = ie.call(J.currentTarget, J) : ie == null || typeof ie != "object" || typeof ie.handleEvent == "function" && ie.handleEvent(J),
                            Se !== !1 && !J.defaultPrevented && (J.button === 0 || J.which === 0 || J.which === 1) && (!J.currentTarget.target || J.currentTarget.target === "_self") && !J.ctrlKey && !J.metaKey && !J.shiftKey && !J.altKey && (J.preventDefault(),
                    J.redraw = !1,
                    z.set(ae, null, K))
                    }
                                                                                                           ),
                        Y
                }
            },
                z.param = function(N) {
                return G && N != null ? G[N] : G
            }
                ,
                z
        }
            ,
            ss
    }
    var rs, Fr;
    function Tu() {
        if (Fr)
            return rs;
        Fr = 1;
        var e = Qs;
        return rs = Iu()(typeof window < "u" ? window : null, e),
            rs
    }
    var On = pu
    , ha = bu
    , ua = Qs
    , Ae = function() {
        return On.apply(this, arguments)
    };
    Ae.m = On;
    Ae.trust = On.trust;
    Ae.fragment = On.fragment;
    Ae.Fragment = "[";
    Ae.mount = ua.mount;
    Ae.route = Tu();
    Ae.render = ra;
    Ae.redraw = ua.redraw;
    Ae.request = ha.request;
    Ae.jsonp = ha.jsonp;
    Ae.parseQueryString = la();
    Ae.buildQueryString = oa();
    Ae.parsePathname = er();
    Ae.buildPathname = js();
    Ae.vnode = It();
    Ae.PromisePolyfill = na();
    Ae.censor = ca();
    var Mu = Ae;
    const kt = An(Mu);
    function ze(e, t, i, n, s) {
        this.debugLog = !1,
            this.baseUrl = e,
            this.lobbySize = i,
            this.devPort = t,
            this.lobbySpread = n,
            this.rawIPs = !!s,
            this.server = void 0,
            this.gameIndex = void 0,
            this.callback = void 0,
            this.errorCallback = void 0
    }
    ze.prototype.regionInfo = {
        0: {
            name: "Local",
            latitude: 0,
            longitude: 0
        },
        "us-east": {
            name: "Miami",
            latitude: 40.1393329,
            longitude: -75.8521818
        },
        miami: {
            name: "Miami",
            latitude: 40.1393329,
            longitude: -75.8521818
        },
        "us-west": {
            name: "Silicon Valley",
            latitude: 47.6149942,
            longitude: -122.4759879
        },
        siliconvalley: {
            name: "Silicon Valley",
            latitude: 47.6149942,
            longitude: -122.4759879
        },
        gb: {
            name: "London",
            latitude: 51.5283063,
            longitude: -.382486
        },
        london: {
            name: "London",
            latitude: 51.5283063,
            longitude: -.382486
        },
        "eu-west": {
            name: "Frankfurt",
            latitude: 50.1211273,
            longitude: 8.496137
        },
        frankfurt: {
            name: "Frankfurt",
            latitude: 50.1211273,
            longitude: 8.496137
        },
        au: {
            name: "Sydney",
            latitude: -33.8479715,
            longitude: 150.651084
        },
        sydney: {
            name: "Sydney",
            latitude: -33.8479715,
            longitude: 150.651084
        },
        saopaulo: {
            name: "São Paulo",
            latitude: 23.5558,
            longitude: 46.6396
        },
        sg: {
            name: "Singapore",
            latitude: 1.3147268,
            longitude: 103.7065876
        },
        singapore: {
            name: "Singapore",
            latitude: 1.3147268,
            longitude: 103.7065876
        }
    };
    ze.prototype.start = function(e, t, i, n) {
        if (this.callback = t,
            this.errorCallback = i,
            n)
            return t();
        const s = this.parseServerQuery(e);
        s && s.length > 0 ? (this.log("Found server in query."),
                             this.password = s[3],
                             this.connect(s[0], s[1], s[2])) : this.errorCallback("Unable to find server")
    }
    ;
    ze.prototype.parseServerQuery = function(e) {
        const t = new URLSearchParams(location.search,!0)
        , i = e || t.get("server");
        if (typeof i != "string")
            return [];
        const [n,s] = i.split(":");
        return [n, s, t.get("password")]
    }
    ;
    ze.prototype.findServer = function(e, t) {
        var i = this.servers[e];
        for (let n = 0; n < i.length; n++) {
            const s = i[n];
            if (s.name === t)
                return s
        }
        console.warn("Could not find server in region " + e + " with serverName " + t + ".")
    }
    ;
    ze.prototype.seekServer = function(e, t, i) {
        i == null && (i = "random"),
            t == null && (t = !1);
        const n = ["random"]
        , s = this.lobbySize
        , r = this.lobbySpread
        , o = this.servers[e].flatMap(function(u) {
            let p = 0;
            return u.games.map(function(w) {
                const x = p++;
                return {
                    region: u.region,
                    index: u.index * u.games.length + x,
                    gameIndex: x,
                    gameCount: u.games.length,
                    playerCount: w.playerCount,
                    playerCapacity: w.playerCapacity,
                    isPrivate: w.isPrivate
                }
            })
        }).filter(function(u) {
            return !u.isPrivate
        }).filter(function(u) {
            return t ? u.playerCount == 0 && u.gameIndex >= u.gameCount / 2 : !0
        }).filter(function(u) {
            return i == "random" ? !0 : n[u.index % n.length].key == i
        }).sort(function(u, p) {
            return p.playerCount - u.playerCount
        }).filter(function(u) {
            return u.playerCount < s
        });
        if (t && o.reverse(),
            o.length == 0) {
            this.errorCallback("No open servers.");
            return
        }
        const l = Math.min(r, o.length);
        var f = Math.floor(Math.random() * l);
        f = Math.min(f, o.length - 1);
        const c = o[f]
        , a = c.region;
        var f = Math.floor(c.index / c.gameCount);
        const d = c.index % c.gameCount;
        return this.log("Found server."),
            [a, f, d]
    }
    ;
    ze.prototype.connect = function(e, t, i) {
        if (this.connected)
            return;
        const n = this.findServer(e, t);
        if (n == null) {
            this.errorCallback("Failed to find server for region " + e + " and serverName " + t);
            return
        }
        if (this.log("Connecting to server", n, "with game index", i),
            n.playerCount >= n.playerCapacity) {
            this.errorCallback("Server is already full.");
            return
        }
        window.history.replaceState(document.title, document.title, this.generateHref(e, t, this.password)),
            this.server = n,
            this.gameIndex = i,
            this.log("Calling callback with address", this.serverAddress(n), "on port", this.serverPort(n)),
            this.callback(this.serverAddress(n), this.serverPort(n), i),
            _i && clearInterval(_i)
    }
    ;
    ze.prototype.switchServer = function(e, t) {
        this.switchingServers = !0,
            window.location = this.generateHref(e, t, null)
    }
    ;
    ze.prototype.generateHref = function(e, t, i) {
        let n = window.location.href.split("?")[0];
        return n += "?server=" + e + ":" + t,
            i && (n += "&password=" + encodeURIComponent(i)),
            n
    }
    ;
    ze.prototype.serverAddress = function(e) {
        return e.region == 0 ? "localhost" : e.key + "." + e.region + "." + this.baseUrl
    }
    ;
    ze.prototype.serverPort = function(e) {
        return e.port
    }
    ;
    let _i;
    function Eu(e) {
        e = e.filter(s => s.playerCount !== s.playerCapacity);
        const t = Math.min(...e.map(s => s.ping || 1 / 0))
        , i = e.filter(s => s.ping === t);
        return !i.length > 0 ? null : i.reduce( (s, r) => s.playerCount > r.playerCount ? s : r)
    }
    ze.prototype.processServers = function(e) {
        return _i && clearInterval(_i),
            new Promise(t => {
            const i = {}
            , n = c => {
                const a = i[c]
                , f = a[0];
                let d = this.serverAddress(f);
                const u = this.serverPort(f);
                u && (d += `:${u}`);
                const p = `https://${d}/ping`
                , w = new Date().getTime();
                return Promise.race([fetch(p).then( () => {
                    const x = new Date().getTime() - w;
                    a.forEach(b => {
                        b.pings = b.pings ?? [],
                            b.pings.push(x),
                            b.pings.length > 10 && b.pings.shift(),
                            b.ping = Math.floor(b.pings.reduce( ($, v) => $ + v, 0) / b.pings.length)
                    }
                             )
                }
                                                  ).catch( () => {}
                                                         ), new Promise(x => setTimeout( () => x(), 100))])
            }
            , s = async () => {
                await Promise.all(Object.keys(i).map(n)),
                    window.blockRedraw || kt.redraw()
            }
            ;
            e.forEach(c => {
                i[c.region] = i[c.region] || [],
                    i[c.region].push(c)
            }
                     );
            for (const c in i)
                i[c] = i[c].sort(function(a, f) {
                    return f.playerCount - a.playerCount
                });
            this.servers = i;
            let r;
            const [o,l] = this.parseServerQuery();
            e.forEach(c => {
                o === c.region && l === c.name && (c.selected = !0,
                                                   r = c)
            }
                     ),
                s().then(s).then( () => {
                if (r)
                    return;
                let c = Eu(e);
                c || (c = e[0]),
                    c && (c.selected = !0,
                          window.history.replaceState(document.title, document.title, this.generateHref(c.region, c.name, this.password))),
                    window.blockRedraw || kt.redraw()
            }
                                ).then(s).catch(c => {}
                                               ).finally(t),
                _i = setInterval(s, 5e3)
        }
                       )
    }
    ;
    ze.prototype.ipToHex = function(e) {
        return e.split(".").map(i => ("00" + parseInt(i).toString(16)).substr(-2)).join("").toLowerCase()
    }
    ;
    ze.prototype.hashIP = function(e) {
        return tu(this.ipToHex(e))
    }
    ;
    ze.prototype.log = function() {
        if (this.debugLog)
            return console.log.apply(void 0, arguments);
        if (console.verbose)
            return console.verbose.apply(void 0, arguments)
    }
    ;
    ze.prototype.stripRegion = function(e) {
        return e.startsWith("vultr:") ? e = e.slice(6) : e.startsWith("do:") && (e = e.slice(3)),
            e
    }
    ;
    const Cu = function(e, t) {
        return e.concat(t)
    }
    , Pu = function(e, t) {
        return t.map(e).reduce(Cu, [])
    };
    Array.prototype.flatMap = function(e) {
        return Pu(e, this)
    }
    ;
    const hn = (e, t) => {
        const i = t.x - e.x
        , n = t.y - e.y;
        return Math.sqrt(i * i + n * n)
    }
    , $u = (e, t) => {
        const i = t.x - e.x
        , n = t.y - e.y;
        return Au(Math.atan2(n, i))
    }
    , Ru = (e, t, i) => {
        const n = {
            x: 0,
            y: 0
        };
        return i = Cs(i),
            n.x = e.x - t * Math.cos(i),
            n.y = e.y - t * Math.sin(i),
            n
    }
    , Cs = e => e * (Math.PI / 180)
    , Au = e => e * (180 / Math.PI)
    , Du = e => isNaN(e.buttons) ? e.pressure !== 0 : e.buttons !== 0
    , os = new Map
    , Vr = e => {
        os.has(e) && clearTimeout(os.get(e)),
            os.set(e, setTimeout(e, 100))
    }
    , wn = (e, t, i) => {
        const n = t.split(/[ ,]+/g);
        let s;
        for (let r = 0; r < n.length; r += 1)
            s = n[r],
                e.addEventListener ? e.addEventListener(s, i, !1) : e.attachEvent && e.attachEvent(s, i)
    }
    , Nr = (e, t, i) => {
        const n = t.split(/[ ,]+/g);
        let s;
        for (let r = 0; r < n.length; r += 1)
            s = n[r],
                e.removeEventListener ? e.removeEventListener(s, i) : e.detachEvent && e.detachEvent(s, i)
    }
    , fa = e => (e.preventDefault(),
                 e.type.match(/^touch/) ? e.changedTouches : e)
    , Ur = () => {
        const e = window.pageXOffset !== void 0 ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
        , t = window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return {
            x: e,
            y: t
        }
    }
    , Wr = (e, t) => {
        t.top || t.right || t.bottom || t.left ? (e.style.top = t.top,
                                                  e.style.right = t.right,
                                                  e.style.bottom = t.bottom,
                                                  e.style.left = t.left) : (e.style.left = t.x + "px",
                                                                            e.style.top = t.y + "px")
    }
    , tr = (e, t, i) => {
        const n = da(e);
        for (let s in n)
            if (n.hasOwnProperty(s))
                if (typeof t == "string")
                    n[s] = t + " " + i;
                else {
                    let r = "";
                    for (let o = 0, l = t.length; o < l; o += 1)
                        r += t[o] + " " + i + ", ";
                    n[s] = r.slice(0, -2)
                }
        return n
    }
    , Ou = (e, t) => {
        const i = da(e);
        for (let n in i)
            i.hasOwnProperty(n) && (i[n] = t);
        return i
    }
    , da = e => {
        const t = {};
        return t[e] = "",
            ["webkit", "Moz", "o"].forEach(function(n) {
            t[n + e.charAt(0).toUpperCase() + e.slice(1)] = ""
        }),
            t
    }
    , as = (e, t) => {
        for (let i in t)
            t.hasOwnProperty(i) && (e[i] = t[i]);
        return e
    }
    , _u = (e, t) => {
        const i = {};
        for (let n in e)
            e.hasOwnProperty(n) && t.hasOwnProperty(n) ? i[n] = t[n] : e.hasOwnProperty(n) && (i[n] = e[n]);
        return i
    }
    , Ps = (e, t) => {
        if (e.length)
            for (let i = 0, n = e.length; i < n; i += 1)
                t(e[i]);
        else
            t(e)
    }
    , zu = (e, t, i) => ({
        x: Math.min(Math.max(e.x, t.x - i), t.x + i),
        y: Math.min(Math.max(e.y, t.y - i), t.y + i)
    });
    var Bu = "ontouchstart"in window, Hu = !!window.PointerEvent, Lu = !!window.MSPointerEvent, Ci = {
        touch: {
            start: "touchstart",
            move: "touchmove",
            end: "touchend, touchcancel"
        },
        mouse: {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
        },
        pointer: {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup, pointercancel"
        },
        MSPointer: {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        }
    }, si, Wi = {};
    Hu ? si = Ci.pointer : Lu ? si = Ci.MSPointer : Bu ? (si = Ci.touch,
                                                          Wi = Ci.mouse) : si = Ci.mouse;
    function dt() {}
    dt.prototype.on = function(e, t) {
        var i = this, n = e.split(/[ ,]+/g), s;
        i._handlers_ = i._handlers_ || {};
        for (var r = 0; r < n.length; r += 1)
            s = n[r],
                i._handlers_[s] = i._handlers_[s] || [],
                i._handlers_[s].push(t);
        return i
    }
    ;
    dt.prototype.off = function(e, t) {
        var i = this;
        return i._handlers_ = i._handlers_ || {},
            e === void 0 ? i._handlers_ = {} : t === void 0 ? i._handlers_[e] = null : i._handlers_[e] && i._handlers_[e].indexOf(t) >= 0 && i._handlers_[e].splice(i._handlers_[e].indexOf(t), 1),
            i
    }
    ;
    dt.prototype.trigger = function(e, t) {
        var i = this, n = e.split(/[ ,]+/g), s;
        i._handlers_ = i._handlers_ || {};
        for (var r = 0; r < n.length; r += 1)
            s = n[r],
                i._handlers_[s] && i._handlers_[s].length && i._handlers_[s].forEach(function(o) {
                o.call(i, {
                    type: s,
                    target: i
                }, t)
            })
    }
    ;
    dt.prototype.config = function(e) {
        var t = this;
        t.options = t.defaults || {},
            e && (t.options = _u(t.options, e))
    }
    ;
    dt.prototype.bindEvt = function(e, t) {
        var i = this;
        return i._domHandlers_ = i._domHandlers_ || {},
            i._domHandlers_[t] = function() {
            typeof i["on" + t] == "function" ? i["on" + t].apply(i, arguments) : console.warn('[WARNING] : Missing "on' + t + '" handler.')
        }
            ,
            wn(e, si[t], i._domHandlers_[t]),
            Wi[t] && wn(e, Wi[t], i._domHandlers_[t]),
            i
    }
    ;
    dt.prototype.unbindEvt = function(e, t) {
        var i = this;
        return i._domHandlers_ = i._domHandlers_ || {},
            Nr(e, si[t], i._domHandlers_[t]),
            Wi[t] && Nr(e, Wi[t], i._domHandlers_[t]),
            delete i._domHandlers_[t],
            this
    }
    ;
    function Ee(e, t) {
        return this.identifier = t.identifier,
            this.position = t.position,
            this.frontPosition = t.frontPosition,
            this.collection = e,
            this.defaults = {
            size: 100,
            threshold: .1,
            color: "white",
            fadeTime: 250,
            dataOnly: !1,
            restJoystick: !0,
            restOpacity: .5,
            mode: "dynamic",
            zone: document.body,
            lockX: !1,
            lockY: !1,
            shape: "circle"
        },
            this.config(t),
            this.options.mode === "dynamic" && (this.options.restOpacity = 0),
            this.id = Ee.id,
            Ee.id += 1,
            this.buildEl().stylize(),
            this.instance = {
            el: this.ui.el,
            on: this.on.bind(this),
            off: this.off.bind(this),
            show: this.show.bind(this),
            hide: this.hide.bind(this),
            add: this.addToDom.bind(this),
            remove: this.removeFromDom.bind(this),
            destroy: this.destroy.bind(this),
            setPosition: this.setPosition.bind(this),
            resetDirection: this.resetDirection.bind(this),
            computeDirection: this.computeDirection.bind(this),
            trigger: this.trigger.bind(this),
            position: this.position,
            frontPosition: this.frontPosition,
            ui: this.ui,
            identifier: this.identifier,
            id: this.id,
            options: this.options
        },
            this.instance
    }
    Ee.prototype = new dt;
    Ee.constructor = Ee;
    Ee.id = 0;
    Ee.prototype.buildEl = function(e) {
        return this.ui = {},
            this.options.dataOnly ? this : (this.ui.el = document.createElement("div"),
                                            this.ui.back = document.createElement("div"),
                                            this.ui.front = document.createElement("div"),
                                            this.ui.el.className = "nipple collection_" + this.collection.id,
                                            this.ui.back.className = "back",
                                            this.ui.front.className = "front",
                                            this.ui.el.setAttribute("id", "nipple_" + this.collection.id + "_" + this.id),
                                            this.ui.el.appendChild(this.ui.back),
                                            this.ui.el.appendChild(this.ui.front),
                                            this)
    }
    ;
    Ee.prototype.stylize = function() {
        if (this.options.dataOnly)
            return this;
        var e = this.options.fadeTime + "ms"
        , t = Ou("borderRadius", "50%")
        , i = tr("transition", "opacity", e)
        , n = {};
        return n.el = {
            position: "absolute",
            opacity: this.options.restOpacity,
            display: "block",
            zIndex: 999
        },
            n.back = {
            position: "absolute",
            display: "block",
            width: this.options.size + "px",
            height: this.options.size + "px",
            marginLeft: -this.options.size / 2 + "px",
            marginTop: -this.options.size / 2 + "px",
            background: this.options.color,
            opacity: ".5"
        },
            n.front = {
            width: this.options.size / 2 + "px",
            height: this.options.size / 2 + "px",
            position: "absolute",
            display: "block",
            marginLeft: -this.options.size / 4 + "px",
            marginTop: -this.options.size / 4 + "px",
            background: this.options.color,
            opacity: ".5",
            transform: "translate(0px, 0px)"
        },
            as(n.el, i),
            this.options.shape === "circle" && as(n.back, t),
            as(n.front, t),
            this.applyStyles(n),
            this
    }
    ;
    Ee.prototype.applyStyles = function(e) {
        for (var t in this.ui)
            if (this.ui.hasOwnProperty(t))
                for (var i in e[t])
                    this.ui[t].style[i] = e[t][i];
        return this
    }
    ;
    Ee.prototype.addToDom = function() {
        return this.options.dataOnly || document.body.contains(this.ui.el) ? this : (this.options.zone.appendChild(this.ui.el),
                                                                                     this)
    }
    ;
    Ee.prototype.removeFromDom = function() {
        return this.options.dataOnly || !document.body.contains(this.ui.el) ? this : (this.options.zone.removeChild(this.ui.el),
                                                                                      this)
    }
    ;
    Ee.prototype.destroy = function() {
        clearTimeout(this.removeTimeout),
            clearTimeout(this.showTimeout),
            clearTimeout(this.restTimeout),
            this.trigger("destroyed", this.instance),
            this.removeFromDom(),
            this.off()
    }
    ;
    Ee.prototype.show = function(e) {
        var t = this;
        return t.options.dataOnly || (clearTimeout(t.removeTimeout),
                                      clearTimeout(t.showTimeout),
                                      clearTimeout(t.restTimeout),
                                      t.addToDom(),
                                      t.restCallback(),
                                      setTimeout(function() {
            t.ui.el.style.opacity = 1
        }, 0),
                                      t.showTimeout = setTimeout(function() {
            t.trigger("shown", t.instance),
                typeof e == "function" && e.call(this)
        }, t.options.fadeTime)),
            t
    }
    ;
    Ee.prototype.hide = function(e) {
        var t = this;
        if (t.options.dataOnly)
            return t;
        if (t.ui.el.style.opacity = t.options.restOpacity,
            clearTimeout(t.removeTimeout),
            clearTimeout(t.showTimeout),
            clearTimeout(t.restTimeout),
            t.removeTimeout = setTimeout(function() {
            var i = t.options.mode === "dynamic" ? "none" : "block";
            t.ui.el.style.display = i,
                typeof e == "function" && e.call(t),
                t.trigger("hidden", t.instance)
        }, t.options.fadeTime),
            t.options.restJoystick) {
            const i = t.options.restJoystick
            , n = {};
            n.x = i === !0 || i.x !== !1 ? 0 : t.instance.frontPosition.x,
                n.y = i === !0 || i.y !== !1 ? 0 : t.instance.frontPosition.y,
                t.setPosition(e, n)
        }
        return t
    }
    ;
    Ee.prototype.setPosition = function(e, t) {
        var i = this;
        i.frontPosition = {
            x: t.x,
            y: t.y
        };
        var n = i.options.fadeTime + "ms"
        , s = {};
        s.front = tr("transition", ["transform"], n);
        var r = {
            front: {}
        };
        r.front = {
            transform: "translate(" + i.frontPosition.x + "px," + i.frontPosition.y + "px)"
        },
            i.applyStyles(s),
            i.applyStyles(r),
            i.restTimeout = setTimeout(function() {
            typeof e == "function" && e.call(i),
                i.restCallback()
        }, i.options.fadeTime)
    }
    ;
    Ee.prototype.restCallback = function() {
        var e = this
        , t = {};
        t.front = tr("transition", "none", ""),
            e.applyStyles(t),
            e.trigger("rested", e.instance)
    }
    ;
    Ee.prototype.resetDirection = function() {
        this.direction = {
            x: !1,
            y: !1,
            angle: !1
        }
    }
    ;
    Ee.prototype.computeDirection = function(e) {
        var t = e.angle.radian, i = Math.PI / 4, n = Math.PI / 2, s, r, o;
        if (t > i && t < i * 3 && !e.lockX ? s = "up" : t > -i && t <= i && !e.lockY ? s = "left" : t > -i * 3 && t <= -i && !e.lockX ? s = "down" : e.lockY || (s = "right"),
            e.lockY || (t > -n && t < n ? r = "left" : r = "right"),
            e.lockX || (t > 0 ? o = "up" : o = "down"),
            e.force > this.options.threshold) {
            var l = {}, c;
            for (c in this.direction)
                this.direction.hasOwnProperty(c) && (l[c] = this.direction[c]);
            var a = {};
            this.direction = {
                x: r,
                y: o,
                angle: s
            },
                e.direction = this.direction;
            for (c in l)
                l[c] === this.direction[c] && (a[c] = !0);
            if (a.x && a.y && a.angle)
                return e;
            (!a.x || !a.y) && this.trigger("plain", e),
                a.x || this.trigger("plain:" + r, e),
                a.y || this.trigger("plain:" + o, e),
                a.angle || this.trigger("dir dir:" + s, e)
        } else
            this.resetDirection();
        return e
    }
    ;
    function ke(e, t) {
        var i = this;
        i.nipples = [],
            i.idles = [],
            i.actives = [],
            i.ids = [],
            i.pressureIntervals = {},
            i.manager = e,
            i.id = ke.id,
            ke.id += 1,
            i.defaults = {
            zone: document.body,
            multitouch: !1,
            maxNumberOfNipples: 10,
            mode: "dynamic",
            position: {
                top: 0,
                left: 0
            },
            catchDistance: 200,
            size: 100,
            threshold: .1,
            color: "white",
            fadeTime: 250,
            dataOnly: !1,
            restJoystick: !0,
            restOpacity: .5,
            lockX: !1,
            lockY: !1,
            shape: "circle",
            dynamicPage: !1,
            follow: !1
        },
            i.config(t),
            (i.options.mode === "static" || i.options.mode === "semi") && (i.options.multitouch = !1),
            i.options.multitouch || (i.options.maxNumberOfNipples = 1);
        const n = getComputedStyle(i.options.zone.parentElement);
        return n && n.display === "flex" && (i.parentIsFlex = !0),
            i.updateBox(),
            i.prepareNipples(),
            i.bindings(),
            i.begin(),
            i.nipples
    }
    ke.prototype = new dt;
    ke.constructor = ke;
    ke.id = 0;
    ke.prototype.prepareNipples = function() {
        var e = this
        , t = e.nipples;
        t.on = e.on.bind(e),
            t.off = e.off.bind(e),
            t.options = e.options,
            t.destroy = e.destroy.bind(e),
            t.ids = e.ids,
            t.id = e.id,
            t.processOnMove = e.processOnMove.bind(e),
            t.processOnEnd = e.processOnEnd.bind(e),
            t.get = function(i) {
            if (i === void 0)
                return t[0];
            for (var n = 0, s = t.length; n < s; n += 1)
                if (t[n].identifier === i)
                    return t[n];
            return !1
        }
    }
    ;
    ke.prototype.bindings = function() {
        var e = this;
        e.bindEvt(e.options.zone, "start"),
            e.options.zone.style.touchAction = "none",
            e.options.zone.style.msTouchAction = "none"
    }
    ;
    ke.prototype.begin = function() {
        var e = this
        , t = e.options;
        if (t.mode === "static") {
            var i = e.createNipple(t.position, e.manager.getIdentifier());
            i.add(),
                e.idles.push(i)
        }
    }
    ;
    ke.prototype.createNipple = function(e, t) {
        var i = this
        , n = i.manager.scroll
        , s = {}
        , r = i.options
        , o = {
            x: i.parentIsFlex ? n.x : n.x + i.box.left,
            y: i.parentIsFlex ? n.y : n.y + i.box.top
        };
        if (e.x && e.y)
            s = {
                x: e.x - o.x,
                y: e.y - o.y
            };
        else if (e.top || e.right || e.bottom || e.left) {
            var l = document.createElement("DIV");
            l.style.display = "hidden",
                l.style.top = e.top,
                l.style.right = e.right,
                l.style.bottom = e.bottom,
                l.style.left = e.left,
                l.style.position = "absolute",
                r.zone.appendChild(l);
            var c = l.getBoundingClientRect();
            r.zone.removeChild(l),
                s = e,
                e = {
                x: c.left + n.x,
                y: c.top + n.y
            }
        }
        var a = new Ee(i,{
            color: r.color,
            size: r.size,
            threshold: r.threshold,
            fadeTime: r.fadeTime,
            dataOnly: r.dataOnly,
            restJoystick: r.restJoystick,
            restOpacity: r.restOpacity,
            mode: r.mode,
            identifier: t,
            position: e,
            zone: r.zone,
            frontPosition: {
                x: 0,
                y: 0
            },
            shape: r.shape
        });
        return r.dataOnly || (Wr(a.ui.el, s),
                              Wr(a.ui.front, a.frontPosition)),
            i.nipples.push(a),
            i.trigger("added " + a.identifier + ":added", a),
            i.manager.trigger("added " + a.identifier + ":added", a),
            i.bindNipple(a),
            a
    }
    ;
    ke.prototype.updateBox = function() {
        var e = this;
        e.box = e.options.zone.getBoundingClientRect()
    }
    ;
    ke.prototype.bindNipple = function(e) {
        var t = this, i, n = function(s, r) {
            i = s.type + " " + r.id + ":" + s.type,
                t.trigger(i, r)
        };
        e.on("destroyed", t.onDestroyed.bind(t)),
            e.on("shown hidden rested dir plain", n),
            e.on("dir:up dir:right dir:down dir:left", n),
            e.on("plain:up plain:right plain:down plain:left", n)
    }
    ;
    ke.prototype.pressureFn = function(e, t, i) {
        var n = this
        , s = 0;
        clearInterval(n.pressureIntervals[i]),
            n.pressureIntervals[i] = setInterval((function() {
            var r = e.force || e.pressure || e.webkitForce || 0;
            r !== s && (t.trigger("pressure", r),
                        n.trigger("pressure " + t.identifier + ":pressure", r),
                        s = r)
        }
                                                 ).bind(n), 100)
    }
    ;
    ke.prototype.onstart = function(e) {
        var t = this
        , i = t.options
        , n = e;
        e = fa(e),
            t.updateBox();
        var s = function(r) {
            t.actives.length < i.maxNumberOfNipples ? t.processOnStart(r) : n.type.match(/^touch/) && (Object.keys(t.manager.ids).forEach(function(o) {
                if (Object.values(n.touches).findIndex(function(c) {
                    return c.identifier === o
                }) < 0) {
                    var l = [e[0]];
                    l.identifier = o,
                        t.processOnEnd(l)
                }
            }),
                                                                                                       t.actives.length < i.maxNumberOfNipples && t.processOnStart(r))
        };
        return Ps(e, s),
            t.manager.bindDocument(),
            !1
    }
    ;
    ke.prototype.processOnStart = function(e) {
        var t = this, i = t.options, n, s = t.manager.getIdentifier(e), r = e.force || e.pressure || e.webkitForce || 0, o = {
            x: e.pageX,
            y: e.pageY
        }, l = t.getOrCreate(s, o);
        l.identifier !== s && t.manager.removeIdentifier(l.identifier),
            l.identifier = s;
        var c = function(f) {
            f.trigger("start", f),
                t.trigger("start " + f.id + ":start", f),
                f.show(),
                r > 0 && t.pressureFn(e, f, f.identifier),
                t.processOnMove(e)
        };
        if ((n = t.idles.indexOf(l)) >= 0 && t.idles.splice(n, 1),
            t.actives.push(l),
            t.ids.push(l.identifier),
            i.mode !== "semi")
            c(l);
        else {
            var a = hn(o, l.position);
            if (a <= i.catchDistance)
                c(l);
            else {
                l.destroy(),
                    t.processOnStart(e);
                return
            }
        }
        return l
    }
    ;
    ke.prototype.getOrCreate = function(e, t) {
        var i = this, n = i.options, s;
        return /(semi|static)/.test(n.mode) ? (s = i.idles[0],
                                               s ? (i.idles.splice(0, 1),
                                                    s) : n.mode === "semi" ? i.createNipple(t, e) : (console.warn("Coudln't find the needed nipple."),
                                                                                                     !1)) : (s = i.createNipple(t, e),
                                                                                                             s)
    }
    ;
    ke.prototype.processOnMove = function(e) {
        var t = this
        , i = t.options
        , n = t.manager.getIdentifier(e)
        , s = t.nipples.get(n)
        , r = t.manager.scroll;
        if (!Du(e)) {
            this.processOnEnd(e);
            return
        }
        if (!s) {
            console.error("Found zombie joystick with ID " + n),
                t.manager.removeIdentifier(n);
            return
        }
        if (i.dynamicPage) {
            var o = s.el.getBoundingClientRect();
            s.position = {
                x: r.x + o.left,
                y: r.y + o.top
            }
        }
        s.identifier = n;
        var l = s.options.size / 2
        , c = {
            x: e.pageX,
            y: e.pageY
        };
        i.lockX && (c.y = s.position.y),
            i.lockY && (c.x = s.position.x);
        var a = hn(c, s.position), f = $u(c, s.position), d = Cs(f), u = a / l, p = {
            distance: a,
            position: c
        }, w, x;
        if (s.options.shape === "circle" ? (w = Math.min(a, l),
                                            x = Ru(s.position, w, f)) : (x = zu(c, s.position, l),
                                                                         w = hn(x, s.position)),
            i.follow) {
            if (a > l) {
                let S = c.x - x.x
                , R = c.y - x.y;
                s.position.x += S,
                    s.position.y += R,
                    s.el.style.top = s.position.y - (t.box.top + r.y) + "px",
                    s.el.style.left = s.position.x - (t.box.left + r.x) + "px",
                    a = hn(c, s.position)
            }
        } else
            c = x,
                a = w;
        var b = c.x - s.position.x
        , $ = c.y - s.position.y;
        s.frontPosition = {
            x: b,
            y: $
        },
            i.dataOnly || (s.ui.front.style.transform = "translate(" + b + "px," + $ + "px)");
        var v = {
            identifier: s.identifier,
            position: c,
            force: u,
            pressure: e.force || e.pressure || e.webkitForce || 0,
            distance: a,
            angle: {
                radian: d,
                degree: f
            },
            vector: {
                x: b / l,
                y: -$ / l
            },
            raw: p,
            instance: s,
            lockX: i.lockX,
            lockY: i.lockY
        };
        v = s.computeDirection(v),
            v.angle = {
            radian: Cs(180 - f),
            degree: 180 - f
        },
            s.trigger("move", v),
            t.trigger("move " + s.id + ":move", v)
    }
    ;
    ke.prototype.processOnEnd = function(e) {
        var t = this
        , i = t.options
        , n = t.manager.getIdentifier(e)
        , s = t.nipples.get(n)
        , r = t.manager.removeIdentifier(s.identifier);
        s && (i.dataOnly || s.hide(function() {
            i.mode === "dynamic" && (s.trigger("removed", s),
                                     t.trigger("removed " + s.id + ":removed", s),
                                     t.manager.trigger("removed " + s.id + ":removed", s),
                                     s.destroy())
        }),
              clearInterval(t.pressureIntervals[s.identifier]),
              s.resetDirection(),
              s.trigger("end", s),
              t.trigger("end " + s.id + ":end", s),
              t.ids.indexOf(s.identifier) >= 0 && t.ids.splice(t.ids.indexOf(s.identifier), 1),
              t.actives.indexOf(s) >= 0 && t.actives.splice(t.actives.indexOf(s), 1),
              /(semi|static)/.test(i.mode) ? t.idles.push(s) : t.nipples.indexOf(s) >= 0 && t.nipples.splice(t.nipples.indexOf(s), 1),
              t.manager.unbindDocument(),
              /(semi|static)/.test(i.mode) && (t.manager.ids[r.id] = r.identifier))
    }
    ;
    ke.prototype.onDestroyed = function(e, t) {
        var i = this;
        i.nipples.indexOf(t) >= 0 && i.nipples.splice(i.nipples.indexOf(t), 1),
            i.actives.indexOf(t) >= 0 && i.actives.splice(i.actives.indexOf(t), 1),
            i.idles.indexOf(t) >= 0 && i.idles.splice(i.idles.indexOf(t), 1),
            i.ids.indexOf(t.identifier) >= 0 && i.ids.splice(i.ids.indexOf(t.identifier), 1),
            i.manager.removeIdentifier(t.identifier),
            i.manager.unbindDocument()
    }
    ;
    ke.prototype.destroy = function() {
        var e = this;
        e.unbindEvt(e.options.zone, "start"),
            e.nipples.forEach(function(i) {
            i.destroy()
        });
        for (var t in e.pressureIntervals)
            e.pressureIntervals.hasOwnProperty(t) && clearInterval(e.pressureIntervals[t]);
        e.trigger("destroyed", e.nipples),
            e.manager.unbindDocument(),
            e.off()
    }
    ;
    function Re(e) {
        var t = this;
        t.ids = {},
            t.index = 0,
            t.collections = [],
            t.scroll = Ur(),
            t.config(e),
            t.prepareCollections();
        var i = function() {
            var s;
            t.collections.forEach(function(r) {
                r.forEach(function(o) {
                    s = o.el.getBoundingClientRect(),
                        o.position = {
                        x: t.scroll.x + s.left,
                        y: t.scroll.y + s.top
                    }
                })
            })
        };
        wn(window, "resize", function() {
            Vr(i)
        });
        var n = function() {
            t.scroll = Ur()
        };
        return wn(window, "scroll", function() {
            Vr(n)
        }),
            t.collections
    }
    Re.prototype = new dt;
    Re.constructor = Re;
    Re.prototype.prepareCollections = function() {
        var e = this;
        e.collections.create = e.create.bind(e),
            e.collections.on = e.on.bind(e),
            e.collections.off = e.off.bind(e),
            e.collections.destroy = e.destroy.bind(e),
            e.collections.get = function(t) {
            var i;
            return e.collections.every(function(n) {
                return i = n.get(t),
                    !i
            }),
                i
        }
    }
    ;
    Re.prototype.create = function(e) {
        return this.createCollection(e)
    }
    ;
    Re.prototype.createCollection = function(e) {
        var t = this
        , i = new ke(t,e);
        return t.bindCollection(i),
            t.collections.push(i),
            i
    }
    ;
    Re.prototype.bindCollection = function(e) {
        var t = this, i, n = function(s, r) {
            i = s.type + " " + r.id + ":" + s.type,
                t.trigger(i, r)
        };
        e.on("destroyed", t.onDestroyed.bind(t)),
            e.on("shown hidden rested dir plain", n),
            e.on("dir:up dir:right dir:down dir:left", n),
            e.on("plain:up plain:right plain:down plain:left", n)
    }
    ;
    Re.prototype.bindDocument = function() {
        var e = this;
        e.binded || (e.bindEvt(document, "move").bindEvt(document, "end"),
                     e.binded = !0)
    }
    ;
    Re.prototype.unbindDocument = function(e) {
        var t = this;
        (!Object.keys(t.ids).length || e === !0) && (t.unbindEvt(document, "move").unbindEvt(document, "end"),
                                                     t.binded = !1)
    }
    ;
    Re.prototype.getIdentifier = function(e) {
        var t;
        return e ? (t = e.identifier === void 0 ? e.pointerId : e.identifier,
                    t === void 0 && (t = this.latest || 0)) : t = this.index,
            this.ids[t] === void 0 && (this.ids[t] = this.index,
                                       this.index += 1),
            this.latest = t,
            this.ids[t]
    }
    ;
    Re.prototype.removeIdentifier = function(e) {
        var t = {};
        for (var i in this.ids)
            if (this.ids[i] === e) {
                t.id = i,
                    t.identifier = this.ids[i],
                    delete this.ids[i];
                break
            }
        return t
    }
    ;
    Re.prototype.onmove = function(e) {
        var t = this;
        return t.onAny("move", e),
            !1
    }
    ;
    Re.prototype.onend = function(e) {
        var t = this;
        return t.onAny("end", e),
            !1
    }
    ;
    Re.prototype.oncancel = function(e) {
        var t = this;
        return t.onAny("end", e),
            !1
    }
    ;
    Re.prototype.onAny = function(e, t) {
        var i = this, n, s = "processOn" + e.charAt(0).toUpperCase() + e.slice(1);
        t = fa(t);
        var r = function(l, c, a) {
            a.ids.indexOf(c) >= 0 && (a[s](l),
                                      l._found_ = !0)
        }
        , o = function(l) {
            n = i.getIdentifier(l),
                Ps(i.collections, r.bind(null, l, n)),
                l._found_ || i.removeIdentifier(n)
        };
        return Ps(t, o),
            !1
    }
    ;
    Re.prototype.destroy = function() {
        var e = this;
        e.unbindDocument(!0),
            e.ids = {},
            e.index = 0,
            e.collections.forEach(function(t) {
            t.destroy()
        }),
            e.off()
    }
    ;
    Re.prototype.onDestroyed = function(e, t) {
        var i = this;
        if (i.collections.indexOf(t) < 0)
            return !1;
        i.collections.splice(i.collections.indexOf(t), 1)
    }
    ;
    const Xr = new Re
    , qr = {
        create: function(e) {
            return Xr.create(e)
        },
        factory: Xr
    };
    let Gr = !1;
    const Fu = e => {
        if (Gr)
            return;
        Gr = !0;
        const t = document.getElementById("touch-controls-left")
        , i = qr.create({
            zone: t
        });
        i.on("start", e.onStartMoving),
            i.on("end", e.onStopMoving),
            i.on("move", e.onRotateMoving);
        const n = document.getElementById("touch-controls-right")
        , s = qr.create({
            zone: n
        });
        s.on("start", e.onStartAttacking),
            s.on("end", e.onStopAttacking),
            s.on("move", e.onRotateAttacking),
            t.style.display = "block",
            n.style.display = "block"
    }
    , Vu = {
        enable: Fu
    };
    var Nu = Object.defineProperty
    , Uu = (e, t, i) => t in e ? Nu(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : e[t] = i
    , Ge = (e, t, i) => Uu(e, typeof t != "symbol" ? t + "" : t, i);
    const pa = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGY9bmV3IFRleHRFbmNvZGVyO2Z1bmN0aW9uIHAoZSl7cmV0dXJuWy4uLm5ldyBVaW50OEFycmF5KGUpXS5tYXAodD0+dC50b1N0cmluZygxNikucGFkU3RhcnQoMiwiMCIpKS5qb2luKCIiKX1hc3luYyBmdW5jdGlvbiB3KGUsdCxyKXtyZXR1cm4gcChhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChyLnRvVXBwZXJDYXNlKCksZi5lbmNvZGUoZSt0KSkpfWZ1bmN0aW9uIGIoZSx0LHI9IlNIQS0yNTYiLG49MWU2LHM9MCl7Y29uc3Qgbz1uZXcgQWJvcnRDb250cm9sbGVyLGE9RGF0ZS5ub3coKTtyZXR1cm57cHJvbWlzZTooYXN5bmMoKT0+e2ZvcihsZXQgYz1zO2M8PW47Yys9MSl7aWYoby5zaWduYWwuYWJvcnRlZClyZXR1cm4gbnVsbDtpZihhd2FpdCB3KHQsYyxyKT09PWUpcmV0dXJue251bWJlcjpjLHRvb2s6RGF0ZS5ub3coKS1hfX1yZXR1cm4gbnVsbH0pKCksY29udHJvbGxlcjpvfX1mdW5jdGlvbiBoKGUpe2NvbnN0IHQ9YXRvYihlKSxyPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoKTtmb3IobGV0IG49MDtuPHQubGVuZ3RoO24rKylyW25dPXQuY2hhckNvZGVBdChuKTtyZXR1cm4gcn1mdW5jdGlvbiBnKGUsdD0xMil7Y29uc3Qgcj1uZXcgVWludDhBcnJheSh0KTtmb3IobGV0IG49MDtuPHQ7bisrKXJbbl09ZSUyNTYsZT1NYXRoLmZsb29yKGUvMjU2KTtyZXR1cm4gcn1hc3luYyBmdW5jdGlvbiBtKGUsdD0iIixyPTFlNixuPTApe2NvbnN0IHM9IkFFUy1HQ00iLG89bmV3IEFib3J0Q29udHJvbGxlcixhPURhdGUubm93KCksbD1hc3luYygpPT57Zm9yKGxldCB1PW47dTw9cjt1Kz0xKXtpZihvLnNpZ25hbC5hYm9ydGVkfHwhY3x8IXkpcmV0dXJuIG51bGw7dHJ5e2NvbnN0IGQ9YXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHtuYW1lOnMsaXY6Zyh1KX0sYyx5KTtpZihkKXJldHVybntjbGVhclRleHQ6bmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGQpLHRvb2s6RGF0ZS5ub3coKS1hfX1jYXRjaHt9fXJldHVybiBudWxsfTtsZXQgYz1udWxsLHk9bnVsbDt0cnl7eT1oKGUpO2NvbnN0IHU9YXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoIlNIQS0yNTYiLGYuZW5jb2RlKHQpKTtjPWF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCJyYXciLHUscywhMSxbImRlY3J5cHQiXSl9Y2F0Y2h7cmV0dXJue3Byb21pc2U6UHJvbWlzZS5yZWplY3QoKSxjb250cm9sbGVyOm99fXJldHVybntwcm9taXNlOmwoKSxjb250cm9sbGVyOm99fWxldCBpO29ubWVzc2FnZT1hc3luYyBlPT57Y29uc3R7dHlwZTp0LHBheWxvYWQ6cixzdGFydDpuLG1heDpzfT1lLmRhdGE7bGV0IG89bnVsbDtpZih0PT09ImFib3J0IilpPT1udWxsfHxpLmFib3J0KCksaT12b2lkIDA7ZWxzZSBpZih0PT09IndvcmsiKXtpZigib2JmdXNjYXRlZCJpbiByKXtjb25zdHtrZXk6YSxvYmZ1c2NhdGVkOmx9PXJ8fHt9O289YXdhaXQgbShsLGEscyxuKX1lbHNle2NvbnN0e2FsZ29yaXRobTphLGNoYWxsZW5nZTpsLHNhbHQ6Y309cnx8e307bz1iKGwsYyxhLHMsbil9aT1vLmNvbnRyb2xsZXIsby5wcm9taXNlLnRoZW4oYT0+e3NlbGYucG9zdE1lc3NhZ2UoYSYmey4uLmEsd29ya2VyOiEwfSl9KX19fSkoKTsK"
    , Wu = e => Uint8Array.from(atob(e), t => t.charCodeAt(0))
    , Yr = typeof self < "u" && self.Blob && new Blob([Wu(pa)],{
        type: "text/javascript;charset=utf-8"
    });
    function Xu(e) {
        let t;
        try {
            if (t = Yr && (self.URL || self.webkitURL).createObjectURL(Yr),
                !t)
                throw "";
            const i = new Worker(t,{
                name: e == null ? void 0 : e.name
            });
            return i.addEventListener("error", () => {
                (self.URL || self.webkitURL).revokeObjectURL(t)
            }
                                     ),
                i
        } catch {
            return new Worker("data:text/javascript;base64," + pa,{
                name: e == null ? void 0 : e.name
            })
        } finally {
            t && (self.URL || self.webkitURL).revokeObjectURL(t)
        }
    }
    function vn() {}
    function qu(e, t) {
        for (const i in t)
            e[i] = t[i];
        return e
    }
    function ma(e) {
        return e()
    }
    function Kr() {
        return Object.create(null)
    }
    function Ji(e) {
        e.forEach(ma)
    }
    function ga(e) {
        return typeof e == "function"
    }
    function Gu(e, t) {
        return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function"
    }
    function Yu(e) {
        return Object.keys(e).length === 0
    }
    function Ku(e, t, i, n) {
        if (e) {
            const s = ya(e, t, i, n);
            return e[0](s)
        }
    }
    function ya(e, t, i, n) {
        return e[1] && n ? qu(i.ctx.slice(), e[1](n(t))) : i.ctx
    }
    function Zu(e, t, i, n) {
        if (e[2] && n) {
            const s = e[2](n(i));
            if (t.dirty === void 0)
                return s;
            if (typeof s == "object") {
                const r = []
                , o = Math.max(t.dirty.length, s.length);
                for (let l = 0; l < o; l += 1)
                    r[l] = t.dirty[l] | s[l];
                return r
            }
            return t.dirty | s
        }
        return t.dirty
    }
    function Ju(e, t, i, n, s, r) {
        if (s) {
            const o = ya(t, i, n, r);
            e.p(o, s)
        }
    }
    function Qu(e) {
        if (e.ctx.length > 32) {
            const t = []
            , i = e.ctx.length / 32;
            for (let n = 0; n < i; n++)
                t[n] = -1;
            return t
        }
        return -1
    }
    function we(e, t) {
        e.appendChild(t)
    }
    function ju(e, t, i) {
        const n = ef(e);
        if (!n.getElementById(t)) {
            const s = Me("style");
            s.id = t,
                s.textContent = i,
                tf(n, s)
        }
    }
    function ef(e) {
        if (!e)
            return document;
        const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
        return t && t.host ? t : e.ownerDocument
    }
    function tf(e, t) {
        return we(e.head || e, t),
            t.sheet
    }
    function He(e, t, i) {
        e.insertBefore(t, i || null)
    }
    function _e(e) {
        e.parentNode && e.parentNode.removeChild(e)
    }
    function Me(e) {
        return document.createElement(e)
    }
    function ht(e) {
        return document.createElementNS("http://www.w3.org/2000/svg", e)
    }
    function nf(e) {
        return document.createTextNode(e)
    }
    function rt() {
        return nf(" ")
    }
    function ls(e, t, i, n) {
        return e.addEventListener(t, i, n),
            () => e.removeEventListener(t, i, n)
    }
    function H(e, t, i) {
        i == null ? e.removeAttribute(t) : e.getAttribute(t) !== i && e.setAttribute(t, i)
    }
    function sf(e) {
        return Array.from(e.childNodes)
    }
    function Zr(e, t, i) {
        e.classList.toggle(t, !!i)
    }
    function rf(e, t, {bubbles: i=!1, cancelable: n=!1}={}) {
        return new CustomEvent(e,{
            detail: t,
            bubbles: i,
            cancelable: n
        })
    }
    function of(e) {
        const t = {};
        return e.childNodes.forEach(i => {
            t[i.slot || "default"] = !0
        }
                                   ),
            t
    }
    let Xi;
    function zi(e) {
        Xi = e
    }
    function ir() {
        if (!Xi)
            throw new Error("Function called outside component initialization");
        return Xi
    }
    function af(e) {
        ir().$$.on_mount.push(e)
    }
    function lf(e) {
        ir().$$.on_destroy.push(e)
    }
    function cf() {
        const e = ir();
        return (t, i, {cancelable: n=!1}={}) => {
            const s = e.$$.callbacks[t];
            if (s) {
                const r = rf(t, i, {
                    cancelable: n
                });
                return s.slice().forEach(o => {
                    o.call(e, r)
                }
                                        ),
                    !r.defaultPrevented
            }
            return !0
        }
    }
    const Qt = []
    , kn = [];
    let ci = [];
    const Jr = []
    , wa = Promise.resolve();
    let $s = !1;
    function va() {
        $s || ($s = !0,
               wa.then(ce))
    }
    function hf() {
        return va(),
            wa
    }
    function Rs(e) {
        ci.push(e)
    }
    const cs = new Set;
    let Xt = 0;
    function ce() {
        if (Xt !== 0)
            return;
        const e = Xi;
        do {
            try {
                for (; Xt < Qt.length; ) {
                    const t = Qt[Xt];
                    Xt++,
                        zi(t),
                        uf(t.$$)
                }
            } catch (t) {
                throw Qt.length = 0,
                    Xt = 0,
                    t
            }
            for (zi(null),
                 Qt.length = 0,
                 Xt = 0; kn.length; )
                kn.pop()();
            for (let t = 0; t < ci.length; t += 1) {
                const i = ci[t];
                cs.has(i) || (cs.add(i),
                              i())
            }
            ci.length = 0
        } while (Qt.length);
        for (; Jr.length; )
            Jr.pop()();
        $s = !1,
            cs.clear(),
            zi(e)
    }
    function uf(e) {
        if (e.fragment !== null) {
            e.update(),
                Ji(e.before_update);
            const t = e.dirty;
            e.dirty = [-1],
                e.fragment && e.fragment.p(e.ctx, t),
                e.after_update.forEach(Rs)
        }
    }
    function ff(e) {
        const t = []
        , i = [];
        ci.forEach(n => e.indexOf(n) === -1 ? t.push(n) : i.push(n)),
            i.forEach(n => n()),
            ci = t
    }
    const un = new Set;
    let df;
    function ka(e, t) {
        e && e.i && (un.delete(e),
                     e.i(t))
    }
    function pf(e, t, i, n) {
        if (e && e.o) {
            if (un.has(e))
                return;
            un.add(e),
                df.c.push( () => {
                un.delete(e)
            }
                         ),
                e.o(t)
        }
    }
    function mf(e, t, i) {
        const {fragment: n, after_update: s} = e.$$;
        n && n.m(t, i),
            Rs( () => {
            const r = e.$$.on_mount.map(ma).filter(ga);
            e.$$.on_destroy ? e.$$.on_destroy.push(...r) : Ji(r),
                e.$$.on_mount = []
        }
              ),
            s.forEach(Rs)
    }
    function gf(e, t) {
        const i = e.$$;
        i.fragment !== null && (ff(i.after_update),
                                Ji(i.on_destroy),
                                i.fragment && i.fragment.d(t),
                                i.on_destroy = i.fragment = null,
                                i.ctx = [])
    }
    function yf(e, t) {
        e.$$.dirty[0] === -1 && (Qt.push(e),
                                 va(),
                                 e.$$.dirty.fill(0)),
            e.$$.dirty[t / 31 | 0] |= 1 << t % 31
    }
    function wf(e, t, i, n, s, r, o=null, l=[-1]) {
        const c = Xi;
        zi(e);
        const a = e.$$ = {
            fragment: null,
            ctx: [],
            props: r,
            update: vn,
            not_equal: s,
            bound: Kr(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(t.context || (c ? c.$$.context : [])),
            callbacks: Kr(),
            dirty: l,
            skip_bound: !1,
            root: t.target || c.$$.root
        };
        o && o(a.root);
        let f = !1;
        if (a.ctx = i ? i(e, t.props || {}, (d, u, ...p) => {
            const w = p.length ? p[0] : u;
            return a.ctx && s(a.ctx[d], a.ctx[d] = w) && (!a.skip_bound && a.bound[d] && a.bound[d](w),
                                                          f && yf(e, d)),
                u
        }
                         ) : [],
            a.update(),
            f = !0,
            Ji(a.before_update),
            a.fragment = n ? n(a.ctx) : !1,
            t.target) {
            if (t.hydrate) {
                const d = sf(t.target);
                a.fragment && a.fragment.l(d),
                    d.forEach(_e)
            } else
                a.fragment && a.fragment.c();
            t.intro && ka(e.$$.fragment),
                mf(e, t.target, t.anchor),
                ce()
        }
        zi(c)
    }
    let xa;
    typeof HTMLElement == "function" && (xa = class extends HTMLElement {
        constructor(e, t, i) {
            super(),
                Ge(this, "$$ctor"),
                Ge(this, "$$s"),
                Ge(this, "$$c"),
                Ge(this, "$$cn", !1),
                Ge(this, "$$d", {}),
                Ge(this, "$$r", !1),
                Ge(this, "$$p_d", {}),
                Ge(this, "$$l", {}),
                Ge(this, "$$l_u", new Map),
                this.$$ctor = e,
                this.$$s = t,
                i && this.attachShadow({
                mode: "open"
            })
        }
        addEventListener(e, t, i) {
            if (this.$$l[e] = this.$$l[e] || [],
                this.$$l[e].push(t),
                this.$$c) {
                const n = this.$$c.$on(e, t);
                this.$$l_u.set(t, n)
            }
            super.addEventListener(e, t, i)
        }
        removeEventListener(e, t, i) {
            if (super.removeEventListener(e, t, i),
                this.$$c) {
                const n = this.$$l_u.get(t);
                n && (n(),
                      this.$$l_u.delete(t))
            }
            if (this.$$l[e]) {
                const n = this.$$l[e].indexOf(t);
                n >= 0 && this.$$l[e].splice(n, 1)
            }
        }
        async connectedCallback() {
            if (this.$$cn = !0,
                !this.$$c) {
                let e = function(s) {
                    return () => {
                        let r;
                        return {
                            c: function() {
                                r = Me("slot"),
                                    s !== "default" && H(r, "name", s)
                            },
                            m: function(o, l) {
                                He(o, r, l)
                            },
                            d: function(o) {
                                o && _e(r)
                            }
                        }
                    }
                };
                if (await Promise.resolve(),
                    !this.$$cn || this.$$c)
                    return;
                const t = {}
                , i = of(this);
                for (const s of this.$$s)
                    s in i && (t[s] = [e(s)]);
                for (const s of this.attributes) {
                    const r = this.$$g_p(s.name);
                    r in this.$$d || (this.$$d[r] = fn(r, s.value, this.$$p_d, "toProp"))
                }
                for (const s in this.$$p_d)
                    !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s],
                                                               delete this[s]);
                this.$$c = new this.$$ctor({
                    target: this.shadowRoot || this,
                    props: {
                        ...this.$$d,
                        $$slots: t,
                        $$scope: {
                            ctx: []
                        }
                    }
                });
                const n = () => {
                    this.$$r = !0;
                    for (const s in this.$$p_d)
                        if (this.$$d[s] = this.$$c.$$.ctx[this.$$c.$$.props[s]],
                            this.$$p_d[s].reflect) {
                            const r = fn(s, this.$$d[s], this.$$p_d, "toAttribute");
                            r == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, r)
                        }
                    this.$$r = !1
                }
                ;
                this.$$c.$$.after_update.push(n),
                    n();
                for (const s in this.$$l)
                    for (const r of this.$$l[s]) {
                        const o = this.$$c.$on(s, r);
                        this.$$l_u.set(r, o)
                    }
                this.$$l = {}
            }
        }
        attributeChangedCallback(e, t, i) {
            var n;
            this.$$r || (e = this.$$g_p(e),
                         this.$$d[e] = fn(e, i, this.$$p_d, "toProp"),
                         (n = this.$$c) == null || n.$set({
                [e]: this.$$d[e]
            }))
        }
        disconnectedCallback() {
            this.$$cn = !1,
                Promise.resolve().then( () => {
                !this.$$cn && this.$$c && (this.$$c.$destroy(),
                                           this.$$c = void 0)
            }
                                      )
        }
        $$g_p(e) {
            return Object.keys(this.$$p_d).find(t => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e
        }
    }
                                        );
    function fn(e, t, i, n) {
        var s;
        const r = (s = i[e]) == null ? void 0 : s.type;
        if (t = r === "Boolean" && typeof t != "boolean" ? t != null : t,
            !n || !i[e])
            return t;
        if (n === "toAttribute")
            switch (r) {
                case "Object":
                case "Array":
                    return t == null ? null : JSON.stringify(t);
                case "Boolean":
                    return t ? "" : null;
                case "Number":
                    return t ?? null;
                default:
                    return t
            }
        else
            switch (r) {
                case "Object":
                case "Array":
                    return t && JSON.parse(t);
                case "Boolean":
                    return t;
                case "Number":
                    return t != null ? +t : t;
                default:
                    return t
            }
    }
    function vf(e, t, i, n, s, r) {
        let o = class extends xa {
            constructor() {
                super(e, i, s),
                    this.$$p_d = t
            }
            static get observedAttributes() {
                return Object.keys(t).map(l => (t[l].attribute || l).toLowerCase())
            }
        }
        ;
        return Object.keys(t).forEach(l => {
            Object.defineProperty(o.prototype, l, {
                get() {
                    return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l]
                },
                set(c) {
                    var a;
                    c = fn(l, c, t),
                        this.$$d[l] = c,
                        (a = this.$$c) == null || a.$set({
                        [l]: c
                    })
                }
            })
        }
                                     ),
            n.forEach(l => {
            Object.defineProperty(o.prototype, l, {
                get() {
                    var c;
                    return (c = this.$$c) == null ? void 0 : c[l]
                }
            })
        }
                     ),
            e.element = o,
            o
    }
    class kf {
        constructor() {
            Ge(this, "$$"),
                Ge(this, "$$set")
        }
        $destroy() {
            gf(this, 1),
                this.$destroy = vn
        }
        $on(t, i) {
            if (!ga(i))
                return vn;
            const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return n.push(i),
                () => {
                const s = n.indexOf(i);
                s !== -1 && n.splice(s, 1)
            }
        }
        $set(t) {
            this.$$set && !Yu(t) && (this.$$.skip_bound = !0,
                                     this.$$set(t),
                                     this.$$.skip_bound = !1)
        }
    }
    const xf = "4";
    typeof window < "u" && (window.__svelte || (window.__svelte = {
        v: new Set
    })).v.add(xf);
    const ba = new TextEncoder;
    function bf(e) {
        return [...new Uint8Array(e)].map(t => t.toString(16).padStart(2, "0")).join("")
    }
    async function Sf(e, t="SHA-256", i=1e5) {
        const n = Date.now().toString(16);
        e || (e = Math.round(Math.random() * i));
        const s = await Sa(n, e, t);
        return {
            algorithm: t,
            challenge: s,
            salt: n,
            signature: ""
        }
    }
    async function Sa(e, t, i) {
        return bf(await crypto.subtle.digest(i.toUpperCase(), ba.encode(e + t)))
    }
    function If(e, t, i="SHA-256", n=1e6, s=0) {
        const r = new AbortController
        , o = Date.now();
        return {
            promise: (async () => {
                for (let l = s; l <= n; l += 1) {
                    if (r.signal.aborted)
                        return null;
                    if (await Sa(t, l, i) === e)
                        return {
                            number: l,
                            took: Date.now() - o
                        }
                }
                return null
            }
                     )(),
            controller: r
        }
    }
    function Tf() {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        } catch {}
    }
    function Mf(e) {
        const t = atob(e)
        , i = new Uint8Array(t.length);
        for (let n = 0; n < t.length; n++)
            i[n] = t.charCodeAt(n);
        return i
    }
    function Ef(e, t=12) {
        const i = new Uint8Array(t);
        for (let n = 0; n < t; n++)
            i[n] = e % 256,
                e = Math.floor(e / 256);
        return i
    }
    async function Cf(e, t="", i=1e6, n=0) {
        const s = "AES-GCM"
        , r = new AbortController
        , o = Date.now()
        , l = async () => {
            for (let f = n; f <= i; f += 1) {
                if (r.signal.aborted || !c || !a)
                    return null;
                try {
                    const d = await crypto.subtle.decrypt({
                        name: s,
                        iv: Ef(f)
                    }, c, a);
                    if (d)
                        return {
                            clearText: new TextDecoder().decode(d),
                            took: Date.now() - o
                        }
                } catch {}
            }
            return null
        }
        ;
        let c = null
        , a = null;
        try {
            a = Mf(e);
            const f = await crypto.subtle.digest("SHA-256", ba.encode(t));
            c = await crypto.subtle.importKey("raw", f, s, !1, ["decrypt"])
        } catch {
            return {
                promise: Promise.reject(),
                controller: r
            }
        }
        return {
            promise: l(),
            controller: r
        }
    }
    var Q = (e => (e.ERROR = "error",
                   e.VERIFIED = "verified",
                   e.VERIFYING = "verifying",
                   e.UNVERIFIED = "unverified",
                   e.EXPIRED = "expired",
                   e))(Q || {});
    function Pf(e) {
        ju(e, "svelte-ddsc3z", '.altcha.svelte-ddsc3z.svelte-ddsc3z{background:var(--altcha-color-base, transparent);border:var(--altcha-border-width, 1px) solid var(--altcha-color-border, #a0a0a0);border-radius:var(--altcha-border-radius, 3px);color:var(--altcha-color-text, currentColor);display:flex;flex-direction:column;max-width:var(--altcha-max-width, 260px);position:relative;text-align:left}.altcha.svelte-ddsc3z.svelte-ddsc3z:focus-within{border-color:var(--altcha-color-border-focus, currentColor)}.altcha[data-floating].svelte-ddsc3z.svelte-ddsc3z{background:var(--altcha-color-base, white);display:none;filter:drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.2));left:-100%;position:fixed;top:-100%;width:var(--altcha-max-width, 260px);z-index:999999}.altcha[data-floating=top].svelte-ddsc3z .altcha-anchor-arrow.svelte-ddsc3z{border-bottom-color:transparent;border-top-color:var(--altcha-color-border, #a0a0a0);bottom:-12px;top:auto}.altcha[data-floating=bottom].svelte-ddsc3z.svelte-ddsc3z:focus-within::after{border-bottom-color:var(--altcha-color-border-focus, currentColor)}.altcha[data-floating=top].svelte-ddsc3z.svelte-ddsc3z:focus-within::after{border-top-color:var(--altcha-color-border-focus, currentColor)}.altcha[data-floating].svelte-ddsc3z.svelte-ddsc3z:not([data-state=unverified]){display:block}.altcha-anchor-arrow.svelte-ddsc3z.svelte-ddsc3z{border:6px solid transparent;border-bottom-color:var(--altcha-color-border, #a0a0a0);content:"";height:0;left:12px;position:absolute;top:-12px;width:0}.altcha-main.svelte-ddsc3z.svelte-ddsc3z{align-items:center;display:flex;gap:0.4rem;padding:0.7rem}.altcha-label.svelte-ddsc3z.svelte-ddsc3z{flex-grow:1}.altcha-label.svelte-ddsc3z label.svelte-ddsc3z{cursor:pointer}.altcha-logo.svelte-ddsc3z.svelte-ddsc3z{color:currentColor;opacity:0.3}.altcha-logo.svelte-ddsc3z.svelte-ddsc3z:hover{opacity:1}.altcha-error.svelte-ddsc3z.svelte-ddsc3z{color:var(--altcha-color-error-text, #f23939);display:flex;font-size:0.85rem;gap:0.3rem;padding:0 0.7rem 0.7rem}.altcha-footer.svelte-ddsc3z.svelte-ddsc3z{align-items:center;background-color:var(--altcha-color-footer-bg, transparent);display:flex;font-size:0.75rem;opacity:0.4;padding:0.2rem 0.7rem;text-align:right}.altcha-footer.svelte-ddsc3z.svelte-ddsc3z:hover{opacity:1}.altcha-footer.svelte-ddsc3z>.svelte-ddsc3z:first-child{flex-grow:1}.altcha-footer.svelte-ddsc3z a{color:currentColor}.altcha-checkbox.svelte-ddsc3z.svelte-ddsc3z{display:flex;align-items:center;height:24px;width:24px}.altcha-checkbox.svelte-ddsc3z input.svelte-ddsc3z{width:18px;height:18px;margin:0}.altcha-hidden.svelte-ddsc3z.svelte-ddsc3z{display:none}.altcha-spinner.svelte-ddsc3z.svelte-ddsc3z{animation:svelte-ddsc3z-altcha-spinner 0.75s infinite linear;transform-origin:center}@keyframes svelte-ddsc3z-altcha-spinner{100%{transform:rotate(360deg)}}')
    }
    function Qr(e) {
        let t, i, n;
        return {
            c() {
                t = ht("svg"),
                    i = ht("path"),
                    n = ht("path"),
                    H(i, "d", "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"),
                    H(i, "fill", "currentColor"),
                    H(i, "opacity", ".25"),
                    H(n, "d", "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"),
                    H(n, "fill", "currentColor"),
                    H(n, "class", "altcha-spinner svelte-ddsc3z"),
                    H(t, "width", "24"),
                    H(t, "height", "24"),
                    H(t, "viewBox", "0 0 24 24"),
                    H(t, "xmlns", "http://www.w3.org/2000/svg")
            },
            m(s, r) {
                He(s, t, r),
                    we(t, i),
                    we(t, n)
            },
            d(s) {
                s && _e(t)
            }
        }
    }
    function $f(e) {
        let t, i = e[11].label + "", n;
        return {
            c() {
                t = Me("label"),
                    H(t, "for", n = e[4] + "_checkbox"),
                    H(t, "class", "svelte-ddsc3z")
            },
            m(s, r) {
                He(s, t, r),
                    t.innerHTML = i
            },
            p(s, r) {
                r[0] & 2048 && i !== (i = s[11].label + "") && (t.innerHTML = i),
                    r[0] & 16 && n !== (n = s[4] + "_checkbox") && H(t, "for", n)
            },
            d(s) {
                s && _e(t)
            }
        }
    }
    function Rf(e) {
        let t, i = e[11].verifying + "";
        return {
            c() {
                t = Me("span")
            },
            m(n, s) {
                He(n, t, s),
                    t.innerHTML = i
            },
            p(n, s) {
                s[0] & 2048 && i !== (i = n[11].verifying + "") && (t.innerHTML = i)
            },
            d(n) {
                n && _e(t)
            }
        }
    }
    function Af(e) {
        let t, i = e[11].verified + "", n, s;
        return {
            c() {
                t = Me("span"),
                    n = rt(),
                    s = Me("input"),
                    H(s, "type", "hidden"),
                    H(s, "name", e[4]),
                    s.value = e[6]
            },
            m(r, o) {
                He(r, t, o),
                    t.innerHTML = i,
                    He(r, n, o),
                    He(r, s, o)
            },
            p(r, o) {
                o[0] & 2048 && i !== (i = r[11].verified + "") && (t.innerHTML = i),
                    o[0] & 16 && H(s, "name", r[4]),
                    o[0] & 64 && (s.value = r[6])
            },
            d(r) {
                r && (_e(t),
                      _e(n),
                      _e(s))
            }
        }
    }
    function jr(e) {
        let t, i, n, s, r, o, l;
        return {
            c() {
                t = Me("div"),
                    i = Me("a"),
                    n = ht("svg"),
                    s = ht("path"),
                    r = ht("path"),
                    o = ht("path"),
                    H(s, "d", "M2.33955 16.4279C5.88954 20.6586 12.1971 21.2105 16.4279 17.6604C18.4699 15.947 19.6548 13.5911 19.9352 11.1365L17.9886 10.4279C17.8738 12.5624 16.909 14.6459 15.1423 16.1284C11.7577 18.9684 6.71167 18.5269 3.87164 15.1423C1.03163 11.7577 1.4731 6.71166 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577C16.9767 5.86872 17.5322 7.02798 17.804 8.2324L19.9522 9.01429C19.7622 7.07737 19.0059 5.17558 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956C-0.658625 5.88958 -1.21046 12.1971 2.33955 16.4279Z"),
                    H(s, "fill", "currentColor"),
                    H(r, "d", "M3.57212 2.33956C1.65755 3.94607 0.496389 6.11731 0.12782 8.40523L2.04639 9.13961C2.26047 7.15832 3.21057 5.25375 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577L13.8302 6.78606L19.9633 9.13364C19.7929 7.15555 19.0335 5.20847 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956Z"),
                    H(r, "fill", "currentColor"),
                    H(o, "d", "M7 10H5C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10H13C13 11.6569 11.6569 13 10 13C8.3431 13 7 11.6569 7 10Z"),
                    H(o, "fill", "currentColor"),
                    H(n, "width", "22"),
                    H(n, "height", "22"),
                    H(n, "viewBox", "0 0 20 20"),
                    H(n, "fill", "none"),
                    H(n, "xmlns", "http://www.w3.org/2000/svg"),
                    H(i, "href", Ia),
                    H(i, "target", "_blank"),
                    H(i, "class", "altcha-logo svelte-ddsc3z"),
                    H(i, "aria-label", l = e[11].ariaLinkLabel)
            },
            m(c, a) {
                He(c, t, a),
                    we(t, i),
                    we(i, n),
                    we(n, s),
                    we(n, r),
                    we(n, o)
            },
            p(c, a) {
                a[0] & 2048 && l !== (l = c[11].ariaLinkLabel) && H(i, "aria-label", l)
            },
            d(c) {
                c && _e(t)
            }
        }
    }
    function eo(e) {
        let t, i, n, s;
        function r(c, a) {
            return c[7] === Q.EXPIRED ? Of : Df
        }
        let o = r(e)
        , l = o(e);
        return {
            c() {
                t = Me("div"),
                    i = ht("svg"),
                    n = ht("path"),
                    s = rt(),
                    l.c(),
                    H(n, "stroke-linecap", "round"),
                    H(n, "stroke-linejoin", "round"),
                    H(n, "d", "M6 18L18 6M6 6l12 12"),
                    H(i, "width", "14"),
                    H(i, "height", "14"),
                    H(i, "xmlns", "http://www.w3.org/2000/svg"),
                    H(i, "fill", "none"),
                    H(i, "viewBox", "0 0 24 24"),
                    H(i, "stroke-width", "1.5"),
                    H(i, "stroke", "currentColor"),
                    H(t, "class", "altcha-error svelte-ddsc3z")
            },
            m(c, a) {
                He(c, t, a),
                    we(t, i),
                    we(i, n),
                    we(t, s),
                    l.m(t, null)
            },
            p(c, a) {
                o === (o = r(c)) && l ? l.p(c, a) : (l.d(1),
                                                     l = o(c),
                                                     l && (l.c(),
                                                           l.m(t, null)))
            },
            d(c) {
                c && _e(t),
                    l.d()
            }
        }
    }
    function Df(e) {
        let t, i = e[11].error + "";
        return {
            c() {
                t = Me("div"),
                    H(t, "title", e[5])
            },
            m(n, s) {
                He(n, t, s),
                    t.innerHTML = i
            },
            p(n, s) {
                s[0] & 2048 && i !== (i = n[11].error + "") && (t.innerHTML = i),
                    s[0] & 32 && H(t, "title", n[5])
            },
            d(n) {
                n && _e(t)
            }
        }
    }
    function Of(e) {
        let t, i = e[11].expired + "";
        return {
            c() {
                t = Me("div"),
                    H(t, "title", e[5])
            },
            m(n, s) {
                He(n, t, s),
                    t.innerHTML = i
            },
            p(n, s) {
                s[0] & 2048 && i !== (i = n[11].expired + "") && (t.innerHTML = i),
                    s[0] & 32 && H(t, "title", n[5])
            },
            d(n) {
                n && _e(t)
            }
        }
    }
    function to(e) {
        let t, i, n = e[11].footer + "";
        return {
            c() {
                t = Me("div"),
                    i = Me("div"),
                    H(i, "class", "svelte-ddsc3z"),
                    H(t, "class", "altcha-footer svelte-ddsc3z")
            },
            m(s, r) {
                He(s, t, r),
                    we(t, i),
                    i.innerHTML = n
            },
            p(s, r) {
                r[0] & 2048 && n !== (n = s[11].footer + "") && (i.innerHTML = n)
            },
            d(s) {
                s && _e(t)
            }
        }
    }
    function io(e) {
        let t;
        return {
            c() {
                t = Me("div"),
                    H(t, "class", "altcha-anchor-arrow svelte-ddsc3z")
            },
            m(i, n) {
                He(i, t, n),
                    e[48](t)
            },
            p: vn,
            d(i) {
                i && _e(t),
                    e[48](null)
            }
        }
    }
    function _f(e) {
        let t, i, n, s, r, o, l, c, a, f, d, u, p, w, x, b, $;
        const v = e[46].default
        , S = Ku(v, e, e[45], null);
        let R = e[7] === Q.VERIFYING && Qr();
        function G(D, z) {
            return D[7] === Q.VERIFIED ? Af : D[7] === Q.VERIFYING ? Rf : $f
        }
        let X = G(e)
        , W = X(e)
        , M = (e[3] !== !0 || e[12]) && jr(e)
        , V = (e[5] || e[7] === Q.EXPIRED) && eo(e)
        , F = e[11].footer && (e[2] !== !0 || e[12]) && to(e)
        , _ = e[1] && io(e);
        return {
            c() {
                S && S.c(),
                    t = rt(),
                    i = Me("div"),
                    n = Me("div"),
                    R && R.c(),
                    s = rt(),
                    r = Me("div"),
                    o = Me("input"),
                    a = rt(),
                    f = Me("div"),
                    W.c(),
                    d = rt(),
                    M && M.c(),
                    u = rt(),
                    V && V.c(),
                    p = rt(),
                    F && F.c(),
                    w = rt(),
                    _ && _.c(),
                    H(o, "type", "checkbox"),
                    H(o, "id", l = e[4] + "_checkbox"),
                    o.required = c = e[0] !== "onsubmit" && (!e[1] || e[0] !== "off"),
                    H(o, "class", "svelte-ddsc3z"),
                    H(r, "class", "altcha-checkbox svelte-ddsc3z"),
                    Zr(r, "altcha-hidden", e[7] === Q.VERIFYING),
                    H(f, "class", "altcha-label svelte-ddsc3z"),
                    H(n, "class", "altcha-main svelte-ddsc3z"),
                    H(i, "class", "altcha svelte-ddsc3z"),
                    H(i, "data-state", e[7]),
                    H(i, "data-floating", e[1])
            },
            m(D, z) {
                S && S.m(D, z),
                    He(D, t, z),
                    He(D, i, z),
                    we(i, n),
                    R && R.m(n, null),
                    we(n, s),
                    we(n, r),
                    we(r, o),
                    o.checked = e[8],
                    we(n, a),
                    we(n, f),
                    W.m(f, null),
                    we(n, d),
                    M && M.m(n, null),
                    we(i, u),
                    V && V.m(i, null),
                    we(i, p),
                    F && F.m(i, null),
                    we(i, w),
                    _ && _.m(i, null),
                    e[49](i),
                    x = !0,
                    b || ($ = [ls(o, "change", e[47]), ls(o, "change", e[13]), ls(o, "invalid", e[14])],
                          b = !0)
            },
            p(D, z) {
                S && S.p && (!x || z[1] & 16384) && Ju(S, v, D, D[45], x ? Zu(v, D[45], z, null) : Qu(D[45]), null),
                    D[7] === Q.VERIFYING ? R || (R = Qr(),
                                                 R.c(),
                                                 R.m(n, s)) : R && (R.d(1),
                                                                    R = null),
                    (!x || z[0] & 16 && l !== (l = D[4] + "_checkbox")) && H(o, "id", l),
                    (!x || z[0] & 3 && c !== (c = D[0] !== "onsubmit" && (!D[1] || D[0] !== "off"))) && (o.required = c),
                    z[0] & 256 && (o.checked = D[8]),
                    (!x || z[0] & 128) && Zr(r, "altcha-hidden", D[7] === Q.VERIFYING),
                    X === (X = G(D)) && W ? W.p(D, z) : (W.d(1),
                                                         W = X(D),
                                                         W && (W.c(),
                                                               W.m(f, null))),
                    D[3] !== !0 || D[12] ? M ? M.p(D, z) : (M = jr(D),
                                                            M.c(),
                                                            M.m(n, null)) : M && (M.d(1),
                                                                                  M = null),
                    D[5] || D[7] === Q.EXPIRED ? V ? V.p(D, z) : (V = eo(D),
                                                                  V.c(),
                                                                  V.m(i, p)) : V && (V.d(1),
                                                                                     V = null),
                    D[11].footer && (D[2] !== !0 || D[12]) ? F ? F.p(D, z) : (F = to(D),
                                                                              F.c(),
                                                                              F.m(i, w)) : F && (F.d(1),
                                                                                                 F = null),
                    D[1] ? _ ? _.p(D, z) : (_ = io(D),
                                            _.c(),
                                            _.m(i, null)) : _ && (_.d(1),
                                                                  _ = null),
                    (!x || z[0] & 128) && H(i, "data-state", D[7]),
                    (!x || z[0] & 2) && H(i, "data-floating", D[1])
            },
            i(D) {
                x || (ka(S, D),
                      x = !0)
            },
            o(D) {
                pf(S, D),
                    x = !1
            },
            d(D) {
                D && (_e(t),
                      _e(i)),
                    S && S.d(D),
                    R && R.d(),
                    W.d(),
                    M && M.d(),
                    V && V.d(),
                    F && F.d(),
                    _ && _.d(),
                    e[49](null),
                    b = !1,
                    Ji($)
            }
        }
    }
    const no = "Visit Altcha.org"
    , Ia = "https://altcha.org/";
    function so(e) {
        return JSON.parse(e)
    }
    function zf(e, t, i) {
        var n, s;
        let r, o, l, c, {$$slots: a={}, $$scope: f} = t, {auto: d=void 0} = t, {blockspam: u=void 0} = t, {challengeurl: p=void 0} = t, {challengejson: w=void 0} = t, {debug: x=!1} = t, {delay: b=0} = t, {expire: $=void 0} = t, {floating: v=void 0} = t, {floatinganchor: S=void 0} = t, {floatingoffset: R=void 0} = t, {hidefooter: G=!1} = t, {hidelogo: X=!1} = t, {name: W="altcha"} = t, {maxnumber: M=1e6} = t, {mockerror: V=!1} = t, {obfuscated: F=void 0} = t, {plugins: _=void 0} = t, {refetchonexpire: D=!0} = t, {spamfilter: z=!1} = t, {strings: N=void 0} = t, {test: Y=!1} = t, {verifyurl: K=void 0} = t, {workers: ie=Math.min(16, navigator.hardwareConcurrency || 8)} = t, {workerurl: ae=void 0} = t;
        const J = cf()
        , Se = ["SHA-256", "SHA-384", "SHA-512"]
        , zt = (s = (n = document.documentElement.lang) == null ? void 0 : n.split("-")) == null ? void 0 : s[0];
        let Ve = !1, te, Be = null, pt = null, ne = null, mt = null, Ne = null, it = null, Ze = [], se = Q.UNVERIFIED;
        lf( () => {
            mi(),
                ne && (ne.removeEventListener("submit", Z),
                       ne.removeEventListener("reset", U),
                       ne.removeEventListener("focusin", q),
                       ne = null),
                Ne && (clearTimeout(Ne),
                       Ne = null),
                document.removeEventListener("click", I),
                document.removeEventListener("scroll", E),
                window.removeEventListener("resize", Ce)
        }
          ),
            af( () => {
            h("mounted", "1.0.6"),
                h("workers", ie),
                m(),
                h("plugins", Ze.length ? Ze.map(y => y.constructor.pluginName).join(", ") : "none"),
                Y && h("using test mode"),
                $ && be($),
                d !== void 0 && h("auto", d),
                v !== void 0 && ue(v),
                ne = te.closest("form"),
                ne && (ne.addEventListener("submit", Z, {
                capture: !0
            }),
                       ne.addEventListener("reset", U),
                       d === "onfocus" && ne.addEventListener("focusin", q)),
                d === "onload" && (F ? Mt() : yt()),
                r && (G || X) && h("Attributes hidefooter and hidelogo ignored because usage with free API Keys requires attribution."),
                requestAnimationFrame( () => {
                J("load")
            }
                                     )
        }
              );
        function pi(y, B) {
            return btoa(JSON.stringify({
                algorithm: y.algorithm,
                challenge: y.challenge,
                number: B.number,
                salt: y.salt,
                signature: y.signature,
                test: Y ? !0 : void 0,
                took: B.took
            }))
        }
        function mi() {
            for (const y of Ze)
                y.destroy()
        }
        function gi() {
            p && D && se === Q.VERIFIED ? yt() : nt(Q.EXPIRED, c.expired)
        }
        async function yi() {
            var y;
            if (V)
                throw h("mocking error"),
                    new Error("Mocked error.");
            if (o)
                return h("using provided json data"),
                    o;
            if (Y)
                return h("generating test challenge", {
                    test: Y
                }),
                    Sf(typeof Y != "boolean" ? +Y : void 0);
            {
                if (!p && ne) {
                    const le = ne.getAttribute("action");
                    le != null && le.includes("/form/") && i(15, p = le + "/altcha")
                }
                if (!p)
                    throw new Error("Attribute challengeurl not set.");
                h("fetching challenge from", p);
                const B = await fetch(p, {
                    headers: z ? {
                        "x-altcha-spam-filter": "1"
                    } : {}
                });
                if (B.status !== 200)
                    throw new Error(`Server responded with ${B.status}.`);
                const ee = B.headers.get("Expires")
                , ve = B.headers.get("X-Altcha-Config")
                , Le = await B.json()
                , wt = new URLSearchParams((y = Le.salt.split("?")) == null ? void 0 : y[1])
                , Pe = wt.get("expires") || wt.get("expire");
                if (Pe) {
                    const le = new Date(+Pe * 1e3)
                    , Xe = isNaN(le.getTime()) ? 0 : le.getTime() - Date.now();
                    Xe > 0 && be(Xe)
                }
                if (ve)
                    try {
                        const le = JSON.parse(ve);
                        le && typeof le == "object" && (le.verifyurl && (le.verifyurl = new URL(le.verifyurl,new URL(p)).toString()),
                                                        xi(le))
                    } catch (le) {
                        h("unable to configure from X-Altcha-Config", le)
                    }
                if (!$ && ee != null && ee.length) {
                    const le = Date.parse(ee);
                    if (le) {
                        const Xe = le - Date.now();
                        Xe > 0 && be(Xe)
                    }
                }
                return Le
            }
        }
        function wi(y) {
            var B;
            const ee = ne == null ? void 0 : ne.querySelector(typeof y == "string" ? `input[name="${y}"]` : 'input[type="email"]:not([data-no-spamfilter])');
            return ((B = ee == null ? void 0 : ee.value) == null ? void 0 : B.slice(ee.value.indexOf("@"))) || void 0
        }
        function Ln() {
            return z === "ipAddress" ? {
                blockedCountries: void 0,
                classifier: void 0,
                disableRules: void 0,
                email: !1,
                expectedCountries: void 0,
                expectedLanguages: void 0,
                fields: !1,
                ipAddress: void 0,
                text: void 0,
                timeZone: void 0
            } : typeof z == "object" ? z : {
                blockedCountries: void 0,
                classifier: void 0,
                disableRules: void 0,
                email: void 0,
                expectedCountries: void 0,
                expectedLanguages: void 0,
                fields: void 0,
                ipAddress: void 0,
                text: void 0,
                timeZone: void 0
            }
        }
        function Tt(y) {
            return [...(ne == null ? void 0 : ne.querySelectorAll(y != null && y.length ? y.map(B => `input[name="${B}"]`).join(", ") : 'input[type="text"]:not([data-no-spamfilter]), textarea:not([data-no-spamfilter])')) || []].reduce( (B, ee) => {
                const ve = ee.name
                , Le = ee.value;
                return ve && Le && (B[ve] = /\n/.test(Le) ? Le.replace(new RegExp("(?<!\\r)\\n","g"), `\r
`) : Le),
                    B
            }
        , {})
        }
        function m() {
            const y = _ !== void 0 ? _.split(",") : void 0;
            for (const B of globalThis.altchaPlugins)
                (!y || y.includes(B.pluginName)) && Ze.push(new B({
                    el: te,
                    clarify: Mt,
                    dispatch: J,
                    getConfiguration: gt,
                    getFloatingAnchor: Ht,
                    getState: Lt,
                    log: h,
                    reset: nt,
                    solve: re,
                    setState: st,
                    setFloatingAnchor: Ft,
                    verify: yt
                }))
        }
        function h(...y) {
            (x || y.some(B => B instanceof Error)) && console[y[0]instanceof Error ? "error" : "log"]("ALTCHA", `[name=${W}]`, ...y)
        }
        function g() {
            [Q.UNVERIFIED, Q.ERROR, Q.EXPIRED].includes(se) ? z && (ne == null ? void 0 : ne.reportValidity()) === !1 ? i(8, Ve = !1) : F ? Mt() : yt() : i(8, Ve = !0)
        }
        function I(y) {
            const B = y.target;
            v && B && !te.contains(B) && (se === Q.VERIFIED || d === "off" && se === Q.UNVERIFIED) && i(9, te.style.display = "none", te)
        }
        function E() {
            v && se !== Q.UNVERIFIED && pe()
        }
        function O(y) {
            for (const B of Ze)
                typeof B.onErrorChange == "function" && B.onErrorChange(mt)
        }
        function q(y) {
            se === Q.UNVERIFIED && yt()
        }
        function Z(y) {
            ne && d === "onsubmit" ? se === Q.UNVERIFIED ? (y.preventDefault(),
                                                            y.stopPropagation(),
                                                            yt().then( () => {
                ne == null || ne.requestSubmit()
            }
                                                                     )) : se !== Q.VERIFIED && (y.preventDefault(),
                                                                                                y.stopPropagation(),
                                                                                                se === Q.VERIFYING && j()) : ne && v && d === "off" && se === Q.UNVERIFIED && (y.preventDefault(),
        y.stopPropagation(),
        i(9, te.style.display = "block", te),
        pe())
        }
        function U() {
            nt()
        }
        function j() {
            se === Q.VERIFYING && c.waitAlert && alert(c.waitAlert)
        }
        function vi(y) {
            for (const B of Ze)
                typeof B.onStateChange == "function" && B.onStateChange(se);
            v && se !== Q.UNVERIFIED && requestAnimationFrame( () => {
                pe()
            }
                                                             ),
                i(8, Ve = se === Q.VERIFIED)
        }
        function Ce() {
            v && pe()
        }
        function pe(y=20) {
            if (te)
                if (pt || (pt = (S ? document.querySelector(S) : ne == null ? void 0 : ne.querySelector('input[type="submit"], button[type="submit"], button:not([type="button"]):not([type="reset"])')) || ne),
                    pt) {
                    const B = parseInt(R, 10) || 12
                    , ee = pt.getBoundingClientRect()
                    , ve = te.getBoundingClientRect()
                    , Le = document.documentElement.clientHeight
                    , wt = document.documentElement.clientWidth
                    , Pe = v === "auto" ? ee.bottom + ve.height + B + y > Le : v === "top"
                    , le = Math.max(y, Math.min(wt - y - ve.width, ee.left + ee.width / 2 - ve.width / 2));
                    if (Pe ? i(9, te.style.top = `${ee.top - (ve.height + B)}px`, te) : i(9, te.style.top = `${ee.bottom + B}px`, te),
                        i(9, te.style.left = `${le}px`, te),
                        te.setAttribute("data-floating", Pe ? "top" : "bottom"),
                        Be) {
                        const Xe = Be.getBoundingClientRect();
                        i(10, Be.style.left = ee.left - le + ee.width / 2 - Xe.width / 2 + "px", Be)
                    }
                } else
                    h("unable to find floating anchor element")
        }
        async function Bt(y) {
            if (!K)
                throw new Error("Attribute verifyurl not set.");
            h("requesting server verification from", K);
            const B = {
                payload: y
            };
            if (z) {
                const {blockedCountries: Le, classifier: wt, disableRules: Pe, email: le, expectedLanguages: Xe, expectedCountries: Fn, fields: bi, ipAddress: Si, text: ol, timeZone: wr} = Ln();
                B.blockedCountries = Le,
                    B.classifier = wt,
                    B.disableRules = Pe,
                    B.email = le === !1 ? void 0 : wi(le),
                    B.expectedCountries = Fn,
                    B.expectedLanguages = Xe || (zt ? [zt] : void 0),
                    B.fields = bi === !1 ? void 0 : Tt(bi),
                    B.ipAddress = Si === !1 ? void 0 : Si || "auto",
                    B.text = ol,
                    B.timeZone = wr === !1 ? void 0 : wr || Tf()
            }
            const ee = await fetch(K, {
                body: JSON.stringify(B),
                headers: {
                    "content-type": "application/json"
                },
                method: "POST"
            });
            if (ee.status !== 200)
                throw new Error(`Server responded with ${ee.status}.`);
            const ve = await ee.json();
            if (ve != null && ve.payload && i(6, it = ve.payload),
                J("serververification", ve),
                u && ve.classification === "BAD")
                throw new Error("SpamFilter returned negative classification.")
        }
        function be(y) {
            h("expire", y),
                Ne && (clearTimeout(Ne),
                       Ne = null),
                y < 1 ? gi() : Ne = setTimeout(gi, y)
        }
        function ue(y) {
            h("floating", y),
                v !== y && (i(9, te.style.left = "", te),
                            i(9, te.style.top = "", te)),
                i(1, v = y === !0 || y === "" ? "auto" : y === !1 || y === "false" ? void 0 : v),
                v ? (d || i(0, d = "onsubmit"),
                     document.addEventListener("scroll", E),
                     document.addEventListener("click", I),
                     window.addEventListener("resize", Ce)) : d === "onsubmit" && i(0, d = void 0)
        }
        function Ie(y) {
            if (!y.algorithm)
                throw new Error("Invalid challenge. Property algorithm is missing.");
            if (y.signature === void 0)
                throw new Error("Invalid challenge. Property signature is missing.");
            if (!Se.includes(y.algorithm.toUpperCase()))
                throw new Error(`Unknown algorithm value. Allowed values: ${Se.join(", ")}`);
            if (!y.challenge || y.challenge.length < 40)
                throw new Error("Challenge is too short. Min. 40 chars.");
            if (!y.salt || y.salt.length < 10)
                throw new Error("Salt is too short. Min. 10 chars.")
        }
        async function re(y) {
            let B = null;
            if ("Worker"in window) {
                try {
                    B = await ki(y, y.maxnumber)
                } catch (ee) {
                    h(ee)
                }
                if ((B == null ? void 0 : B.number) !== void 0 || "obfuscated"in y)
                    return {
                        data: y,
                        solution: B
                    }
            }
            if ("obfuscated"in y) {
                const ee = await Cf(y.obfuscated, y.key, y.maxnumber);
                return {
                    data: y,
                    solution: await ee.promise
                }
            }
            return {
                data: y,
                solution: await If(y.challenge, y.salt, y.algorithm, y.maxnumber || M).promise
            }
        }
        async function ki(y, B=typeof Y == "number" ? Y : M, ee=Math.ceil(ie)) {
            const ve = [];
            ee = Math.min(16, Math.max(1, ee));
            for (let Pe = 0; Pe < ee; Pe++)
                ve.push(altchaCreateWorker(ae));
            const Le = Math.ceil(B / ee)
            , wt = await Promise.all(ve.map( (Pe, le) => {
                const Xe = le * Le;
                return new Promise(Fn => {
                    Pe.addEventListener("message", bi => {
                        if (bi.data)
                            for (const Si of ve)
                                Si !== Pe && Si.postMessage({
                                    type: "abort"
                                });
                        Fn(bi.data)
                    }
                                       ),
                        Pe.postMessage({
                        payload: y,
                        max: Xe + Le,
                        start: Xe,
                        type: "work"
                    })
                }
                                  )
            }
                                           ));
            for (const Pe of ve)
                Pe.terminate();
            return wt.find(Pe => !!Pe) || null
        }
        async function Mt() {
            if (!F) {
                i(7, se = Q.ERROR);
                return
            }
            const y = Ze.find(B => B.constructor.pluginName === "obfuscation");
            if (!y || !("clarify"in y)) {
                i(7, se = Q.ERROR),
                    h("Plugin `obfuscation` not found. Import `altcha/plugins/obfuscation` to load it.");
                return
            }
            if ("clarify"in y && typeof y.clarify == "function")
                return y.clarify()
        }
        function xi(y) {
            y.obfuscated !== void 0 && i(24, F = y.obfuscated),
                y.auto !== void 0 && (i(0, d = y.auto),
                                      d === "onload" && (F ? Mt() : yt())),
                y.blockspam !== void 0 && i(16, u = !!y.blockspam),
                y.floatinganchor !== void 0 && i(20, S = y.floatinganchor),
                y.delay !== void 0 && i(18, b = y.delay),
                y.floatingoffset !== void 0 && i(21, R = y.floatingoffset),
                y.floating !== void 0 && ue(y.floating),
                y.expire !== void 0 && (be(y.expire),
                                        i(19, $ = y.expire)),
                y.challenge && (Ie(y.challenge),
                                o = y.challenge),
                y.challengeurl !== void 0 && i(15, p = y.challengeurl),
                y.debug !== void 0 && i(17, x = !!y.debug),
                y.hidefooter !== void 0 && i(2, G = !!y.hidefooter),
                y.hidelogo !== void 0 && i(3, X = !!y.hidelogo),
                y.maxnumber !== void 0 && i(22, M = +y.maxnumber),
                y.mockerror !== void 0 && i(23, V = !!y.mockerror),
                y.name !== void 0 && i(4, W = y.name),
                y.refetchonexpire !== void 0 && i(25, D = !!y.refetchonexpire),
                y.spamfilter !== void 0 && i(26, z = typeof y.spamfilter == "object" ? y.spamfilter : !!y.spamfilter),
                y.strings && i(44, l = y.strings),
                y.test !== void 0 && i(27, Y = typeof y.test == "number" ? y.test : !!y.test),
                y.verifyurl !== void 0 && i(28, K = y.verifyurl),
                y.workers !== void 0 && i(29, ie = +y.workers),
                y.workerurl !== void 0 && i(30, ae = y.workerurl)
        }
        function gt() {
            return {
                auto: d,
                blockspam: u,
                challengeurl: p,
                debug: x,
                delay: b,
                expire: $,
                floating: v,
                floatinganchor: S,
                floatingoffset: R,
                hidefooter: G,
                hidelogo: X,
                name: W,
                maxnumber: M,
                mockerror: V,
                obfuscated: F,
                refetchonexpire: D,
                spamfilter: z,
                strings: c,
                test: Y,
                verifyurl: K,
                workers: ie,
                workerurl: ae
            }
        }
        function Ht() {
            return pt
        }
        function fe(y) {
            return Ze.find(B => B.constructor.pluginName === y)
        }
        function Lt() {
            return se
        }
        function nt(y=Q.UNVERIFIED, B=null) {
            Ne && (clearTimeout(Ne),
                   Ne = null),
                i(8, Ve = !1),
                i(5, mt = B),
                i(6, it = null),
                i(7, se = y)
        }
        function Ft(y) {
            pt = y
        }
        function st(y, B=null) {
            i(7, se = y),
                i(5, mt = B)
        }
        async function yt() {
            return nt(Q.VERIFYING),
                await new Promise(y => setTimeout(y, b || 0)),
                yi().then(y => (Ie(y),
                                h("challenge", y),
                                re(y))).then( ({data: y, solution: B}) => {
                if (h("solution", B),
                    "challenge"in y && B && !("clearText"in B))
                    if ((B == null ? void 0 : B.number) !== void 0) {
                        if (K)
                            return Bt(pi(y, B));
                        i(6, it = pi(y, B)),
                            h("payload", it)
                    } else
                        throw h("Unable to find a solution. Ensure that the 'maxnumber' attribute is greater than the randomly generated number."),
                            new Error("Unexpected result returned.")
            }
                                            ).then( () => {
                i(7, se = Q.VERIFIED),
                    h("verified"),
                    hf().then( () => {
                    J("verified", {
                        payload: it
                    })
                }
                             )
            }
                                                  ).catch(y => {
                h(y),
                    i(7, se = Q.ERROR),
                    i(5, mt = y.message)
            }
                                                         )
        }
        function nl() {
            Ve = this.checked,
                i(8, Ve)
        }
        function sl(y) {
            kn[y ? "unshift" : "push"]( () => {
                Be = y,
                    i(10, Be)
            }
                                      )
        }
        function rl(y) {
            kn[y ? "unshift" : "push"]( () => {
                te = y,
                    i(9, te)
            }
                                      )
        }
        return e.$$set = y => {
            "auto"in y && i(0, d = y.auto),
                "blockspam"in y && i(16, u = y.blockspam),
                "challengeurl"in y && i(15, p = y.challengeurl),
                "challengejson"in y && i(31, w = y.challengejson),
                "debug"in y && i(17, x = y.debug),
                "delay"in y && i(18, b = y.delay),
                "expire"in y && i(19, $ = y.expire),
                "floating"in y && i(1, v = y.floating),
                "floatinganchor"in y && i(20, S = y.floatinganchor),
                "floatingoffset"in y && i(21, R = y.floatingoffset),
                "hidefooter"in y && i(2, G = y.hidefooter),
                "hidelogo"in y && i(3, X = y.hidelogo),
                "name"in y && i(4, W = y.name),
                "maxnumber"in y && i(22, M = y.maxnumber),
                "mockerror"in y && i(23, V = y.mockerror),
                "obfuscated"in y && i(24, F = y.obfuscated),
                "plugins"in y && i(32, _ = y.plugins),
                "refetchonexpire"in y && i(25, D = y.refetchonexpire),
                "spamfilter"in y && i(26, z = y.spamfilter),
                "strings"in y && i(33, N = y.strings),
                "test"in y && i(27, Y = y.test),
                "verifyurl"in y && i(28, K = y.verifyurl),
                "workers"in y && i(29, ie = y.workers),
                "workerurl"in y && i(30, ae = y.workerurl),
                "$$scope"in y && i(45, f = y.$$scope)
        }
            ,
                e.$$.update = () => {
                    e.$$.dirty[0] & 32768 && i(12, r = !!(p != null && p.includes(".altcha.org")) && !!(p != null && p.includes("apiKey=ckey_"))),
                        e.$$.dirty[1] & 1 && (o = w ? so(w) : void 0),
                        e.$$.dirty[1] & 4 && i(44, l = N ? so(N) : {}),
                        e.$$.dirty[1] & 8192 && i(11, c = {
                        ariaLinkLabel: no,
                        error: "Verification failed. Try again later.",
                        expired: "Verification expired. Try again.",
                        footer: `Protected by <a href="${Ia}" target="_blank" aria-label="${l.ariaLinkLabel || no}">ALTCHA</a>`,
                        label: "I'm not a robot",
                        verified: "Verified",
                        verifying: "Verifying...",
                        waitAlert: "Verifying... please wait.",
                        ...l
                    }),
                        e.$$.dirty[0] & 192 && J("statechange", {
                        payload: it,
                        state: se
                    }),
                        e.$$.dirty[0] & 32 && O(),
                        e.$$.dirty[0] & 128 && vi()
                }
                    ,
                        [d, v, G, X, W, mt, it, se, Ve, te, Be, c, r, g, j, p, u, x, b, $, S, R, M, V, F, D, z, Y, K, ie, ae, w, _, N, Mt, xi, gt, Ht, fe, Lt, nt, Ft, st, yt, l, f, a, nl, sl, rl]
    }
    class Bf extends kf {
        constructor(t) {
            super(),
                wf(this, t, zf, _f, Gu, {
                auto: 0,
                blockspam: 16,
                challengeurl: 15,
                challengejson: 31,
                debug: 17,
                delay: 18,
                expire: 19,
                floating: 1,
                floatinganchor: 20,
                floatingoffset: 21,
                hidefooter: 2,
                hidelogo: 3,
                name: 4,
                maxnumber: 22,
                mockerror: 23,
                obfuscated: 24,
                plugins: 32,
                refetchonexpire: 25,
                spamfilter: 26,
                strings: 33,
                test: 27,
                verifyurl: 28,
                workers: 29,
                workerurl: 30,
                clarify: 34,
                configure: 35,
                getConfiguration: 36,
                getFloatingAnchor: 37,
                getPlugin: 38,
                getState: 39,
                reset: 40,
                setFloatingAnchor: 41,
                setState: 42,
                verify: 43
            }, Pf, [-1, -1, -1])
        }
        get auto() {
            return this.$$.ctx[0]
        }
        set auto(t) {
            this.$$set({
                auto: t
            }),
                ce()
        }
        get blockspam() {
            return this.$$.ctx[16]
        }
        set blockspam(t) {
            this.$$set({
                blockspam: t
            }),
                ce()
        }
        get challengeurl() {
            return this.$$.ctx[15]
        }
        set challengeurl(t) {
            this.$$set({
                challengeurl: t
            }),
                ce()
        }
        get challengejson() {
            return this.$$.ctx[31]
        }
        set challengejson(t) {
            this.$$set({
                challengejson: t
            }),
                ce()
        }
        get debug() {
            return this.$$.ctx[17]
        }
        set debug(t) {
            this.$$set({
                debug: t
            }),
                ce()
        }
        get delay() {
            return this.$$.ctx[18]
        }
        set delay(t) {
            this.$$set({
                delay: t
            }),
                ce()
        }
        get expire() {
            return this.$$.ctx[19]
        }
        set expire(t) {
            this.$$set({
                expire: t
            }),
                ce()
        }
        get floating() {
            return this.$$.ctx[1]
        }
        set floating(t) {
            this.$$set({
                floating: t
            }),
                ce()
        }
        get floatinganchor() {
            return this.$$.ctx[20]
        }
        set floatinganchor(t) {
            this.$$set({
                floatinganchor: t
            }),
                ce()
        }
        get floatingoffset() {
            return this.$$.ctx[21]
        }
        set floatingoffset(t) {
            this.$$set({
                floatingoffset: t
            }),
                ce()
        }
        get hidefooter() {
            return this.$$.ctx[2]
        }
        set hidefooter(t) {
            this.$$set({
                hidefooter: t
            }),
                ce()
        }
        get hidelogo() {
            return this.$$.ctx[3]
        }
        set hidelogo(t) {
            this.$$set({
                hidelogo: t
            }),
                ce()
        }
        get name() {
            return this.$$.ctx[4]
        }
        set name(t) {
            this.$$set({
                name: t
            }),
                ce()
        }
        get maxnumber() {
            return this.$$.ctx[22]
        }
        set maxnumber(t) {
            this.$$set({
                maxnumber: t
            }),
                ce()
        }
        get mockerror() {
            return this.$$.ctx[23]
        }
        set mockerror(t) {
            this.$$set({
                mockerror: t
            }),
                ce()
        }
        get obfuscated() {
            return this.$$.ctx[24]
        }
        set obfuscated(t) {
            this.$$set({
                obfuscated: t
            }),
                ce()
        }
        get plugins() {
            return this.$$.ctx[32]
        }
        set plugins(t) {
            this.$$set({
                plugins: t
            }),
                ce()
        }
        get refetchonexpire() {
            return this.$$.ctx[25]
        }
        set refetchonexpire(t) {
            this.$$set({
                refetchonexpire: t
            }),
                ce()
        }
        get spamfilter() {
            return this.$$.ctx[26]
        }
        set spamfilter(t) {
            this.$$set({
                spamfilter: t
            }),
                ce()
        }
        get strings() {
            return this.$$.ctx[33]
        }
        set strings(t) {
            this.$$set({
                strings: t
            }),
                ce()
        }
        get test() {
            return this.$$.ctx[27]
        }
        set test(t) {
            this.$$set({
                test: t
            }),
                ce()
        }
        get verifyurl() {
            return this.$$.ctx[28]
        }
        set verifyurl(t) {
            this.$$set({
                verifyurl: t
            }),
                ce()
        }
        get workers() {
            return this.$$.ctx[29]
        }
        set workers(t) {
            this.$$set({
                workers: t
            }),
                ce()
        }
        get workerurl() {
            return this.$$.ctx[30]
        }
        set workerurl(t) {
            this.$$set({
                workerurl: t
            }),
                ce()
        }
        get clarify() {
            return this.$$.ctx[34]
        }
        get configure() {
            return this.$$.ctx[35]
        }
        get getConfiguration() {
            return this.$$.ctx[36]
        }
        get getFloatingAnchor() {
            return this.$$.ctx[37]
        }
        get getPlugin() {
            return this.$$.ctx[38]
        }
        get getState() {
            return this.$$.ctx[39]
        }
        get reset() {
            return this.$$.ctx[40]
        }
        get setFloatingAnchor() {
            return this.$$.ctx[41]
        }
        get setState() {
            return this.$$.ctx[42]
        }
        get verify() {
            return this.$$.ctx[43]
        }
    }
    window.loadedScript = !0;
    const Hf = location.hostname !== "localhost" && location.hostname !== "127.0.0.1" && !location.hostname.startsWith("192.168.")
    , Ta = location.hostname === "sandbox-dev.moomoo.io" || location.hostname === "sandbox.moomoo.io"
    , Lf = location.hostname === "dev.moomoo.io" || location.hostname === "dev2.moomoo.io"
    , As = new Ih;
    let $i, dn, pn;
    const xn = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    , Ff = !1
    , nr = xn || Ff;
    Ta ? (dn = "https://api-sandbox.moomoo.io",
          pn = "moomoo.io") : Lf ? (dn = "https://api-dev.moomoo.io",
                                    pn = "moomoo.io") : (dn = "https://api.moomoo.io",
                                                         pn = "moomoo.io");
    const Vf = !nr
    , xt = new ze(pn,443,T.maxPlayers,5,Vf);
    xt.debugLog = !1;
    const Ye = {
        animationTime: 0,
        land: null,
        lava: null,
        x: T.volcanoLocationX,
        y: T.volcanoLocationY
    };
    function Nf() {
        let e = !1;
        return function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera),
            e
    }
    const Ma = Nf();
    let bn = !1
    , Ds = !1;
    function ro() {
        !cr || Ds || (Ds = !0,
                      Hf || nr ? $i && hs("alt:" + $i) : $i ? hs("alt:" + $i) : hs())
    }
    let Os = !1;
    function hs(e) {
        xt.start(In, function(t, i, n) {
            let r = "wss" + "://" + t;
            xn && (r = "wss://localhost:3000"),
                e && (r += "?token=" + encodeURIComponent(e)),
                me.connect(r, function(o) {
                if (Os) {
                    Os = !1;
                    return
                }
                el(),
                    o ? gs(o) : (bn = !0,
                                 Pn())
            }, {
                A: jf,
                B: gs,
                C: _d,
                D: ap,
                E: lp,
                a: fp,
                G: Vd,
                H: jd,
                I: rp,
                J: sp,
                K: Wd,
                L: ep,
                M: tp,
                N: hp,
                O: up,
                P: Bd,
                Q: Ld,
                R: Hd,
                S: cp,
                T: Ya,
                U: Ga,
                V: La,
                X: ip,
                Y: np,
                Z: mp,
                g: cd,
                1: fd,
                2: ld,
                3: hd,
                4: ud,
                5: xd,
                6: Md,
                7: yd,
                8: zd,
                9: md,
                0: pp
            })
        }, function(t) {
            console.error("Vultr error:", t),
                alert(`Error:
` + t),
                gs("disconnected")
        }, xn)
    }
    function sr() {
        return me.connected
    }
    function Uf() {
        const t = prompt("party key", In);
        t && (window.onbeforeunload = void 0,
              window.location.href = "/?server=" + t)
    }
    const Wf = new Th(T)
    , Ea = Math.PI
    , Rt = Ea * 2;
    Math.lerpAngle = function(e, t, i) {
        Math.abs(t - e) > Ea && (e > t ? t += Rt : e += Rt);
        const s = t + (e - t) * i;
        return s >= 0 && s <= Rt ? s : s % Rt
    }
    ;
    CanvasRenderingContext2D.prototype.roundRect = function(e, t, i, n, s) {
        return i < 2 * s && (s = i / 2),
            n < 2 * s && (s = n / 2),
            s < 0 && (s = 0),
            this.beginPath(),
            this.moveTo(e + s, t),
            this.arcTo(e + i, t, e + i, t + n, s),
            this.arcTo(e + i, t + n, e, t + n, s),
            this.arcTo(e, t + n, e, t, s),
            this.arcTo(e, t, e + i, t, s),
            this.closePath(),
            this
    }
    ;
    let rr;
    typeof Storage < "u" && (rr = !0);
    function _n(e, t) {
        rr && localStorage.setItem(e, t)
    }
    function Bi(e) {
        return rr ? localStorage.getItem(e) : null
    }
    let Sn = Bi("moofoll");
    function Xf() {
        Sn || (Sn = !0,
               _n("moofoll", 1))
    }
    let Ca, Et, jt = 1, Fe, hi, us, oo = Date.now();
    var ut;
    let Ke;
    const Oe = []
    , oe = [];
    let tt = [];
    const Dt = []
    , ui = []
    , Pa = new Ch(Zh,ui,oe,Oe,$e,L,T,A)
    , ao = new Ph(Oe,$h,oe,L,null,T,A);
    let P, $a, k, qt = 1, fs = 0, Ra = 0, Aa = 0, ot, at, lo, or = 0;
    const ge = T.maxScreenWidth
    , ye = T.maxScreenHeight;
    let ei, ti, qi = !1;
    document.getElementById("ad-container");
    const zn = document.getElementById("mainMenu")
    , Hi = document.getElementById("enterGame")
    , ds = document.getElementById("promoImg");
    document.getElementById("partyButton");
    const ps = document.getElementById("joinPartyButton")
    , _s = document.getElementById("settingsButton")
    , co = _s.getElementsByTagName("span")[0]
    , ho = document.getElementById("allianceButton")
    , uo = document.getElementById("storeButton")
    , fo = document.getElementById("chatButton")
    , ri = document.getElementById("gameCanvas")
    , C = ri.getContext("2d");
    var qf = document.getElementById("serverBrowser");
    const zs = document.getElementById("nativeResolution")
    , ms = document.getElementById("showPing");
    document.getElementById("playMusic");
    const Gi = document.getElementById("pingDisplay")
    , po = document.getElementById("shutdownDisplay")
    , Yi = document.getElementById("menuCardHolder")
    , Li = document.getElementById("guideCard")
    , fi = document.getElementById("loadingText")
    , ar = document.getElementById("gameUI")
    , mo = document.getElementById("actionBar")
    , Gf = document.getElementById("scoreDisplay")
    , Yf = document.getElementById("foodDisplay")
    , Kf = document.getElementById("woodDisplay")
    , Zf = document.getElementById("stoneDisplay")
    , Jf = document.getElementById("killCounter")
    , go = document.getElementById("leaderboardData")
    , Ki = document.getElementById("nameInput")
    , vt = document.getElementById("itemInfoHolder")
    , yo = document.getElementById("ageText")
    , wo = document.getElementById("ageBarBody")
    , Gt = document.getElementById("upgradeHolder")
    , tn = document.getElementById("upgradeCounter")
    , We = document.getElementById("allianceMenu")
    , nn = document.getElementById("allianceHolder")
    , sn = document.getElementById("allianceManager")
    , De = document.getElementById("mapDisplay")
    , Fi = document.getElementById("diedText")
    , Qf = document.getElementById("skinColorHolder")
    , Te = De.getContext("2d");
    De.width = 300;
    De.height = 300;
    const bt = document.getElementById("storeMenu")
    , vo = document.getElementById("storeHolder")
    , Yt = document.getElementById("noticationDisplay")
    , Vi = Zo.hats
    , Ni = Zo.accessories;
    var $e = new Eh(Rh,Dt,A,T);
    const Zi = "#525252"
    , ko = "#3d3f42"
    , St = 5.5;
    T.DAY_INTERVAL / 24;
    T.DAY_INTERVAL / 2;
    function jf(e) {
        tt = e.teams
    }
    let lr = !0;
    var cr = !1;
    (!nr || xn) && (cr = !0);
    window.onblur = function() {
        lr = !1
    }
    ;
    window.onfocus = function() {
        lr = !0,
            P && P.alive && gr()
    }
    ;
    window.captchaCallbackHook = function() {
        cr = !0
    }
    ;
    window.captchaCallbackComplete && window.captchaCallbackHook();
    window.addEventListener("keydown", function(e) {
        e.keyCode == 32 && e.target == document.body && e.preventDefault()
    });
    ri.oncontextmenu = function() {
        return !1
    }
    ;
    ["touch-controls-left", "touch-controls-right", "touch-controls-fullscreen", "storeMenu"].forEach(e => {
        document.getElementById(e) && (document.getElementById(e).oncontextmenu = function(t) {
            t.preventDefault()
        }
                                      )
    }
                                                                                                     );
    function gs(e) {
        bn = !1,
            me.close(),
            hr(e)
    }
    function hr(e, t) {
        zn.style.display = "block",
            ar.style.display = "none",
            Yi.style.display = "none",
            Fi.style.display = "none",
            fi.style.display = "block",
            fi.innerHTML = e + (t ? "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>" : "")
    }
    function ed() {
        Gi.hidden = !0,
            fi.style.display = "none",
            zn.style.display = "block",
            Yi.style.display = "block",
            bd(),
            id(),
            Fd(),
            fi.style.display = "none",
            Yi.style.display = "block";
        let e = Bi("moo_name") || "";
        !e.length && FRVR.profile && (e = FRVR.profile.name(),
                                      e && (e += Math.floor(Math.random() * 90) + 9)),
            Ki.value = e || ""
    }
    function td(e) {
        var t;
        ((t = e == null ? void 0 : e.detail) == null ? void 0 : t.state) === "verified" && ($i = e.detail.payload,
                                                                                            Hi.classList.remove("disabled"))
    }
    window.addEventListener("load", () => {
        const e = document.getElementById("altcha");
        e == null || e.addEventListener("statechange", td)
    }
                           );
    let rn = !1;
    function id() {
        Hi.onclick = A.checkTrusted(function() {
            Hi.classList.contains("disabled") || (hr("Connecting..."),
                                                  sr() ? rn ? FRVR.ads.show("interstitial").catch(console.error).finally(Pn) : (Pn(),
                                                                                                                                rn = !0) : rn ? FRVR.ads.show("interstitial").catch(console.error).finally(ro) : (ro(),
        rn = !0))
        }),
            A.hookTouchEvents(Hi),
            ds && (ds.onclick = A.checkTrusted(function() {
            il("https://krunker.io/?play=SquidGame_KB")
        }),
                   A.hookTouchEvents(ds)),
            ps && (ps.onclick = A.checkTrusted(function() {
            setTimeout(function() {
                Uf()
            }, 10)
        }),
                   A.hookTouchEvents(ps)),
            _s.onclick = A.checkTrusted(function() {
            Id()
        }),
            A.hookTouchEvents(_s),
            ho.onclick = A.checkTrusted(function() {
            dd()
        }),
            A.hookTouchEvents(ho),
            uo.onclick = A.checkTrusted(function() {
            kd()
        }),
            A.hookTouchEvents(uo),
            fo.onclick = A.checkTrusted(function() {
            Va()
        }),
            A.hookTouchEvents(fo),
            De.onclick = A.checkTrusted(function() {
            Xa()
        }),
            A.hookTouchEvents(De)
    }
    let In;
    const nd = {
        view: () => {
            if (!xt.servers)
                return;
            let e = 0;
            const t = Object.keys(xt.servers).map(i => {
                const n = xt.regionInfo[i].name;
                let s = 0;
                const r = xt.servers[i].map(o => {
                    var u;
                    s += o.playerCount;
                    const l = o.selected;
                    let c = n + " " + o.name + " [" + Math.min(o.playerCount, o.playerCapacity) + "/" + o.playerCapacity + "]";
                    const a = o.name
                    , f = l ? "selected" : "";
                    o.ping && ((u = o.pings) == null ? void 0 : u.length) >= 2 ? c += ` [${Math.floor(o.ping)}ms]` : l || (c += " [?]");
                    let d = {
                        value: i + ":" + a
                    };
                    return f && (In = i + ":" + a,
                                 d.selected = !0),
                        kt("option", d, c)
                }
                                           );
                return e += s,
                    [kt("option[disabled]", `${n} - ${s} players`), r, kt("option[disabled]")]
            }
                                                 );
            return kt("select", {
                value: In,
                onfocus: () => {
                    window.blockRedraw = !0
                }
                ,
                onblur: () => {
                    window.blockRedraw = !1
                }
                ,
                onchange: od
            }, [t, kt("option[disabled]", `All Servers - ${e} players`)])
        }
    };
    kt.mount(qf, nd);
    var Bs, Hs;
    location.hostname == "sandbox.moomoo.io" ? (Bs = "Back to MooMoo",
                                                Hs = "//moomoo.io/") : (Bs = "Try the sandbox",
                                                                        Hs = "//sandbox.moomoo.io/");
    document.getElementById("altServer").innerHTML = "<a href='" + Hs + "'>" + Bs + "<i class='material-icons' style='font-size:10px;vertical-align:middle'>arrow_forward_ios</i></a>";
    const sd = `${dn}/servers?v=1.26`
    , Da = async () => fetch(sd).then(e => e.json()).then(async e => xt.processServers(e)).catch(e => {
        console.error("Failed to load server data with status code:", e)
    }
                                                                                                )
    , rd = () => Da().then(ed).catch(e => {
        console.error("Failed to load.")
    }
                                    );
    window.frvrSdkInitPromise.then( () => window.FRVR.bootstrapper.complete()).then( () => rd());
    const od = e => {
        if (window.blockRedraw = !1,
            FRVR.channelCharacteristics.allowNavigation) {
            const [t,i] = e.target.value.split(":");
            xt.switchServer(t, i)
        } else
            bn && (bn = !1,
                   Ds = !1,
                   Os = !0,
                   $n = !0,
                   me.close())
    }
    ;
    document.getElementById("pre-content-container");
    function ad() {
        FRVR.ads.show("interstitial", Pn)
    }
    window.showPreAd = ad;
    function Ue(e, t, i) {
        if (P && e) {
            if (A.removeAllChildren(vt),
                vt.classList.add("visible"),
                A.generateElement({
                id: "itemInfoName",
                text: A.capitalizeFirst(e.name),
                parent: vt
            }),
                A.generateElement({
                id: "itemInfoDesc",
                text: e.desc,
                parent: vt
            }),
                !i)
                if (t)
                    A.generateElement({
                        class: "itemInfoReq",
                        text: e.type ? "secondary" : "primary",
                        parent: vt
                    });
                else {
                    for (let s = 0; s < e.req.length; s += 2)
                        A.generateElement({
                            class: "itemInfoReq",
                            html: e.req[s] + "<span class='itemInfoReqVal'> x" + e.req[s + 1] + "</span>",
                            parent: vt
                        });
                    const n = Ta ? e.group.sandboxLimit || Math.max(e.group.limit * 3, 99) : e.group.limit;
                    e.group.limit && A.generateElement({
                        class: "itemInfoLmt",
                        text: (P.itemCounts[e.group.id] || 0) + "/" + n,
                        parent: vt
                    })
                }
        } else
            vt.classList.remove("visible")
    }
    let di = []
    , ii = [];
    function ld(e, t) {
        di.push({
            sid: e,
            name: t
        }),
            ur()
    }
    function ur() {
        if (di[0]) {
            const e = di[0];
            A.removeAllChildren(Yt),
                Yt.style.display = "block",
                A.generateElement({
                class: "notificationText",
                text: e.name,
                parent: Yt
            }),
                A.generateElement({
                class: "notifButton",
                html: "<i class='material-icons' style='font-size:28px;color:#cc5151;'>&#xE14C;</i>",
                parent: Yt,
                onclick: function() {
                    Fs(0)
                },
                hookTouch: !0
            }),
                A.generateElement({
                class: "notifButton",
                html: "<i class='material-icons' style='font-size:28px;color:#8ecc51;'>&#xE876;</i>",
                parent: Yt,
                onclick: function() {
                    Fs(1)
                },
                hookTouch: !0
            })
        } else
            Yt.style.display = "none"
    }
    function cd(e) {
        tt.push(e),
            We.style.display == "block" && Qi()
    }
    function hd(e, t) {
        P && (P.team = e,
              P.isOwner = t,
              We.style.display == "block" && Qi())
    }
    function ud(e) {
        ii = e,
            We.style.display == "block" && Qi()
    }
    function fd(e) {
        for (let t = tt.length - 1; t >= 0; t--)
            tt[t].sid == e && tt.splice(t, 1);
        We.style.display == "block" && Qi()
    }
    function dd() {
        gr(),
            We.style.display != "block" ? Qi() : Ls()
    }
    function Ls() {
        We.style.display == "block" && (We.style.display = "none")
    }
    function Qi() {
        if (P && P.alive) {
            if (Bn(),
                bt.style.display = "none",
                We.style.display = "block",
                A.removeAllChildren(nn),
                P.team)
                for (var e = 0; e < ii.length; e += 2)
                    (function(t) {
                        const i = A.generateElement({
                            class: "allianceItem",
                            style: "color:" + (ii[t] == P.sid ? "#fff" : "rgba(255,255,255,0.6)"),
                            text: ii[t + 1],
                            parent: nn
                        });
                        P.isOwner && ii[t] != P.sid && A.generateElement({
                            class: "joinAlBtn",
                            text: "Kick",
                            onclick: function() {
                                Oa(ii[t])
                            },
                            hookTouch: !0,
                            parent: i
                        })
                    }
                    )(e);
            else if (tt.length)
                for (var e = 0; e < tt.length; ++e)
                    (function(i) {
                        const n = A.generateElement({
                            class: "allianceItem",
                            style: "color:" + (tt[i].sid == P.team ? "#fff" : "rgba(255,255,255,0.6)"),
                            text: tt[i].sid,
                            parent: nn
                        });
                        A.generateElement({
                            class: "joinAlBtn",
                            text: "Join",
                            onclick: function() {
                                _a(i)
                            },
                            hookTouch: !0,
                            parent: n
                        })
                    }
                    )(e);
            else
                A.generateElement({
                    class: "allianceItem",
                    text: "No Tribes Yet",
                    parent: nn
                });
            A.removeAllChildren(sn),
                P.team ? A.generateElement({
                class: "allianceButtonM",
                style: "width: 360px",
                text: P.isOwner ? "Delete Tribe" : "Leave Tribe",
                onclick: function() {
                    za()
                },
                hookTouch: !0,
                parent: sn
            }) : (A.generateElement({
                tag: "input",
                type: "text",
                id: "allianceInput",
                maxLength: 7,
                placeholder: "unique name",
                onchange: t => {
                    t.target.value = (t.target.value || "").slice(0, 7)
                }
                ,
                onkeypress: t => {
                    if (t.key === "Enter")
                        return t.preventDefault(),
                            Vs(),
                            !1
                }
                ,
                parent: sn
            }),
                  A.generateElement({
                tag: "div",
                class: "allianceButtonM",
                style: "width: 140px;",
                text: "Create",
                onclick: function() {
                    Vs()
                },
                hookTouch: !0,
                parent: sn
            }))
        }
    }
    function Fs(e) {
        me.send("P", di[0].sid, e),
            di.splice(0, 1),
            ur()
    }
    function Oa(e) {
        me.send("Q", e)
    }
    function _a(e) {
        me.send("b", tt[e].sid)
    }
    function Vs() {
        me.send("L", document.getElementById("allianceInput").value)
    }
    function za() {
        di = [],
            ur(),
            me.send("N")
    }
    let mn, Ri, At;
    const oi = [];
    let Pt;
    function pd() {
        this.init = function(e, t) {
            this.scale = 0,
                this.x = e,
                this.y = t,
                this.active = !0
        }
            ,
            this.update = function(e, t) {
            this.active && (this.scale += .05 * t,
                            this.scale >= T.mapPingScale ? this.active = !1 : (e.globalAlpha = 1 - Math.max(0, this.scale / T.mapPingScale),
                                                                               e.beginPath(),
                                                                               e.arc(this.x / T.mapScale * De.width, this.y / T.mapScale * De.width, this.scale, 0, 2 * Math.PI),
                                                                               e.stroke()))
        }
    }
    function md(e, t) {
        for (let i = 0; i < oi.length; ++i)
            if (!oi[i].active) {
                Pt = oi[i];
                break
            }
        Pt || (Pt = new pd,
               oi.push(Pt)),
            Pt.init(e, t)
    }
    function gd() {
        At || (At = {}),
            At.x = P.x,
            At.y = P.y
    }
    function yd(e) {
        Ri = e
    }
    function wd(e) {
        if (P && P.alive) {
            Te.clearRect(0, 0, De.width, De.height),
                Te.strokeStyle = "#fff",
                Te.lineWidth = 4;
            for (var t = 0; t < oi.length; ++t)
                Pt = oi[t],
                    Pt.update(Te, e);
            if (Te.globalAlpha = 1,
                Te.fillStyle = "#fff",
                he(P.x / T.mapScale * De.width, P.y / T.mapScale * De.height, 7, Te, !0),
                Te.fillStyle = "rgba(255,255,255,0.35)",
                P.team && Ri)
                for (var t = 0; t < Ri.length; )
                    he(Ri[t] / T.mapScale * De.width, Ri[t + 1] / T.mapScale * De.height, 7, Te, !0),
                        t += 2;
            mn && (Te.fillStyle = "#fc5553",
                   Te.font = "34px Hammersmith One",
                   Te.textBaseline = "middle",
                   Te.textAlign = "center",
                   Te.fillText("x", mn.x / T.mapScale * De.width, mn.y / T.mapScale * De.height)),
                At && (Te.fillStyle = "#fff",
                       Te.font = "34px Hammersmith One",
                       Te.textBaseline = "middle",
                       Te.textAlign = "center",
                       Te.fillText("x", At.x / T.mapScale * De.width, At.y / T.mapScale * De.height))
        }
    }
    let Ns = 0;
    function vd(e) {
        Ns != e && (Ns = e,
                    fr())
    }
    function kd() {
        bt.style.display != "block" ? (bt.style.display = "block",
                                       We.style.display = "none",
                                       Bn(),
                                       fr()) : Us()
    }
    function Us() {
        bt.style.display == "block" && (bt.style.display = "none",
                                        Ue())
    }
    function xd(e, t, i) {
        i ? e ? P.tailIndex = t : P.tails[t] = 1 : e ? P.skinIndex = t : P.skins[t] = 1,
            bt.style.display == "block" && fr()
    }
    function fr() {
        if (P) {
            A.removeAllChildren(vo);
            const e = Ns
            , t = e ? Ni : Vi;
            for (let i = 0; i < t.length; ++i)
                t[i].dontSell || function(n) {
                    const s = A.generateElement({
                        id: "storeDisplay" + n,
                        class: "storeItem",
                        onmouseout: function() {
                            Ue()
                        },
                        onmouseover: function() {
                            Ue(t[n], !1, !0)
                        },
                        parent: vo
                    });
                    A.hookTouchEvents(s, !0),
                        A.generateElement({
                        tag: "img",
                        class: "hatPreview",
                        src: "./img/" + (e ? "accessories/access_" : "hats/hat_") + t[n].id + (t[n].topSprite ? "_p" : "") + ".png",
                        parent: s
                    }),
                        A.generateElement({
                        tag: "span",
                        text: t[n].name,
                        parent: s
                    }),
                        (e ? !P.tails[t[n].id] : !P.skins[t[n].id]) ? (A.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Buy",
                        onclick: function() {
                            Ba(t[n].id, e)
                        },
                        hookTouch: !0,
                        parent: s
                    }),
                                                                       A.generateElement({
                        tag: "span",
                        class: "itemPrice",
                        text: t[n].price,
                        parent: s
                    })) : (e ? P.tailIndex : P.skinIndex) == t[n].id ? A.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Unequip",
                        onclick: function() {
                            Ws(0, e)
                        },
                        hookTouch: !0,
                        parent: s
                    }) : A.generateElement({
                        class: "joinAlBtn",
                        style: "margin-top: 5px",
                        text: "Equip",
                        onclick: function() {
                            Ws(t[n].id, e)
                        },
                        hookTouch: !0,
                        parent: s
                    })
                }(i)
        }
    }
    function Ws(e, t) {
        me.send("c", 0, e, t)
    }
    function Ba(e, t) {
        me.send("c", 1, e, t)
    }
    function Ha() {
        bt.style.display = "none",
            We.style.display = "none",
            Bn()
    }
    function bd() {
        const e = Bi("native_resolution");
        ys(e ? e == "true" : typeof cordova < "u"),
            Et = Bi("show_ping") == "true",
            Gi.hidden = !Et || !qi,
            Bi("moo_moosic"),
            setInterval(function() {
            window.cordova && (document.getElementById("downloadButtonContainer").classList.add("cordova"),
                               document.getElementById("mobileDownloadButtonContainer").classList.add("cordova"))
        }, 1e3),
            Fa(),
            A.removeAllChildren(mo);
        for (var t = 0; t < L.weapons.length + L.list.length; ++t)
            (function(i) {
                A.generateElement({
                    id: "actionBarItem" + i,
                    class: "actionBarItem",
                    style: "display:none",
                    onmouseout: function() {
                        Ue()
                    },
                    parent: mo
                })
            }
            )(t);
        for (var t = 0; t < L.list.length + L.weapons.length; ++t)
            (function(n) {
                const s = document.createElement("canvas");
                s.width = s.height = 66;
                const r = s.getContext("2d");
                if (r.translate(s.width / 2, s.height / 2),
                    r.imageSmoothingEnabled = !1,
                    r.webkitImageSmoothingEnabled = !1,
                    r.mozImageSmoothingEnabled = !1,
                    L.weapons[n]) {
                    r.rotate(Math.PI / 4 + Math.PI);
                    var o = new Image;
                    Gs[L.weapons[n].src] = o,
                        o.onload = function() {
                        this.isLoaded = !0;
                        const c = 1 / (this.height / this.width)
                        , a = L.weapons[n].iPad || 1;
                        r.drawImage(this, -(s.width * a * T.iconPad * c) / 2, -(s.height * a * T.iconPad) / 2, s.width * a * c * T.iconPad, s.height * a * T.iconPad),
                            r.fillStyle = "rgba(0, 0, 70, 0.1)",
                            r.globalCompositeOperation = "source-atop",
                            r.fillRect(-s.width / 2, -s.height / 2, s.width, s.height),
                            document.getElementById("actionBarItem" + n).style.backgroundImage = "url(" + s.toDataURL() + ")"
                    }
                        ,
                        o.src = "./img/weapons/" + L.weapons[n].src + ".png";
                    var l = document.getElementById("actionBarItem" + n);
                    l.onmouseover = A.checkTrusted(function() {
                        Ue(L.weapons[n], !0)
                    }),
                        l.onclick = A.checkTrusted(function() {
                        Ui(n, !0)
                    }),
                        A.hookTouchEvents(l)
                } else {
                    var o = yr(L.list[n - L.weapons.length], !0);
                    const a = Math.min(s.width - T.iconPadding, o.width);
                    r.globalAlpha = 1,
                        r.drawImage(o, -a / 2, -a / 2, a, a),
                        r.fillStyle = "rgba(0, 0, 70, 0.1)",
                        r.globalCompositeOperation = "source-atop",
                        r.fillRect(-a / 2, -a / 2, a, a),
                        document.getElementById("actionBarItem" + n).style.backgroundImage = "url(" + s.toDataURL() + ")";
                    var l = document.getElementById("actionBarItem" + n);
                    l.onmouseover = A.checkTrusted(function() {
                        Ue(L.list[n - L.weapons.length])
                    }),
                        l.onclick = A.checkTrusted(function() {
                        Ui(n - L.weapons.length)
                    }),
                        A.hookTouchEvents(l)
                }
            }
            )(t);
        Ki.onchange = i => {
            i.target.value = (i.target.value || "").slice(0, 15)
        }
            ,
                Ki.onkeypress = i => {
                    if (i.key === "Enter")
                        return i.preventDefault(),
                            Hi.onclick(i),
                            !1
                }
                    ,
                        zs.checked = Ca,
                            zs.onchange = A.checkTrusted(function(i) {
                            ys(i.target.checked)
                        }),
                            ms.checked = Et,
                            ms.onchange = A.checkTrusted(function(i) {
                            Et = ms.checked,
                                Gi.hidden = !Et,
                                _n("show_ping", Et ? "true" : "false")
                        })
    }
    function La(e, t) {
        e && (t ? P.weapons = e : P.items = e);
        for (var i = 0; i < L.list.length; ++i) {
            const n = L.weapons.length + i;
            document.getElementById("actionBarItem" + n).style.display = P.items.indexOf(L.list[i].id) >= 0 ? "inline-block" : "none"
        }
        for (var i = 0; i < L.weapons.length; ++i)
            document.getElementById("actionBarItem" + i).style.display = P.weapons[L.weapons[i].type] == L.weapons[i].id ? "inline-block" : "none"
    }
    function ys(e) {
        Ca = e,
            jt = e && window.devicePixelRatio || 1,
            zs.checked = e,
            _n("native_resolution", e.toString()),
            dr()
    }
    function Sd() {
        ji ? Li.classList.add("touch") : Li.classList.remove("touch")
    }
    function Id() {
        Li.classList.contains("showing") ? (Li.classList.remove("showing"),
                                            co.innerText = "Settings") : (Li.classList.add("showing"),
                                                                          co.innerText = "Close")
    }
    function Fa() {
        let e = "";
        for (let t = 0; t < T.skinColors.length; ++t)
            t == or ? e += "<div class='skinColorItem activeSkin' style='background-color:" + T.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'></div>" : e += "<div class='skinColorItem' style='background-color:" + T.skinColors[t] + "' onclick='selectSkinColor(" + t + ")'></div>";
        Qf.innerHTML = e
    }
    function Td(e) {
        or = e,
            Fa()
    }
    const Ai = document.getElementById("chatBox")
    , Tn = document.getElementById("chatHolder");
    function Va() {
        ji ? setTimeout(function() {
            const e = prompt("chat message");
            e && xo(e)
        }, 1) : Tn.style.display == "block" ? (Ai.value && xo(Ai.value),
                                               Bn()) : (bt.style.display = "none",
                                                        We.style.display = "none",
                                                        Tn.style.display = "block",
                                                        Ai.focus(),
                                                        gr()),
            Ai.value = ""
    }
    function xo(e) {
        me.send("6", e.slice(0, 30))
    }
    function Bn() {
        Ai.value = "",
            Tn.style.display = "none"
    }
    function Md(e, t) {
        const i = Hn(e);
        i && (i.chatMessage = t,
              i.chatCountdown = T.chatCountdown)
    }
    window.addEventListener("resize", A.checkTrusted(dr));
    function dr() {
        ei = window.innerWidth,
            ti = window.innerHeight;
        const e = Math.max(ei / ge, ti / ye) * jt;
        ri.width = ei * jt,
            ri.height = ti * jt,
            ri.style.width = ei + "px",
            ri.style.height = ti + "px",
            C.setTransform(e, 0, 0, e, (ei * jt - ge * e) / 2, (ti * jt - ye * e) / 2)
    }
    dr();
    let ji;
    Ot(!1);
    function Ot(e) {
        ji = e,
            Sd()
    }
    window.setUsingTouch = Ot;
    let Ed = document.getElementById("leaderboardButton")
    , Na = document.getElementById("leaderboard");
    Ed.addEventListener("touchstart", () => {
        Na.classList.add("is-showing")
    }
                       );
    const pr = () => {
        Na.classList.remove("is-showing")
    }
    ;
    document.body.addEventListener("touchend", pr);
    document.body.addEventListener("touchleave", pr);
    document.body.addEventListener("touchcancel", pr);
    if (!Ma) {
        let t = function(s) {
            s.preventDefault(),
                s.stopPropagation(),
                Ot(!1),
                Ra = s.clientX,
                Aa = s.clientY
        }
        , i = function(s) {
            Ot(!1),
                Ke != 1 && (Ke = 1,
                            _t())
        }
        , n = function(s) {
            Ot(!1),
                Ke != 0 && (Ke = 0,
                            _t())
        };
        var gp = t
        , yp = i
        , wp = n;
        const e = document.getElementById("touch-controls-fullscreen");
        e.style.display = "block",
            e.addEventListener("mousemove", t, !1),
            e.addEventListener("mousedown", i, !1),
            e.addEventListener("mouseup", n, !1)
    }
    let Xs = !1, Ua;
    function Cd() {
        let e = 0, t = 0, i;
        if (ji) {
            if (!Xs)
                return;
            i = Ua
        }
        for (const n in En) {
            const s = En[n];
            e += !!ut[n] * s[0],
                t += !!ut[n] * s[1]
        }
        if ((e != 0 || t != 0) && (i = Math.atan2(t, e)),
            i !== void 0)
            return A.fixTo(i, 2)
    }
    let Mn;
    function mr() {
        return P ? (!P.lockDir && !ji && (Mn = Math.atan2(Aa - ti / 2, Ra - ei / 2)),
                    A.fixTo(Mn || 0, 2)) : 0
    }
    var ut = {}
    , En = {
        87: [0, -1],
        38: [0, -1],
        83: [0, 1],
        40: [0, 1],
        65: [-1, 0],
        37: [-1, 0],
        68: [1, 0],
        39: [1, 0]
    };
    function gr() {
        ut = {},
            me.send("e")
    }
    function Wa() {
        return We.style.display != "block" && Tn.style.display != "block"
    }
    function Pd(e) {
        const t = e.which || e.keyCode || 0;
        t == 27 ? Ha() : P && P.alive && Wa() && (ut[t] || (ut[t] = 1,
                                                            t == 69 ? Ad() : t == 67 ? gd() : t == 88 ? Rd() : P.weapons[t - 49] != null ? Ui(P.weapons[t - 49], !0) : P.items[t - 49 - P.weapons.length] != null ? Ui(P.items[t - 49 - P.weapons.length]) : t == 81 ? Ui(P.items[0]) : t == 82 ? Xa() : En[t] ? Cn() : t == 32 && (Ke = 1,
    _t())))
    }
    window.addEventListener("keydown", A.checkTrusted(Pd));
    function $d(e) {
        if (P && P.alive) {
            const t = e.which || e.keyCode || 0;
            if (t == 13) {
                if (We.style.display === "block")
                    return;
                Va()
            } else
                Wa() && ut[t] && (ut[t] = 0,
                                  En[t] ? Cn() : t == 32 && (Ke = 0,
                                                             _t()))
        }
    }
    window.addEventListener("keyup", A.checkTrusted($d));
    function _t() {
        P && P.alive && me.send("F", Ke, P.buildIndex >= 0 ? mr() : null)
    }
    let ws;
    function Cn() {
        const e = Cd();
        (ws == null || e == null || Math.abs(e - ws) > .3) && (me.send("9", e),
                                                               ws = e)
    }
    function Rd() {
        P.lockDir = P.lockDir ? 0 : 1,
            me.send("K", 0)
    }
    function Xa() {
        me.send("S", 1)
    }
    function Ad() {
        me.send("K", 1)
    }
    function Ui(e, t) {
        me.send("z", e, t)
    }
    function Pn() {
        Gi.hidden = !Et,
            window.onbeforeunload = function(e) {
            return "Are you sure?"
        }
            ,
            window.FRVR && window.FRVR.tracker.levelStart("game_start"),
            _n("moo_name", Ki.value),
            !qi && sr() && (qi = !0,
                            Wf.stop("menu"),
                            hr("Loading..."),
                            me.send("M", {
            name: Ki.value,
            moofoll: Sn,
            skin: or
        })),
            Dd()
    }
    function Dd() {
        var e = document.getElementById("ot-sdk-btn-floating");
        e && (e.style.display = "none")
    }
    function Od() {
        var e = document.getElementById("ot-sdk-btn-floating");
        e && (e.style.display = "block")
    }
    let $n = !0
    , vs = !1;
    function _d(e) {
        fi.style.display = "none",
            Yi.style.display = "block",
            zn.style.display = "none",
            ut = {},
            $a = e,
            Ke = 0,
            qi = !0,
            $n && ($n = !1,
                   Dt.length = 0),
            Ma && Vu.enable({
            onStartMoving: () => {
                Us(),
                    Ls(),
                    Ot(!0),
                    Xs = !0
            }
            ,
            onStopMoving: () => {
                Xs = !1,
                    Cn()
            }
            ,
            onRotateMoving: (t, i) => {
                i.force < .25 || (Ua = -i.angle.radian,
                                  Cn(),
                                  vs || (Mn = -i.angle.radian))
            }
            ,
            onStartAttacking: () => {
                Us(),
                    Ls(),
                    Ot(!0),
                    vs = !0,
                    P.buildIndex < 0 && (Ke = 1,
                                         _t())
            }
            ,
            onStopAttacking: () => {
                P.buildIndex >= 0 && (Ke = 1,
                                      _t()),
                    Ke = 0,
                    _t(),
                    vs = !1
            }
            ,
            onRotateAttacking: (t, i) => {
                i.force < .25 || (Mn = -i.angle.radian)
            }
        })
    }
    function zd(e, t, i, n) {
        n === -1 ? As.showText(e, t, 50, .18, 500, i, "#ee5551") : As.showText(e, t, 50, .18, 500, Math.abs(i), i >= 0 ? "#fff" : "#8ecc51")
    }
    let gn = 99999;
    function Bd() {
        qi = !1,
            Od();
        try {
            factorem.refreshAds([2], !0)
        } catch {}
        ar.style.display = "none",
            Ha(),
            mn = {
            x: P.x,
            y: P.y
        },
            fi.style.display = "none",
            Fi.style.display = "block",
            Fi.style.fontSize = "0px",
            gn = 0,
            setTimeout(function() {
            Yi.style.display = "block",
                zn.style.display = "block",
                Fi.style.display = "none"
        }, T.deathFadeout),
            Da()
    }
    function Hd(e) {
        P && $e.removeAllItems(e)
    }
    function Ld(e) {
        $e.disableBySid(e)
    }
    function qa() {
        Gf.innerText = P.points,
            Yf.innerText = P.food,
            Kf.innerText = P.wood,
            Zf.innerText = P.stone,
            Jf.innerText = P.kills
    }
    const Di = {}
    , ks = ["crown", "skull"];
    function Fd() {
        for (let e = 0; e < ks.length; ++e) {
            const t = new Image;
            t.onload = function() {
                this.isLoaded = !0
            }
                ,
                t.src = "./img/icons/" + ks[e] + ".png",
                Di[ks[e]] = t
        }
    }
    const Kt = [];
    function Ga(e, t) {
        if (P.upgradePoints = e,
            P.upgrAge = t,
            e > 0) {
            Kt.length = 0,
                A.removeAllChildren(Gt);
            for (var i = 0; i < L.weapons.length; ++i)
                if (L.weapons[i].age == t && (L.weapons[i].pre == null || P.weapons.indexOf(L.weapons[i].pre) >= 0)) {
                    var n = A.generateElement({
                        id: "upgradeItem" + i,
                        class: "actionBarItem",
                        onmouseout: function() {
                            Ue()
                        },
                        parent: Gt
                    });
                    n.style.backgroundImage = document.getElementById("actionBarItem" + i).style.backgroundImage,
                        Kt.push(i)
                }
            for (var i = 0; i < L.list.length; ++i)
                if (L.list[i].age == t && (L.list[i].pre == null || P.items.indexOf(L.list[i].pre) >= 0)) {
                    const r = L.weapons.length + i;
                    var n = A.generateElement({
                        id: "upgradeItem" + r,
                        class: "actionBarItem",
                        onmouseout: function() {
                            Ue()
                        },
                        parent: Gt
                    });
                    n.style.backgroundImage = document.getElementById("actionBarItem" + r).style.backgroundImage,
                        Kt.push(r)
                }
            for (var i = 0; i < Kt.length; i++)
                (function(r) {
                    const o = document.getElementById("upgradeItem" + r);
                    o.onmouseover = function() {
                        L.weapons[r] ? Ue(L.weapons[r], !0) : Ue(L.list[r - L.weapons.length])
                    }
                        ,
                        o.onclick = A.checkTrusted(function() {
                        me.send("H", r)
                    }),
                        A.hookTouchEvents(o)
                }
                )(Kt[i]);
            Kt.length ? (Gt.style.display = "block",
                         tn.style.display = "block",
                         tn.innerHTML = "SELECT ITEMS (" + e + ")") : (Gt.style.display = "none",
                                                                       tn.style.display = "none",
                                                                       Ue())
        } else
            Gt.style.display = "none",
                tn.style.display = "none",
                Ue()
    }
    function Ya(e, t, i) {
        e != null && (P.XP = e),
            t != null && (P.maxXP = t),
            i != null && (P.age = i),
            i == T.maxAge ? (yo.innerHTML = "MAX AGE",
                             wo.style.width = "100%") : (yo.innerHTML = "AGE " + P.age,
                                                         wo.style.width = P.XP / P.maxXP * 100 + "%")
    }
    function Vd(e) {
        A.removeAllChildren(go);
        let t = 1;
        for (let i = 0; i < e.length; i += 3)
            (function(n) {
                A.generateElement({
                    class: "leaderHolder",
                    parent: go,
                    children: [A.generateElement({
                        class: "leaderboardItem",
                        style: "color:" + (e[n] == $a ? "#fff" : "rgba(255,255,255,0.6)"),
                        text: t + ". " + (e[n + 1] != "" ? e[n + 1] : "unknown")
                    }), A.generateElement({
                        class: "leaderScore",
                        text: A.kFormat(e[n + 2]) || "0"
                    })]
                })
            }
            )(i),
                t++
    }
    let bo = null;
    function Nd() {
        {
            if (P && (!us || hi - us >= 1e3 / T.clientSendRate)) {
                us = hi;
                const a = mr();
                bo !== a && (bo = a,
                             me.send("D", a))
            }
            if (gn < 120 && (gn += .1 * Fe,
                             Fi.style.fontSize = Math.min(Math.round(gn), 120) + "px"),
                P) {
                const a = A.getDistance(ot, at, P.x, P.y)
                , f = A.getDirection(P.x, P.y, ot, at)
                , d = Math.min(a * .01 * Fe, a);
                a > .05 ? (ot += d * Math.cos(f),
                           at += d * Math.sin(f)) : (ot = P.x,
                                                     at = P.y)
            } else
                ot = T.mapScale / 2,
                    at = T.mapScale / 2;
            const o = hi - 1e3 / T.serverUpdateRate;
            for (var e, t = 0; t < oe.length + Oe.length; ++t)
                if (k = oe[t] || Oe[t - oe.length],
                    k && k.visible)
                    if (k.forcePos)
                        k.x = k.x2,
                            k.y = k.y2,
                            k.dir = k.d2;
                    else {
                        const a = k.t2 - k.t1
                        , d = (o - k.t1) / a
                        , u = 170;
                        k.dt += Fe;
                        const p = Math.min(1.7, k.dt / u);
                        var e = k.x2 - k.x1;
                        k.x = k.x1 + e * p,
                            e = k.y2 - k.y1,
                            k.y = k.y1 + e * p,
                            k.dir = Math.lerpAngle(k.d2, k.d1, Math.min(1.2, d))
                    }
            const l = ot - ge / 2
            , c = at - ye / 2;
            T.snowBiomeTop - c <= 0 && T.mapScale - T.snowBiomeTop - c >= ye ? (C.fillStyle = "#b6db66",
                                                                                C.fillRect(0, 0, ge, ye)) : T.mapScale - T.snowBiomeTop - c <= 0 ? (C.fillStyle = "#dbc666",
                                                                                                                                                    C.fillRect(0, 0, ge, ye)) : T.snowBiomeTop - c >= ye ? (C.fillStyle = "#fff",
        C.fillRect(0, 0, ge, ye)) : T.snowBiomeTop - c >= 0 ? (C.fillStyle = "#fff",
                                                               C.fillRect(0, 0, ge, T.snowBiomeTop - c),
                                                               C.fillStyle = "#b6db66",
                                                               C.fillRect(0, T.snowBiomeTop - c, ge, ye - (T.snowBiomeTop - c))) : (C.fillStyle = "#b6db66",
                                                                                                                                    C.fillRect(0, 0, ge, T.mapScale - T.snowBiomeTop - c),
                                                                                                                                    C.fillStyle = "#dbc666",
                                                                                                                                    C.fillRect(0, T.mapScale - T.snowBiomeTop - c, ge, ye - (T.mapScale - T.snowBiomeTop - c))),
                $n || (qt += fs * T.waveSpeed * Fe,
                       qt >= T.waveMax ? (qt = T.waveMax,
                                          fs = -1) : qt <= 1 && (qt = fs = 1),
                       C.globalAlpha = 1,
                       C.fillStyle = "#dbc666",
                       To(l, c, C, T.riverPadding),
                       C.fillStyle = "#91b2db",
                       To(l, c, C, (qt - 1) * 250)),
                C.lineWidth = 4,
                C.strokeStyle = "#000",
                C.globalAlpha = .06,
                C.beginPath();
            for (var i = -ot; i < ge; i += ye / 18)
                i > 0 && (C.moveTo(i, 0),
                          C.lineTo(i, ye));
            for (let a = -at; a < ye; a += ye / 18)
                i > 0 && (C.moveTo(0, a),
                          C.lineTo(ge, a));
            C.stroke(),
                C.globalAlpha = 1,
                C.strokeStyle = Zi,
                Pi(-1, l, c),
                C.globalAlpha = 1,
                C.lineWidth = St,
                So(0, l, c),
                Mo(l, c, 0),
                C.globalAlpha = 1;
            for (var t = 0; t < Oe.length; ++t)
                k = Oe[t],
                    k.active && k.visible && (k.animate(Fe),
                                              C.save(),
                                              C.translate(k.x - l, k.y - c),
                                              C.rotate(k.dir + k.dirPlus - Math.PI / 2),
                                              op(k, C),
                                              C.restore());
            if (Pi(0, l, c),
                So(1, l, c),
                Pi(1, l, c),
                Mo(l, c, 1),
                Pi(2, l, c),
                Pi(3, l, c),
                C.fillStyle = "#000",
                C.globalAlpha = .09,
                l <= 0 && C.fillRect(0, 0, -l, ye),
                T.mapScale - l <= ge) {
                var n = Math.max(0, -c);
                C.fillRect(T.mapScale - l, n, ge - (T.mapScale - l), ye - n)
            }
            if (c <= 0 && C.fillRect(-l, 0, ge + l, -c),
                T.mapScale - c <= ye) {
                var s = Math.max(0, -l);
                let a = 0;
                T.mapScale - l <= ge && (a = ge - (T.mapScale - l)),
                    C.fillRect(s, T.mapScale - c, ge - s - a, ye - (T.mapScale - c))
            }
            C.globalAlpha = 1,
                C.fillStyle = "rgba(0, 0, 70, 0.35)",
                C.fillRect(0, 0, ge, ye),
                C.strokeStyle = ko;
            for (var t = 0; t < oe.length + Oe.length; ++t)
                if (k = oe[t] || Oe[t - oe.length],
                    k.visible && (k.skinIndex != 10 || k == P || k.team && k.team == P.team)) {
                    const f = (k.team ? "[" + k.team + "] " : "") + (k.name || "");
                    if (f != "") {
                        if (C.font = (k.nameScale || 30) + "px Hammersmith One",
                            C.fillStyle = "#fff",
                            C.textBaseline = "middle",
                            C.textAlign = "center",
                            C.lineWidth = k.nameScale ? 11 : 8,
                            C.lineJoin = "round",
                            C.strokeText(f, k.x - l, k.y - c - k.scale - T.nameY),
                            C.fillText(f, k.x - l, k.y - c - k.scale - T.nameY),
                            k.isLeader && Di.crown.isLoaded) {
                            var r = T.crownIconScale
                            , s = k.x - l - r / 2 - C.measureText(f).width / 2 - T.crownPad;
                            C.drawImage(Di.crown, s, k.y - c - k.scale - T.nameY - r / 2 - 5, r, r)
                        }
                        if (k.iconIndex == 1 && Di.skull.isLoaded) {
                            var r = T.crownIconScale
                            , s = k.x - l - r / 2 + C.measureText(f).width / 2 + T.crownPad;
                            C.drawImage(Di.skull, s, k.y - c - k.scale - T.nameY - r / 2 - 5, r, r)
                        }
                    }
                    k.health > 0 && (T.healthBarWidth,
                                     C.fillStyle = ko,
                                     C.roundRect(k.x - l - T.healthBarWidth - T.healthBarPad, k.y - c + k.scale + T.nameY, T.healthBarWidth * 2 + T.healthBarPad * 2, 17, 8),
                                     C.fill(),
                                     C.fillStyle = k == P || k.team && k.team == P.team ? "#8ecc51" : "#cc5151",
                                     C.roundRect(k.x - l - T.healthBarWidth, k.y - c + k.scale + T.nameY + T.healthBarPad, T.healthBarWidth * 2 * (k.health / k.maxHealth), 17 - T.healthBarPad * 2, 7),
                                     C.fill())
                }
            As.update(Fe, C, l, c);
            for (var t = 0; t < oe.length; ++t)
                if (k = oe[t],
                    k.visible && k.chatCountdown > 0) {
                    k.chatCountdown -= Fe,
                        k.chatCountdown <= 0 && (k.chatCountdown = 0),
                        C.font = "32px Hammersmith One";
                    const f = C.measureText(k.chatMessage);
                    C.textBaseline = "middle",
                        C.textAlign = "center";
                    var s = k.x - l
                    , n = k.y - k.scale - c - 90;
                    const p = 47
                    , w = f.width + 17;
                    C.fillStyle = "rgba(0,0,0,0.2)",
                        C.roundRect(s - w / 2, n - p / 2, w, p, 6),
                        C.fill(),
                        C.fillStyle = "#fff",
                        C.fillText(k.chatMessage, s, n)
                }
        }
        wd(Fe)
    }
    function So(e, t, i) {
        for (let n = 0; n < ui.length; ++n)
            k = ui[n],
                k.active && k.layer == e && (k.update(Fe),
                                             k.active && Za(k.x - t, k.y - i, k.scale) && (C.save(),
                                                                                           C.translate(k.x - t, k.y - i),
                                                                                           C.rotate(k.dir),
                                                                                           qs(0, 0, k, C),
                                                                                           C.restore()))
    }
    const Io = {};
    function qs(e, t, i, n, s) {
        if (i.src) {
            const r = L.projectiles[i.indx].src;
            let o = Io[r];
            o || (o = new Image,
                  o.onload = function() {
                this.isLoaded = !0
            }
                  ,
                  o.src = "./img/weapons/" + r + ".png",
                  Io[r] = o),
                o.isLoaded && n.drawImage(o, e - i.scale / 2, t - i.scale / 2, i.scale, i.scale)
        } else
            i.indx == 1 && (n.fillStyle = "#939393",
                            he(e, t, i.scale, n))
    }
    function Ud() {
        const e = ot - ge / 2
        , t = at - ye / 2;
        Ye.animationTime += Fe,
            Ye.animationTime %= T.volcanoAnimationDuration;
        const i = T.volcanoAnimationDuration / 2
        , n = 1.7 + .3 * (Math.abs(i - Ye.animationTime) / i)
        , s = T.innerVolcanoScale * n;
        C.drawImage(Ye.land, Ye.x - T.volcanoScale - e, Ye.y - T.volcanoScale - t, T.volcanoScale * 2, T.volcanoScale * 2),
            C.drawImage(Ye.lava, Ye.x - s - e, Ye.y - s - t, s * 2, s * 2)
    }
    function To(e, t, i, n) {
        const s = T.riverWidth + n
        , r = T.mapScale / 2 - t - s / 2;
        r < ye && r + s > 0 && i.fillRect(0, r, ge, s)
    }
    function Pi(e, t, i) {
        let n, s, r;
        for (let o = 0; o < Dt.length; ++o)
            k = Dt[o],
                k.active && (s = k.x + k.xWiggle - t,
                             r = k.y + k.yWiggle - i,
                             e == 0 && k.update(Fe),
                             k.layer == e && Za(s, r, k.scale + (k.blocker || 0)) && (C.globalAlpha = k.hideFromEnemy ? .6 : 1,
                                                                                      k.isItem ? (n = yr(k),
                                                                                                  C.save(),
                                                                                                  C.translate(s, r),
                                                                                                  C.rotate(k.dir),
                                                                                                  C.drawImage(n, -(n.width / 2), -(n.height / 2)),
                                                                                                  k.blocker && (C.strokeStyle = "#db6e6e",
                                                                                                                C.globalAlpha = .3,
                                                                                                                C.lineWidth = 6,
                                                                                                                he(0, 0, k.blocker, C, !1, !0)),
                                                                                                  C.restore()) : k.type === 4 ? Ud() : (n = Gd(k),
                                                                                                                                        C.drawImage(n, s - n.width / 2, r - n.height / 2))))
    }
    function Wd(e, t, i) {
        k = Hn(e),
            k && k.startAnim(t, i)
    }
    function Mo(e, t, i) {
        C.globalAlpha = 1;
        for (let n = 0; n < oe.length; ++n)
            k = oe[n],
                k.zIndex == i && (k.animate(Fe),
                                  k.visible && (k.skinRot += .002 * Fe,
                                                lo = (k == P ? mr() : k.dir) + k.dirPlus,
                                                C.save(),
                                                C.translate(k.x - e, k.y - t),
                                                C.rotate(lo),
                                                Xd(k, C),
                                                C.restore()))
    }

    var rsdTexturesHats = {
        40: "http://i.imgur.com/yp9hwJp.png",
        6: "http://i.imgur.com/L6L0Q0l.png",
        7: "http://i.imgur.com/wqG2CBb.png",
        12: "http://i.imgur.com/eQxzyTD.png",
        1: "http://i.imgur.com/ZeKh57w.png",
        51: "http://i.imgur.com/d1s1LpB.png",
        31: "http://i.imgur.com/eLz8PZC.png",
        50: "http://i.imgur.com/q9JlWrd.png",
        11: "http://i.imgur.com/EbrAqWU.png",
        "11_p": "http://i.imgur.com/EbrAqWU.png",
        15: "http://i.imgur.com/4Ti0G4R.png",
        20: "http://i.imgur.com/BdPQwfF.png",
        22: "http://i.imgur.com/CoeJltc.png",
        53: "http://i.imgur.com/uQvWtke.png",
        "53_p": "http://i.imgur.com/uQvWtke.png"
    };

    var rsdTexturesAccessories = {
        19: "http://i.imgur.com/SWdR4eY.png",
        13: "http://i.imgur.com/zgR1rYf.png",
        18: "http://i.imgur.com/T5oPBsc.png",
    };

    var rsdTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/cHSvjlv.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/34rr2qm.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/jjNYCTZ.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_d": "https://i.imgur.com/vzlwkVK.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_d": "https://i.imgur.com/enUNTMp.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_r": "https://i.imgur.com/zOITPq2.png",
    };

    var theWarriorChroniclesTexturesHats = {
        7: "https://i.imgur.com/8xB1Q3u.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/0lnD8LH.png",
        "11_p": "https://i.imgur.com/0lnD8LH.png",
        "11_top": "https://i.imgur.com/s7Cxc9y.png",
        9: "https://i.imgur.com/1nY34aL.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/lKGtlDF.png",
        6: "https://i.imgur.com/kD6iYN8.png",
        20: "https://i.imgur.com/rSNEDel.png",
        23: "https://i.imgur.com/B9AcmcN.png",
        15: "https://i.imgur.com/w3AD2BJ.png",
        8: "https://i.imgur.com/kf8yAC2.png",
    };

    var theWarriorChroniclesTexturesAccessories = {
        21: "https://i.imgur.com/eikGSfv.png",
        13: "https://i.imgur.com/Qyxy7IB.png",
    };

    var theWarriorChroniclesTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/cHSvjlv.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/34rr2qm.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/jjNYCTZ.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_d": "https://i.imgur.com/vzlwkVK.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_d": "https://i.imgur.com/enUNTMp.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_r": "https://i.imgur.com/zOITPq2.png",
    };

    var redDragonTexturesHats = {
        7: "https://i.imgur.com/vAOzlyY.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/yfqME8H.png",
        "11_p": "https://i.imgur.com/yfqME8H.png",
        "11_top": "https://i.imgur.com/s7Cxc9y.png",
        9: "https://i.imgur.com/gJY7sM6.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/pe3Yx3F.png",
        6: "https://i.imgur.com/vM9Ri8g.png",
        20: "https://i.imgur.com/JbUPrtp.png",
        23: "https://i.imgur.com/JPMqgSc.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        8: "https://i.imgur.com/uYgDtcZ.png",
        26: "https://i.imgur.com/2PsUgEL.png",
        52: "https://i.imgur.com/hmJrVQz.png",
    };

    var redDragonTexturesAccessories = {
        21: "https://i.imgur.com/4ddZert.png",
        18: "https://i.imgur.com/0rmN7L9.png",
        19: "https://i.imgur.com/sULkUZT.png",
    };

    var redDragonTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/QKBc2ou.png",
        "samurai_1_d": "https://i.imgur.com/4ZxIJQM.png",
        "samurai_1_r": "https://i.imgur.com/vxLZW0S.png",

        "sword_1_g": "https://i.imgur.com/wOTr8TG.png",
        "sword_1_d": "https://i.imgur.com/h5jqSRp.png",
        "sword_1_r": "https://i.imgur.com/V9dzAbF.png",

        "spear_1_g": "https://i.imgur.com/jKDdyvc.png",
        "spear_1_d": "https://i.imgur.com/HSWcyku.png",
        "spear_1_r": "https://i.imgur.com/UY7SV7j.png",

        "great_axe_1_d": "https://i.imgur.com/aAJyHBB.png",
        "great_axe_1_r": "https://i.imgur.com/UZ2HcQw.png",

        "axe_1_d": "https://i.imgur.com/OU5os0h.png",
        "axe_1_r": "https://i.imgur.com/kr8H9g7.png",

        "dagger_1_d": "https://i.imgur.com/ROTb7Ks.png",
        "dagger_1_r": "https://i.imgur.com/CDAmjux.png",

        "hammer_1_g": "https://i.imgur.com/WPWU8zC.png",
        "hammer_1_d": "https://i.imgur.com/WPWU8zC.png",
        "hammer_1_r": "https://i.imgur.com/oRXUfW8.png",

        "great_hammer_1_d": "https://i.imgur.com/Fg93gj3.png",
        "great_hammer_1_r": "https://i.imgur.com/tmUzurk.png",

        "bat_1_g": "https://i.imgur.com/ivLPh10.png",
        "bat_1_d": "https://i.imgur.com/phXTNsa.png",
        "bat_1_r": "https://i.imgur.com/6ayjbIz.png",

        "stick_1_g": "https://i.imgur.com/NOaBBRd.png",
        "stick_1_d": "https://i.imgur.com/H5wGqQR.png",
        "stick_1_r": "https://i.imgur.com/uTDGDDy.png",

        "bow_1_d": "https://i.imgur.com/qu7HHT5.png",
        "bow_1_r": "https://i.imgur.com/Oneg3oF.png",

        "crossbow_1_d": "https://i.imgur.com/TRqDlgX.png",
        "crossbow_1_r": "https://i.imgur.com/EVesBtw.png",

        "crossbow_2_d": "https://i.imgur.com/DVjCdwI.png",
        "crossbow_2_r": "https://i.imgur.com/z4CyaXk.png",

        "musket_1_g": "https://i.imgur.com/mAW9JAW.png",
        "musket_1_d": "https://i.imgur.com/jwH99zm.png",
        "musket_1_r": "https://i.imgur.com/jPE54IT.png",

        "shield_1_d": "https://i.imgur.com/hSqLP3t.png",
        "shield_1_r": "https://i.imgur.com/SNFV2dc.png",

        "grab_1_g": "https://i.imgur.com/DRzBdFX.png",
        "grab_1_d": "https://i.imgur.com/7kbtWfk.png",
        "grab_1_r": "https://i.imgur.com/wV42LEE.png",
    };

    var theBlackSwordsmanTexturesHats = {
        7: "https://i.imgur.com/8xB1Q3u.png",
        12: "https://i.imgur.com/VSUId2s.png",
        13: "https://i.imgur.com/EwkbsHN.png",
        11: "https://i.imgur.com/Gu3ZJlY.png",
        "11_p": "https://i.imgur.com/NCkyBlK.png",
        "11_top": "https://i.imgur.com/zWJTlbI.png",
        9: "https://i.imgur.com/1nY34aL.png",
        18: "https://i.imgur.com/in5H6vw.png",
        40: "https://i.imgur.com/lKGtlDF.png",
        6: "https://i.imgur.com/2NXcXU8.png",
        20: "https://i.imgur.com/34ESjYy.png",
        23: "https://i.imgur.com/B9AcmcN.png",
        15: "https://i.imgur.com/YRQ8Ybq.png",
        8: "https://i.imgur.com/WHJch5H.png",
        14: "https://i.imgur.com/V4l7o1h.png",
        "14_p": "https://i.imgur.com/836PpI0.png",
        "14_top": "https://i.imgur.com/zWJTlbI.png",
        31: "https://i.imgur.com/JPMqgSc.png",
    };

    var theBlackSwordsmanTexturesAccessories = {
        21: "https://i.imgur.com/tuw16mP.png",
        18: "https://i.imgur.com/sRGXKvJ.png",
        19: "https://i.imgur.com/XWW0RJV.png",
    };

    var theBlackSwordsmanTexturesWeapons = {
        "samurai_1_g": "https://i.imgur.com/XtLvPYc.png",
        "samurai_1_d": "https://i.imgur.com/PUTTmVS.png",

        "sword_1_g": "https://i.imgur.com/HmjnnXn.png",
        "sword_1_d": "https://i.imgur.com/nzy3kz1.png",

        "spear_1_g": "https://i.imgur.com/fCjPvei.png",
        "spear_1_d": "https://i.imgur.com/mcI9MTd.png",

        "great_axe_1_d": "https://i.imgur.com/HjgV9p5.png",

        "axe_1_d": "https://i.imgur.com/AbVX635.png",

        "dagger_1_d": "https://i.imgur.com/ROTb7Ks.png",

        "hammer_1_d": "https://i.imgur.com/0XKpSVI.png",

        "great_hammer_1_d": "https://i.imgur.com/CVCwqES.png",

        "bow_1_d": "https://i.imgur.com/Dgv1gZm.png",

        "crossbow_1_d": "https://i.imgur.com/R2awlGz.png",

        "crossbow_2_d": "https://i.imgur.com/7PJOAk0.png",

        "shield_1_g": "https://i.imgur.com/zYP8eVL.png",
        "shield_1_d": "https://i.imgur.com/n571biC.png",
    };

    var theBlackSwordsmanTexturesAnimals = {
        "bull_1": "https://i.imgur.com/aLkviQu.png",
        "bull_2": "https://i.imgur.com/Qq0ysR4.png",
        "wolf_1": "https://i.imgur.com/zLAZWOH.png",
        "cow_1": "https://i.imgur.com/FycnCNU.png",
        "pig_1": "https://i.imgur.com/QHtrTlY.png",
        "chicken_1": "https://i.imgur.com/UtBEmai.png",
    };

    var oldTexturesHats = {
        7: "https://i.postimg.cc/zGnZNZNG/Bull-Helmet-V2.png",
        58: "https://i.postimg.cc/B67RpJTM/Bushido-Armor.png",
        26: "https://i.postimg.cc/t40Q8RLc/Barbarian-Armor.png",
        12: "https://i.postimg.cc/BQPfhPwD/Booster-V2.png",
        22: "https://i.postimg.cc/5t3hHB6c/Emp-Helmet.png",
        13: "https://i.postimg.cc/BvqyGjNm/Medic-Gear-V2.png",
        11: "https://i.postimg.cc/7PFqrNzX/Spike-V2.png",
        "11_p": "https://i.postimg.cc/7PFqrNzX/Spike-V2.png",
        "11_top": "",
        9: "https://i.postimg.cc/g0N7cGTm/Miner.png",
        4: "https://i.postimg.cc/Tw14pBzm/Ranger-Hat.png",
        18: "https://i.postimg.cc/RhjyrGbt/Explorer-Hat-V2.png",
        40: "https://i.imgur.com/foDF6AI.png",
        6: "https://i.postimg.cc/662BPP8y/Soldier-Helmet.png",
        20: "https://i.postimg.cc/Dmkjp08d/Samurai-Hat.png",
        23: "https://i.postimg.cc/WpHP6wST/Anti-Venom-Gear.png",
        15: "https://i.postimg.cc/pXKRWnYv/Winter-Cap.png",
        8: "https://i.postimg.cc/XJYT9rCr/Bummel-Hat.png",
    };

    var oldTexturesAccessories = {
        21: "",
        13: "",
    };

    var oldTexturesWeapons = {
        "samurai_1_g": "",
        "samurai_1_d": "https://i.imgur.com/2iI0aj8.png",
        "samurai_1_r": "https://i.imgur.com/q32l8gQ.png",

        "sword_1_g": "",
        "sword_1_d": "https://i.imgur.com/7NYsXJf.png",
        "sword_1_r": "https://i.imgur.com/swBWjlg.png",

        "spear_1_g": "",
        "spear_1_d": "https://i.imgur.com/veyLcv4.png",
        "spear_1_r": "https://i.imgur.com/QomIDrJ.png",

        "great_axe_1_g": "",
        "great_axe_1_d": "https://i.imgur.com/hfJTh4R.png",
        "great_axe_1_r": "https://i.imgur.com/9oszeGa.png",

        "axe_1_g": "",
        "axe_1_d": "https://i.imgur.com/tE1FOnb.png",
        "axe_1_r": "https://i.imgur.com/9KKLdVE.png",

        "dagger_1_g": "",
        "dagger_1_d": "https://i.imgur.com/2ZUdMQF.png",
        "dagger_1_r": "https://i.imgur.com/Hqp9vxh.png",

        "hammer_1_g": "https://i.imgur.com/X8u4rXd.png",
        "hammer_1_d": "https://i.imgur.com/LHkSv0v.png",
        "hammer_1_r": "https://i.imgur.com/3Me1GWc.png",

        "great_hammer_1_g": "",
        "great_hammer_1_d": "https://i.imgur.com/KmmT14q.png",
        "great_hammer_1_r": "https://i.imgur.com/tmWLmIU.png",

        "bat_1_g": "",
        "bat_1_d": "",
        "bat_1_r": "https://i.imgur.com/zOITPq2.png",

        "stick_1_g": "",
        "stick_1_d": "",
        "stick_1_r": "",
    };

    function getTexturePackImg(id, type) {
        if (resourcePack.pack == "Old Textures") {
            if (oldTexturesHats[id] && type == "hat") {
                return oldTexturesHats[id];
            } else if (oldTexturesAccessories[id] && type == "acc") {
                return oldTexturesAccessories[id];
            } else if (oldTexturesWeapons[id] && type == "weapons") {
                return oldTexturesWeapons[id];
            } else {
                if (type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                } else if (type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                } else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        } else if (resourcePack.pack == "RSD Pack") {
            if (rsdTexturesHats[id] && type == "hat") {
                return rsdTexturesHats[id];
            } else if (rsdTexturesAccessories[id] && type == "acc") {
                return rsdTexturesAccessories[id];
            } else if (rsdTexturesWeapons[id] && type == "weapons") {
                return rsdTexturesWeapons[id];
            } else {
                if (type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                } else if (type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                } else if (type == "animals") {
                    return ".././img/animals/" + id + ".png";
                } else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        } else if (resourcePack.pack == "The Warrior Chronicles") {
            if (theWarriorChroniclesTexturesHats[id] && type == "hat") {
                return theWarriorChroniclesTexturesHats[id];
            } else if (theWarriorChroniclesTexturesAccessories[id] && type == "acc") {
                return theWarriorChroniclesTexturesAccessories[id];
            } else if (theWarriorChroniclesTexturesWeapons[id] && type == "weapons") {
                return theWarriorChroniclesTexturesWeapons[id];
            } else {
                if (type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                } else if (type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                } else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        } else if (resourcePack.pack == "Red Dragon") {
            if (redDragonTexturesHats[id] && type == "hat") {
                return redDragonTexturesHats[id];
            } else if (redDragonTexturesAccessories[id] && type == "acc") {
                return redDragonTexturesAccessories[id];
            } else if (redDragonTexturesWeapons[id] && type == "weapons") {
                return redDragonTexturesWeapons[id];
            } else {
                if (type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                } else if (type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                } else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        } else if (resourcePack.pack == "The Black Swordsman") {
            if (theBlackSwordsmanTexturesHats[id] && type == "hat") {
                return theBlackSwordsmanTexturesHats[id];
            } else if (theBlackSwordsmanTexturesAccessories[id] && type == "acc") {
                return theBlackSwordsmanTexturesAccessories[id];
            } else if (theBlackSwordsmanTexturesWeapons[id] && type == "weapons") {
                return theBlackSwordsmanTexturesWeapons[id];
            } else if (theBlackSwordsmanTexturesAnimals[id] && type == "animals") {
                return theBlackSwordsmanTexturesAnimals[id];
            } else {
                if (type == "acc") {
                    return ".././img/accessories/access_" + id + ".png";
                } else if (type == "hat") {
                    return ".././img/hats/hat_" + id + ".png";
                } else if (type == "animals") {
                    return ".././img/animals/" + id + ".png";
                } else {
                    return ".././img/weapons/" + id + ".png";
                }
            }
        } else {
            if (type == "acc") {
                return ".././img/accessories/access_" + id + ".png";
            } else if (type == "hat") {
                return ".././img/hats/hat_" + id + ".png";
            } else if (type == "animals") {
                return ".././img/animals/" + id + ".png";
            } else {
                return ".././img/weapons/" + id + ".png";
            }
        }
    }

    function Xd(e, t) {
        t = t || C,
            t.lineWidth = St,
            t.lineJoin = "miter";
        const i = Math.PI / 4 * (L.weapons[e.weaponIndex].armS || 1)
        , n = e.buildIndex < 0 && L.weapons[e.weaponIndex].hndS || 1
        , s = e.buildIndex < 0 && L.weapons[e.weaponIndex].hndD || 1;
        if (e.tailIndex > 0 && qd(e.tailIndex, t, e),
            e.buildIndex < 0 && !L.weapons[e.weaponIndex].aboveHand && (Ro(L.weapons[e.weaponIndex], T.weaponVariants[e.weaponVariant].src, e.scale, 0, t),
                                                                        L.weapons[e.weaponIndex].projectile != null && !L.weapons[e.weaponIndex].hideProjectile && qs(e.scale, 0, L.projectiles[L.weapons[e.weaponIndex].projectile], C)),
            t.fillStyle = T.skinColors[e.skinColor],
            he(e.scale * Math.cos(i), e.scale * Math.sin(i), 14),
            he(e.scale * s * Math.cos(-i * n), e.scale * s * Math.sin(-i * n), 14),
            e.buildIndex < 0 && L.weapons[e.weaponIndex].aboveHand && (Ro(L.weapons[e.weaponIndex], T.weaponVariants[e.weaponVariant].src, e.scale, 0, t),
                                                                       L.weapons[e.weaponIndex].projectile != null && !L.weapons[e.weaponIndex].hideProjectile && qs(e.scale, 0, L.projectiles[L.weapons[e.weaponIndex].projectile], C)),
            e.buildIndex >= 0) {
            const r = yr(L.list[e.buildIndex]);
            t.drawImage(r, e.scale - L.list[e.buildIndex].holdOffset, -r.width / 2)
        }
        he(0, 0, e.scale, t),
            e.skinIndex > 0 && (t.rotate(Math.PI / 2),
                                Ka(e.skinIndex, t, null, e))
    }
    const Eo = {}
    , Co = {};
    let et;
    function Ka(e, t, i, n) {
        if (et = Eo[e + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)],
            !et) {
            const r = new Image;
            r.onload = function() {
                this.isLoaded = !0,
                    this.onload = null
            }
                ,console.log(e, resourcePack.pack),
                r.src = getTexturePackImg(e, "hat"),
                Eo[e + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)] = r,
                et = r
        }
        let s = i || Co[e];
        if (!s) {
            for (let r = 0; r < Vi.length; ++r)
                if (Vi[r].id == e) {
                    s = Vi[r];
                    break
                }
            Co[e] = s
        }
        et.isLoaded && t.drawImage(et, -s.scale / 2, -s.scale / 2, s.scale, s.scale),
            !i && s.topSprite && (t.save(),
                                  t.rotate(n.skinRot),
                                  Ka(e + "_top", t, s, n),
                                  t.restore())
    }
    const Po = {}
    , $o = {};
    function qd(e, t, i) {
        if (et = Po[e + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)],
            !et) {
            const s = new Image;
            s.onload = function() {
                this.isLoaded = !0,
                    this.onload = null
            }
                ,console.log(e, resourcePack.pack),
                s.src = getTexturePackImg(e, "acc"),
                Po[e + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)] = s,
                et = s
        }
        let n = $o[e];
        if (!n) {
            for (let s = 0; s < Ni.length; ++s)
                if (Ni[s].id == e) {
                    n = Ni[s];
                    break
                }
            $o[e] = n
        }
        et.isLoaded && (t.save(),
                        t.translate(-20 - (n.xOff || 0), 0),
                        n.spin && t.rotate(i.skinRot),
                        t.drawImage(et, -(n.scale / 2), -(n.scale / 2), n.scale, n.scale),
                        t.restore())
    }
    var Gs = {};
    function Ro(e, t, i, n, s) {
        const r = e.src + (t || "");
        let o = Gs[r + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)];
        o || (o = new Image,
              o.onload = function() {
            this.isLoaded = !0
        }
              ,console.log(r, resourcePack.pack),
              o.src = getTexturePackImg(r, "weapons"),
              Gs[r + (resourcePack.pack == "Old Textures" ? "Old" : resourcePack.pack == "The Warrior Chronicles" ? "TWCH" : resourcePack.pack == "Red Dragon" ? "RD" : resourcePack.pack == "The Black Swordsman" ? "TBS" : resourcePack.pack == "RSD Pack" ? "RSD" : 0)] = o),
            o.isLoaded && s.drawImage(o, i + e.xOff - e.length / 2, n + e.yOff - e.width / 2, e.length, e.width)
    }
    const Ao = {};
    function Gd(e) {
        const t = e.y >= T.mapScale - T.snowBiomeTop ? 2 : e.y <= T.snowBiomeTop ? 1 : 0
        , i = e.type + "_" + e.scale + "_" + t;
        let n = Ao[i];
        if (!n) {
            const r = document.createElement("canvas");
            r.width = r.height = e.scale * 2.1 + St;
            const o = r.getContext("2d");
            if (o.translate(r.width / 2, r.height / 2),
                o.rotate(A.randFloat(0, Math.PI)),
                o.strokeStyle = Zi,
                o.lineWidth = St,
                e.type == 0) {
                let l;
                for (var s = 0; s < 2; ++s)
                    l = k.scale * (s ? .5 : 1),
                        qe(o, k.sid % 2 === 0 ? 5 : 7, l, l * .7),
                        o.fillStyle = t ? s ? "#fff" : "#e3f1f4" : s ? "#b4db62" : "#9ebf57",
                        o.fill(),
                        s || o.stroke()
            } else if (e.type == 1)
                if (t == 2)
                    o.fillStyle = "#606060",
                        qe(o, 6, e.scale * .3, e.scale * .71),
                        o.fill(),
                        o.stroke(),
                        o.fillStyle = "#89a54c",
                        he(0, 0, e.scale * .55, o),
                        o.fillStyle = "#a5c65b",
                        he(0, 0, e.scale * .3, o, !0);
                else {
                    Zd(o, 6, k.scale, k.scale * .7),
                        o.fillStyle = t ? "#e3f1f4" : "#89a54c",
                        o.fill(),
                        o.stroke(),
                        o.fillStyle = t ? "#6a64af" : "#c15555";
                    let l;
                    const c = 4
                    , a = Rt / c;
                    for (var s = 0; s < c; ++s)
                        l = A.randInt(k.scale / 3.5, k.scale / 2.3),
                            he(l * Math.cos(a * s), l * Math.sin(a * s), A.randInt(10, 12), o)
                }
            else
                (e.type == 2 || e.type == 3) && (o.fillStyle = e.type == 2 ? t == 2 ? "#938d77" : "#939393" : "#e0c655",
                                                 qe(o, 3, e.scale, e.scale),
                                                 o.fill(),
                                                 o.stroke(),
                                                 o.fillStyle = e.type == 2 ? t == 2 ? "#b2ab90" : "#bcbcbc" : "#ebdca3",
                                                 qe(o, 3, e.scale * .55, e.scale * .65),
                                                 o.fill());
            n = r,
                Ao[i] = n
        }
        return n
    }
    function Do(e, t, i) {
        const n = e.lineWidth || 0;
        i /= 2,
            e.beginPath();
        let s = Math.PI * 2 / t;
        for (let r = 0; r < t; r++)
            e.lineTo(i + (i - n / 2) * Math.cos(s * r), i + (i - n / 2) * Math.sin(s * r));
        e.closePath()
    }
    function Yd() {
        const t = T.volcanoScale * 2
        , i = document.createElement("canvas");
        i.width = t,
            i.height = t;
        const n = i.getContext("2d");
        n.strokeStyle = "#3e3e3e",
            n.lineWidth = St * 2,
            n.fillStyle = "#7f7f7f",
            Do(n, 10, t),
            n.fill(),
            n.stroke(),
            Ye.land = i;
        const s = document.createElement("canvas")
        , r = T.innerVolcanoScale * 2;
        s.width = r,
            s.height = r;
        const o = s.getContext("2d");
        o.strokeStyle = Zi,
            o.lineWidth = St * 1.6,
            o.fillStyle = "#f54e16",
            o.strokeStyle = "#f56f16",
            Do(o, 10, r),
            o.fill(),
            o.stroke(),
            Ye.lava = s
    }
    Yd();
    const Oo = [];
    function yr(e, t) {
        let i = Oo[e.id];
        if (!i || t) {
            const c = document.createElement("canvas");
            c.width = c.height = e.scale * 2.5 + St + (L.list[e.id].spritePadding || 0);
            const a = c.getContext("2d");
            if (a.translate(c.width / 2, c.height / 2),
                a.rotate(t ? 0 : Math.PI / 2),
                a.strokeStyle = Zi,
                a.lineWidth = St * (t ? c.width / 81 : 1),
                e.name == "apple") {
                a.fillStyle = "#c15555",
                    he(0, 0, e.scale, a),
                    a.fillStyle = "#89a54c";
                const f = -(Math.PI / 2);
                Kd(e.scale * Math.cos(f), e.scale * Math.sin(f), 25, f + Math.PI / 2, a)
            } else if (e.name == "cookie") {
                a.fillStyle = "#cca861",
                    he(0, 0, e.scale, a),
                    a.fillStyle = "#937c4b";
                for (var n = 4, s = Rt / n, r, o = 0; o < n; ++o)
                    r = A.randInt(e.scale / 2.5, e.scale / 1.7),
                        he(r * Math.cos(s * o), r * Math.sin(s * o), A.randInt(4, 5), a, !0)
            } else if (e.name == "cheese") {
                a.fillStyle = "#f4f3ac",
                    he(0, 0, e.scale, a),
                    a.fillStyle = "#c3c28b";
                for (var n = 4, s = Rt / n, r, o = 0; o < n; ++o)
                    r = A.randInt(e.scale / 2.5, e.scale / 1.7),
                        he(r * Math.cos(s * o), r * Math.sin(s * o), A.randInt(4, 5), a, !0)
            } else if (e.name == "wood wall" || e.name == "stone wall" || e.name == "castle wall") {
                a.fillStyle = e.name == "castle wall" ? "#83898e" : e.name == "wood wall" ? "#a5974c" : "#939393";
                const f = e.name == "castle wall" ? 4 : 3;
                qe(a, f, e.scale * 1.1, e.scale * 1.1),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = e.name == "castle wall" ? "#9da4aa" : e.name == "wood wall" ? "#c9b758" : "#bcbcbc",
                    qe(a, f, e.scale * .65, e.scale * .65),
                    a.fill()
            } else if (e.name == "spikes" || e.name == "greater spikes" || e.name == "poison spikes" || e.name == "spinning spikes") {
                a.fillStyle = e.name == "poison spikes" ? "#7b935d" : "#939393";
                var l = e.scale * .6;
                qe(a, e.name == "spikes" ? 5 : 6, e.scale, l),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = "#a5974c",
                    he(0, 0, l, a),
                    a.fillStyle = "#c9b758",
                    he(0, 0, l / 2, a, !0)
            } else if (e.name == "windmill" || e.name == "faster windmill" || e.name == "power mill")
                a.fillStyle = "#a5974c",
                    he(0, 0, e.scale, a),
                    a.fillStyle = "#c9b758",
                    xs(0, 0, e.scale * 1.5, 29, 4, a),
                    a.fillStyle = "#a5974c",
                    he(0, 0, e.scale * .5, a);
            else if (e.name == "mine")
                a.fillStyle = "#939393",
                    qe(a, 3, e.scale, e.scale),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = "#bcbcbc",
                    qe(a, 3, e.scale * .55, e.scale * .65),
                    a.fill();
            else if (e.name == "sapling")
                for (var o = 0; o < 2; ++o) {
                    var l = e.scale * (o ? .5 : 1);
                    qe(a, 7, l, l * .7),
                        a.fillStyle = o ? "#b4db62" : "#9ebf57",
                        a.fill(),
                        o || a.stroke()
                }
            else if (e.name == "pit trap")
                a.fillStyle = "#a5974c",
                    qe(a, 3, e.scale * 1.1, e.scale * 1.1),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = Zi,
                    qe(a, 3, e.scale * .65, e.scale * .65),
                    a.fill();
            else if (e.name == "boost pad")
                a.fillStyle = "#7e7f82",
                    ni(0, 0, e.scale * 2, e.scale * 2, a),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = "#dbd97d",
                    Jd(e.scale * 1, a);
            else if (e.name == "turret") {
                a.fillStyle = "#a5974c",
                    he(0, 0, e.scale, a),
                    a.fill(),
                    a.stroke(),
                    a.fillStyle = "#939393";
                const f = 50;
                ni(0, -f / 2, e.scale * .9, f, a),
                    he(0, 0, e.scale * .6, a),
                    a.fill(),
                    a.stroke()
            } else if (e.name == "platform") {
                a.fillStyle = "#cebd5f";
                const f = 4
                , d = e.scale * 2
                , u = d / f;
                let p = -(e.scale / 2);
                for (var o = 0; o < f; ++o)
                    ni(p - u / 2, 0, u, e.scale * 2, a),
                        a.fill(),
                        a.stroke(),
                        p += d / f
            } else
                e.name == "healing pad" ? (a.fillStyle = "#7e7f82",
                                           ni(0, 0, e.scale * 2, e.scale * 2, a),
                                           a.fill(),
                                           a.stroke(),
                                           a.fillStyle = "#db6e6e",
                                           xs(0, 0, e.scale * .65, 20, 4, a, !0)) : e.name == "spawn pad" ? (a.fillStyle = "#7e7f82",
                                                                                                             ni(0, 0, e.scale * 2, e.scale * 2, a),
                                                                                                             a.fill(),
                                                                                                             a.stroke(),
                                                                                                             a.fillStyle = "#71aad6",
                                                                                                             he(0, 0, e.scale * .6, a)) : e.name == "blocker" ? (a.fillStyle = "#7e7f82",
            he(0, 0, e.scale, a),
            a.fill(),
            a.stroke(),
            a.rotate(Math.PI / 4),
            a.fillStyle = "#db6e6e",
            xs(0, 0, e.scale * .65, 20, 4, a, !0)) : e.name == "teleporter" && (a.fillStyle = "#7e7f82",
                                                                                he(0, 0, e.scale, a),
                                                                                a.fill(),
                                                                                a.stroke(),
                                                                                a.rotate(Math.PI / 4),
                                                                                a.fillStyle = "#d76edb",
                                                                                he(0, 0, e.scale * .5, a, !0));
            i = c,
                t || (Oo[e.id] = i)
        }
        return i
    }
    function Kd(e, t, i, n, s) {
        const r = e + i * Math.cos(n)
        , o = t + i * Math.sin(n)
        , l = i * .4;
        s.moveTo(e, t),
            s.beginPath(),
            s.quadraticCurveTo((e + r) / 2 + l * Math.cos(n + Math.PI / 2), (t + o) / 2 + l * Math.sin(n + Math.PI / 2), r, o),
            s.quadraticCurveTo((e + r) / 2 - l * Math.cos(n + Math.PI / 2), (t + o) / 2 - l * Math.sin(n + Math.PI / 2), e, t),
            s.closePath(),
            s.fill(),
            s.stroke()
    }
    function he(e, t, i, n, s, r) {
        n = n || C,
            n.beginPath(),
            n.arc(e, t, i, 0, 2 * Math.PI),
            r || n.fill(),
            s || n.stroke()
    }
    function qe(e, t, i, n) {
        let s = Math.PI / 2 * 3, r, o;
        const l = Math.PI / t;
        e.beginPath(),
            e.moveTo(0, -i);
        for (let c = 0; c < t; c++)
            r = Math.cos(s) * i,
                o = Math.sin(s) * i,
                e.lineTo(r, o),
                s += l,
                r = Math.cos(s) * n,
                o = Math.sin(s) * n,
                e.lineTo(r, o),
                s += l;
        e.lineTo(0, -i),
            e.closePath()
    }
    function ni(e, t, i, n, s, r) {
        s.fillRect(e - i / 2, t - n / 2, i, n),
            r || s.strokeRect(e - i / 2, t - n / 2, i, n)
    }
    function xs(e, t, i, n, s, r, o) {
        r.save(),
            r.translate(e, t),
            s = Math.ceil(s / 2);
        for (let l = 0; l < s; l++)
            ni(0, 0, i * 2, n, r, o),
                r.rotate(Math.PI / s);
        r.restore()
    }
    function Zd(e, t, i, n) {
        let s = Math.PI / 2 * 3;
        const r = Math.PI / t;
        let o;
        e.beginPath(),
            e.moveTo(0, -n);
        for (let l = 0; l < t; l++)
            o = A.randInt(i + .9, i * 1.2),
                e.quadraticCurveTo(Math.cos(s + r) * o, Math.sin(s + r) * o, Math.cos(s + r * 2) * n, Math.sin(s + r * 2) * n),
                s += r * 2;
        e.lineTo(0, -n),
            e.closePath()
    }
    function Jd(e, t) {
        t = t || C;
        const i = e * (Math.sqrt(3) / 2);
        t.beginPath(),
            t.moveTo(0, -i / 2),
            t.lineTo(-e / 2, i / 2),
            t.lineTo(e / 2, i / 2),
            t.lineTo(0, -i / 2),
            t.fill(),
            t.closePath()
    }
    function Qd() {
        const e = T.mapScale / 2;
        $e.add(0, e, e + 200, 0, T.treeScales[3], 0),
            $e.add(1, e, e - 480, 0, T.treeScales[3], 0),
            $e.add(2, e + 300, e + 450, 0, T.treeScales[3], 0),
            $e.add(3, e - 950, e - 130, 0, T.treeScales[2], 0),
            $e.add(4, e - 750, e - 400, 0, T.treeScales[3], 0),
            $e.add(5, e - 700, e + 400, 0, T.treeScales[2], 0),
            $e.add(6, e + 800, e - 200, 0, T.treeScales[3], 0),
            $e.add(7, e - 260, e + 340, 0, T.bushScales[3], 1),
            $e.add(8, e + 760, e + 310, 0, T.bushScales[3], 1),
            $e.add(9, e - 800, e + 100, 0, T.bushScales[3], 1),
            $e.add(10, e - 800, e + 300, 0, L.list[4].scale, L.list[4].id, L.list[10]),
            $e.add(11, e + 650, e - 390, 0, L.list[4].scale, L.list[4].id, L.list[10]),
            $e.add(12, e - 400, e - 450, 0, T.rockScales[2], 2)
    }
    function jd(e) {
        for (let t = 0; t < e.length; )
            $e.add(e[t], e[t + 1], e[t + 2], e[t + 3], e[t + 4], e[t + 5], L.list[e[t + 6]], !0, e[t + 7] >= 0 ? {
                sid: e[t + 7]
            } : null),
                t += 8
    }
    function ep(e, t) {
        k = Qa(t),
            k && (k.xWiggle += T.gatherWiggle * Math.cos(e),
                  k.yWiggle += T.gatherWiggle * Math.sin(e))
    }
    function tp(e, t) {
        k = Qa(e),
            k && (k.dir = t,
                  k.xWiggle += T.gatherWiggle * Math.cos(t + Math.PI),
                  k.yWiggle += T.gatherWiggle * Math.sin(t + Math.PI))
    }
    function ip(e, t, i, n, s, r, o, l) {
        lr && (Pa.addProjectile(e, t, i, n, s, r, null, null, o).sid = l)
    }
    function np(e, t) {
        for (let i = 0; i < ui.length; ++i)
            ui[i].sid == e && (ui[i].range = t)
    }
    function sp(e) {
        k = Ja(e),
            k && k.startAnim()
    }
    function rp(e) {
        for (var t = 0; t < Oe.length; ++t)
            Oe[t].forcePos = !Oe[t].visible,
                Oe[t].visible = !1;
        if (e) {
            const i = Date.now();
            for (var t = 0; t < e.length; )
                k = Ja(e[t]),
                    k ? (k.index = e[t + 1],
                         k.t1 = k.t2 === void 0 ? i : k.t2,
                         k.t2 = i,
                         k.x1 = k.x,
                         k.y1 = k.y,
                         k.x2 = e[t + 2],
                         k.y2 = e[t + 3],
                         k.d1 = k.d2 === void 0 ? e[t + 4] : k.d2,
                         k.d2 = e[t + 4],
                         k.health = e[t + 5],
                         k.dt = 0,
                         k.visible = !0) : (k = ao.spawn(e[t + 2], e[t + 3], e[t + 4], e[t + 1]),
                                            k.x2 = k.x,
                                            k.y2 = k.y,
                                            k.d2 = k.dir,
                                            k.health = e[t + 5],
                                            ao.aiTypes[e[t + 1]].name || (k.name = T.cowNames[e[t + 6]]),
                                            k.forcePos = !0,
                                            k.sid = e[t],
                                            k.visible = !0),
                    t += 7
        }
    }
    const _o = {};
    function op(e, t) {
        const i = e.index;
        let n = _o[i];
        if (!n) {
            const s = new Image;
            s.onload = function() {
                this.isLoaded = !0,
                    this.onload = null
            }
                ,
                s.src = "./img/animals/" + e.src + ".png",
                n = s,
                _o[i] = n
        }
        if (n.isLoaded) {
            const s = e.scale * 1.2 * (e.spriteMlt || 1);
            t.drawImage(n, -s, -s, s * 2, s * 2)
        }
    }
    function Za(e, t, i) {
        return e + i >= 0 && e - i <= ge && t + i >= 0 && t - i <= ye
    }
    function ap(e, t) {
        let i = dp(e[0]);
        i || (i = new Gh(e[0],e[1],T,A,Pa,$e,oe,Oe,L,Vi,Ni),
              oe.push(i)),
            i.spawn(t ? Sn : null),
            i.visible = !1,
            i.x2 = void 0,
            i.y2 = void 0,
            i.setData(e),
            t && (P = i,
                  ot = P.x,
                  at = P.y,
                  La(),
                  qa(),
                  Ya(),
                  Ga(0),
                  ar.style.display = "block")
    }
    function lp(e) {
        for (let t = 0; t < oe.length; t++)
            if (oe[t].id == e) {
                oe.splice(t, 1);
                break
            }
    }
    function cp(e, t) {
        P && (P.itemCounts[e] = t)
    }
    function hp(e, t, i) {
        P && (P[e] = t,
              i && qa())
    }
    function up(e, t) {
        k = Hn(e),
            k && (k.health = t)
    }
    function fp(e) {
        const t = Date.now();
        for (var i = 0; i < oe.length; ++i)
            oe[i].forcePos = !oe[i].visible,
                oe[i].visible = !1;
        for (var i = 0; i < e.length; )
            k = Hn(e[i]),
                k && (k.t1 = k.t2 === void 0 ? t : k.t2,
                      k.t2 = t,
                      k.x1 = k.x,
                      k.y1 = k.y,
                      k.x2 = e[i + 1],
                      k.y2 = e[i + 2],
                      k.d1 = k.d2 === void 0 ? e[i + 3] : k.d2,
                      k.d2 = e[i + 3],
                      k.dt = 0,
                      k.buildIndex = e[i + 4],
                      k.weaponIndex = e[i + 5],
                      k.weaponVariant = e[i + 6],
                      k.team = e[i + 7],
                      k.isLeader = e[i + 8],
                      k.skinIndex = e[i + 9],
                      k.tailIndex = e[i + 10],
                      k.iconIndex = e[i + 11],
                      k.zIndex = e[i + 12],
                      k.visible = !0),
                i += 13
    }
    function dp(e) {
        for (let t = 0; t < oe.length; ++t)
            if (oe[t].id == e)
                return oe[t];
        return null
    }
    function Hn(e) {
        for (let t = 0; t < oe.length; ++t)
            if (oe[t].sid == e)
                return oe[t];
        return null
    }
    function Ja(e) {
        for (let t = 0; t < Oe.length; ++t)
            if (Oe[t].sid == e)
                return Oe[t];
        return null
    }
    function Qa(e) {
        for (let t = 0; t < Dt.length; ++t)
            if (Dt[t].sid == e)
                return Dt[t];
        return null
    }
    let ja = -1;
    function pp() {
        const e = Date.now() - ja;
        window.pingTime = e,
            Gi.innerText = "Ping: " + e + " ms"
    }
    let bs;
    function el() {
        bs && clearTimeout(bs),
            sr() && (ja = Date.now(),
                     me.send("0")),
            bs = setTimeout(el, 2500)
    }
    function mp(e) {
        if (e < 0)
            return;
        const t = Math.floor(e / 60);
        let i = e % 60;
        i = ("0" + i).slice(-2),
            po.innerText = "Server restarting in " + t + ":" + i,
            po.hidden = !1
    }
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60)
        }
    }();
    function tl() {
        hi = Date.now(),
            Fe = hi - oo,
            oo = hi,
            Nd(),
            requestAnimFrame(tl)
    }
    Qd();
    tl();
    function il(e) {
        window.open(e, "_blank")
    }
    window.openLink = il;
    window.aJoinReq = Fs;
    window.follmoo = Xf;
    window.kickFromClan = Oa;
    window.sendJoin = _a;
    window.leaveAlliance = za;
    window.createAlliance = Vs;
    window.storeBuy = Ba;
    window.storeEquip = Ws;
    window.showItemInfo = Ue;
    window.selectSkinColor = Td;
    window.changeStoreIndex = vd;
    window.config = T;
})();
