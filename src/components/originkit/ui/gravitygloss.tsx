/* eslint-disable */
// Originkit — props baked into the default export.
"use client"

/**
 * CerisePlunge — a glossy sphere sinking into a tilted headline sheet, the
 * letters pulled into the funnel beneath it. The sphere follows the pointer.
 * Built from the user's "Typographic Gravity Well" component.
 */

import * as React from "react"
import { useEffect, useRef } from "react"

/** Tuning values. Stripped at publish; the tuned values are baked in here. */
const ADVANCED_DEFAULTS = {
    angle: 30,
    blockX: 50,
    blockY: 50,
    lineGap: 2,
    stretch: 126,
    perspective: 70,
    sphereX: 0,
    sphereY: 0,
    sphereMid: "#FF6A00",
    specular: 55,
    specPower: 40,
    rimDark: 30,
    reflection: 40,
    reflectColor: "#FFAE34",
    wellDrop: 80,
    reach: 392,
    funnelShade: 40,
    holeSize: 35,
    loopMs: 8000,
    driftX: 3,
    driftY: 3,
    breathe: 3,
    depthSwing: 15,
    pressBoost: 20,
    // Was 500 ms. The sphere now sits under the cursor, and a spot under the
    // cursor eases in ~100 ms or reads as lag.
    followMs: 450,
    grain: 0,
    vignette: 0,
    // Was 50 (a capped nudge toward the cursor). Now the share of the way the
    // sphere travels to the pointer: 100 = right under it.
    hover: 87,
}

// ── moved controls (builder) ──
/**
 * Controls moved in the builder: into Advanced, out of it, or into groups of
 * their own. The code reads each one where it was first written, so the props
 * are put back in that shape before anything reads them.
 */
const MOVED_CONTROLS: { into: Record<string, string>; out: Record<string, string> } = {"into":{},"out":{"angle":"advanced","blockX":"advanced","blockY":"advanced","lineGap":"advanced","stretch":"advanced","reach":"advanced","followMs":"advanced","sphereMid":"advanced","reflectColor":"advanced","hover":"advanced"}}
const GROUP_FALLBACKS: Record<string, any> = { advanced: ADVANCED_DEFAULTS }
function withMovedControls(props: any): any {
    const out = { ...props }
    for (const [k, g] of Object.entries(MOVED_CONTROLS.into)) out[k] = props?.[g]?.[k] ?? GROUP_FALLBACKS[g]?.[k]
    for (const [k, g] of Object.entries(MOVED_CONTROLS.out)) {
        if (out[k] !== undefined) out[g] = { ...(out[g] ?? {}), [k]: out[k] }
    }
    return out
}
// ── /moved controls ──

type Advanced = typeof ADVANCED_DEFAULTS

interface FontValue {
    fontFamily?: string
    fontWeight?: number | string
    fontStyle?: string
    fontSize?: number | string
    letterSpacing?: number | string
}

export interface CerisePlungeProps {
    text?: string
    font?: FontValue
    textColor?: string
    sphereColor?: string
    sphereShade?: string
    size?: number
    pull?: number
    speed?: number
    background?: string
    advanced?: Partial<Advanced>
    style?: React.CSSProperties
}

const HEADLINE_FALLBACK = `"Anton", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif`
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Anton&display=swap"

const VERT = `#version 300 es
void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform sampler2D uTex;
uniform vec4 uTexRect;
uniform vec2 uO;
uniform vec4 uAxes;
uniform float uPersp;
uniform vec3 uBall;
uniform vec4 uWell;
uniform float uShade;
uniform vec3 uBg;
uniform vec3 uText;
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uBot;
uniform vec3 uReflCol;
uniform vec4 uLook;
uniform float uTransparent;
out vec4 outColor;

// flat headline sheet: rotate into block space, then perspective about the block origin
float sheetAt(vec2 q) {
    vec2 d = q - uO;
    float u = dot(d, uAxes.xy);
    float v = dot(d, uAxes.zw);
    float h = max(uRes.y, 1.0);
    float s = max(0.2, 1.0 + uPersp * max(u, -0.4 * h) / h);
    vec2 tc = (vec2(u, v) * s - uTexRect.xy) / max(uTexRect.zw, vec2(1.0));
    vec2 inside = step(vec2(0.0), tc) * step(tc, vec2(1.0));
    return texture(uTex, clamp(tc, vec2(0.0), vec2(1.0))).r * inside.x * inside.y;
}

// gravity well: sample further out than the pixel, so the sheet is pulled into the funnel
float wellText(vec2 p, out float shade) {
    vec2 w = uBall.xy + vec2(0.0, uWell.x);
    vec2 d = p - w;
    float r = length(d);
    float reach = max(uWell.z, 1.0);
    float g = exp(-(r * r) / (reach * reach));
    vec2 dir = d / max(r, 0.0001);
    vec2 q = w + dir * (r + uWell.y * g);
    shade = 1.0 - uShade * exp(-(r * r) / (reach * reach * 0.35));
    float hole = smoothstep(uWell.w * 0.35, uWell.w + 0.5, r);
    return sheetAt(q) * hole;
}

void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;
    float shade;
    float t = wellText(p, shade);

    float R = max(uBall.z, 1.0);
    vec2 d = (p - uBall.xy) / R;
    float dist = length(d);
    float aa = 1.0 / (R * max(uDpr, 0.5));
    float a = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, dist);
    vec2 dc = d / max(1.0, dist / 0.999);
    float z = sqrt(max(0.0, 1.0 - dot(dc, dc)));
    vec3 n = vec3(dc.x, -dc.y, z);
    float ty = clamp(dc.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(mix(uTop, uMid, clamp(ty * 2.0, 0.0, 1.0)), uBot, clamp(ty * 2.0 - 1.0, 0.0, 1.0));
    vec3 L = normalize(vec3(-0.55, 0.65, 0.75));
    float diff = max(dot(n, L), 0.0);
    vec3 hv = normalize(L + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(n, hv), 0.0), max(uLook.y, 1.0)) * uLook.x;
    vec3 ball = base * (0.7 + 0.42 * diff);
    vec3 rv = reflect(vec3(0.0, 0.0, -1.0), n);
    float rs;
    float rt = wellText(uBall.xy + vec2(rv.x, -rv.y) * R * 2.2, rs);
    float lower = smoothstep(-0.05, 0.55, dc.y);
    ball = mix(ball, uReflCol, clamp(rt * rs * lower * uLook.z, 0.0, 1.0));
    ball += vec3(spec);
    ball *= 1.0 - smoothstep(0.8, 1.0, dist) * uLook.w;

    if (uTransparent > 0.5) {
        float finalAlpha = clamp(t + a, 0.0, 1.0);
        if (finalAlpha <= 0.001) {
            outColor = vec4(0.0, 0.0, 0.0, 0.0);
        } else {
            vec3 textCol = uText * shade;
            vec3 ballCol = clamp(ball, 0.0, 1.0);
            vec3 finalCol = mix(textCol, ballCol, a);
            outColor = vec4(finalCol * finalAlpha, finalAlpha);
        }
    } else {
        vec3 col = mix(uBg, uText * shade, t);
        col = mix(col, clamp(ball, 0.0, 1.0), a);
        outColor = vec4(col, 1.0);
    }
}`

const UNIFORMS = [
    "uRes", "uDpr", "uTex", "uTexRect", "uO", "uAxes", "uPersp", "uBall", "uWell",
    "uShade", "uBg", "uText", "uTop", "uMid", "uBot", "uReflCol", "uLook", "uTransparent",
]

function parseColor(c: unknown, fb: number[]): number[] {
    if (typeof c !== "string") return fb
    let s = c.trim()
    const v = s.match(/^var\([^,]+,\s*(.+)\)$/)
    if (v) s = v[1].trim()
    if (s[0] === "#") {
        let h = s.slice(1)
        if (h.length === 3 || h.length === 4) h = h.split("").map((x) => x + x).join("")
        const n = parseInt(h.slice(0, 6), 16)
        if (isNaN(n)) return fb
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
    }
    const m = s.match(/rgba?\(([^)]+)\)/)
    if (m) {
        const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat)
        if (p.length >= 3) return [p[0] / 255, p[1] / 255, p[2] / 255]
    }
    return fb
}

function parseLetterSpacing(ls: unknown, F: number): number {
    if (typeof ls === "number") return ls
    if (typeof ls !== "string") return -0.01 * F
    const n = parseFloat(ls)
    if (isNaN(n)) return 0
    if (ls.includes("em")) return n * F
    if (ls.includes("%")) return (n / 100) * F
    return n
}

function splitLines(text: unknown): string[] {
    const t = typeof text === "string" ? text : ""
    const lines = (t.includes("\n") ? t.split("\n") : [t]).map((l) => l.trim()).filter(Boolean)
    return lines.length ? lines : [" "]
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
function __OriginkitBase_CerisePlunge(props: CerisePlungeProps) {
    props = withMovedControls(props)
    const {
        text = "HELLO WORLD",
        textColor = "#FFFFFF",
        sphereColor = "#FF8400",
        sphereShade = "#FFC500",
        size = 112,
        pull = 50,
        speed = 50,
        background = "#000000",
        style,
    } = props

    const rootRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const propsRef = useRef<CerisePlungeProps>({})
    propsRef.current = {
        text, textColor, sphereColor, sphereShade, size, pull, speed, background,
        font: props.font, advanced: props.advanced,
    }
    const dimsRef = useRef({ w: 0, h: 0 })
    // pointer as a 0–1 share of the frame; converted to layout px at draw time
    const ptrRef = useRef({ u: 0, v: 0, inside: false, down: false })
    const fontEpochRef = useRef(0)
    const textMetricsRef = useRef({ maxW: 400, cap: 80, pitch: 80, linesCount: 1 })

    // headline web font; rebake the text texture when it arrives
    useEffect(() => {
        if (typeof document === "undefined") return
        const id = "cerise-plunge-fonts"
        if (!document.getElementById(id)) {
            const l = document.createElement("link")
            l.id = id
            l.rel = "stylesheet"
            l.href = FONT_LINK
            document.head.appendChild(l)
        }
        let alive = true
        const bump = () => {
            if (alive) fontEpochRef.current++
        }
        const fonts = document.fonts
        if (fonts) {
            fonts.load('100px "Anton"').then(bump, () => {})
            fonts.ready.then(bump, () => {})
            fonts.addEventListener?.("loadingdone", bump)
        }
        return () => {
            alive = false
            fonts?.removeEventListener?.("loadingdone", bump)
        }
    }, [])

    useEffect(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        if (!root || !canvas) return
        const gl = canvas.getContext("webgl2", {
            antialias: true,
            alpha: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
        }) as WebGL2RenderingContext | null
        if (!gl) return

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!
            gl.shaderSource(s, src)
            gl.compileShader(s)
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                const log = gl.getShaderInfoLog(s)
                gl.deleteShader(s)
                throw new Error("CerisePlunge shader: " + log)
            }
            return s
        }
        const vs = compile(gl.VERTEX_SHADER, VERT)
        const fs = compile(gl.FRAGMENT_SHADER, FRAG)
        const prog = gl.createProgram()!
        gl.attachShader(prog, vs)
        gl.attachShader(prog, fs)
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            throw new Error("CerisePlunge program: " + gl.getProgramInfoLog(prog))
        }
        gl.useProgram(prog)
        const loc: Record<string, WebGLUniformLocation> = {}
        for (const name of UNIFORMS) {
            const l = gl.getUniformLocation(prog, name)
            if (l === null) throw new Error("CerisePlunge: missing uniform " + name)
            loc[name] = l
        }
        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)

        const tex = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.uniform1i(loc.uTex, 0)

        const tcan = document.createElement("canvas")
        const tctx = tcan.getContext("2d")! as CanvasRenderingContext2D & { letterSpacing?: string }
        let texRect = [0, 0, 1, 1]
        let bakeKey = ""

        const bake = (_W: number, H: number, dpr: number, p: CerisePlungeProps, adv: Advanced) => {
            const k = H / 800
            const font = p.font || {}
            const fpx = (typeof font.fontSize === "number" ? font.fontSize : parseFloat(font.fontSize ?? "")) || 136
            let F = Math.max(8, fpx * k)
            const fam = font.fontFamily ? `${font.fontFamily}, ${HEADLINE_FALLBACK}` : HEADLINE_FALLBACK
            const weight = font.fontWeight || 800
            const fstyle = font.fontStyle === "italic" ? "italic" : "normal"
            const lsPx = parseLetterSpacing(font.letterSpacing, F)
            let fontStr = `${fstyle} ${weight} ${F}px ${fam}`
            const lines = splitLines(p.text)
            const setup = () => {
                tctx.font = fontStr
                if ("letterSpacing" in tctx) tctx.letterSpacing = `${lsPx}px`
                tctx.textBaseline = "alphabetic"
            }
            setup()
            let cap = tctx.measureText("H").actualBoundingBoxAscent || F * 0.72
            const stretch = Math.max(0.3, adv.stretch / 100)
            let widths = lines.map((l) => tctx.measureText(l).width * stretch)
            let maxW = Math.max(1, ...widths)
            let pitch = cap + (H * adv.lineGap) / 100

            // Responsive auto-fit: check rotated footprint so it fits comfortably within the canvas without clipping
            if (_W > 50 && H > 50) {
                const rotW = maxW * 0.866 + (cap + (lines.length - 1) * pitch) * 0.5
                const rotH = maxW * 0.5 + (cap + (lines.length - 1) * pitch) * 0.866
                const fitScaleW = (_W * 0.88) / Math.max(1, rotW)
                const fitScaleH = (H * 0.82) / Math.max(1, rotH)
                const fitScale = Math.min(fitScaleW, fitScaleH)
                if (fitScale < 1.0) {
                    F = Math.max(14, F * fitScale)
                    fontStr = `${fstyle} ${weight} ${F}px ${fam}`
                    setup()
                    cap = tctx.measureText("H").actualBoundingBoxAscent || F * 0.72
                    widths = lines.map((l) => tctx.measureText(l).width * stretch)
                    maxW = Math.max(1, ...widths)
                    pitch = cap + (H * adv.lineGap) / 100
                }
            }
            const pad = F * 0.25
            const u0 = -pad
            const v0 = -cap - pad
            const tw = maxW + pad * 2
            const th = (lines.length - 1) * pitch + cap + pad * 2 + F * 0.2
            const ts = Math.max(0.1, Math.min(dpr * 1.25, 4096 / tw, 4096 / th))
            tcan.width = Math.max(1, Math.ceil(tw * ts))
            tcan.height = Math.max(1, Math.ceil(th * ts))
            setup()
            tctx.setTransform(1, 0, 0, 1, 0, 0)
            tctx.fillStyle = "#000"
            tctx.fillRect(0, 0, tcan.width, tcan.height)
            tctx.fillStyle = "#fff"
            lines.forEach((l, i) => {
                tctx.setTransform(ts * stretch, 0, 0, ts, -u0 * ts, (i * pitch - v0) * ts)
                tctx.fillText(l, 0, 0)
            })
            tctx.setTransform(1, 0, 0, 1, 0, 0)
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tcan)
            gl.generateMipmap(gl.TEXTURE_2D)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
            texRect = [u0, v0, tcan.width / ts, tcan.height / ts]

            textMetricsRef.current = { maxW, cap, pitch, linesCount: lines.length }
        }

        const measure = () => {
            dimsRef.current = { w: root.offsetWidth, h: root.offsetHeight }
        }
        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(root)

        const release = () => {
            ptrRef.current.down = false
        }

        const onWindowPointerMove = (e: PointerEvent) => {
            const root = rootRef.current
            if (!root) return
            const r = root.getBoundingClientRect()
            if (r.width < 1 || r.height < 1) return
            ptrRef.current.u = (e.clientX - r.left) / r.width
            ptrRef.current.v = (e.clientY - r.top) / r.height

            // Calculate distance from canvas in screen pixels
            const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
            const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
            const dist = Math.hypot(dx, dy)

            // Tracks smoothly anywhere near or over the footer area
            ptrRef.current.inside = dist < 800
        }

        const onWindowPointerDown = (e: PointerEvent) => {
            onWindowPointerMove(e)
            ptrRef.current.down = true
        }

        const onWindowPointerLeave = () => {
            ptrRef.current.inside = false
            ptrRef.current.down = false
        }

        window.addEventListener("pointermove", onWindowPointerMove, { passive: true })
        window.addEventListener("pointerdown", onWindowPointerDown, { passive: true })
        window.addEventListener("pointerup", release)
        window.addEventListener("pointercancel", release)
        window.addEventListener("blur", onWindowPointerLeave)

        const mql = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null

        let raf = 0
        let last = 0
        let phase = 0
        let ox = 0, oy = 0, vx = 0, vy = 0, down = 0, dv = 0

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick)
            const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 0
            last = now
            const p = propsRef.current
            const adv: Advanced = { ...ADVANCED_DEFAULTS, ...(p.advanced ?? {}) }
            const { w: W, h: H } = dimsRef.current
            if (W < 2 || H < 2) return
            const dpr = Math.min(2, window.devicePixelRatio || 1)
            const cw = Math.round(W * dpr)
            const ch = Math.round(H * dpr)
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw
                canvas.height = ch
            }

            const font = p.font || {}
            const key = [
                W, H, dpr, p.text, font.fontFamily, font.fontWeight, font.fontStyle, font.fontSize,
                font.letterSpacing, adv.lineGap, adv.stretch, fontEpochRef.current,
            ].join("|")
            if (key !== bakeKey) {
                bakeKey = key
                bake(W, H, dpr, p, adv)
            }

            const reduce = mql ? mql.matches : false
            const rate = Math.max(0, p.speed ?? 50) / 50
            if (!reduce) phase = (phase + (dt * rate * 1000) / Math.max(500, adv.loopMs)) % 1
            const th = phase * Math.PI * 2
            const nx = Math.sin(th)
            const ny = Math.max(-1, Math.min(1, Math.sin(th) * 0.8 + Math.sin(2 * th) * 0.35))

            const k = H / 800
            const a = (adv.angle * Math.PI) / 180
            const cosA = Math.cos(a)
            const sinA = Math.sin(a)

            // Center of text block and resting sphere position:
            const { maxW, cap, pitch, linesCount } = textMetricsRef.current
            const baseR = (Math.max(4, p.size ?? 112) / 2) * k
            const R = baseR * (1 + (adv.breathe / 100) * ny)

            // For multi-line ("THANK\nYOU"): sphere nests to the right of line 2, below line 1
            const u_sphere = linesCount > 1 ? maxW * 0.95 : maxW + R * 0.8
            const v_sphere = linesCount > 1 ? pitch * 0.82 : -cap / 2

            // Visual center of the combined group (text + sphere)
            const u_center = (u_sphere + R * 0.8) / 2
            const v_center = linesCount > 1 ? (pitch - cap) / 2 : -cap / 2

            // Invert the rotation so (W/2, H/2) maps exactly to (u_center, v_center)
            const dx = u_center * cosA + v_center * sinA
            const dy = -u_center * sinA + v_center * cosA

            // Nudge offsets if user specified blockX/blockY other than 50
            const offsetX = ((adv.blockX - 50) / 100) * W
            const offsetY = ((adv.blockY - 50) / 100) * H

            const uOx = W / 2 - dx + offsetX
            const uOy = H / 2 - dy + offsetY

            // Resting sphere screen position (rotated with text)
            const cx_rest = uOx + (u_sphere * cosA + v_sphere * sinA)
            const cy_rest = uOy + (-u_sphere * sinA + v_sphere * cosA)

            // Idle sphere drift around its resting anchor
            let cx = cx_rest + (H * adv.sphereX) / 100 + (nx * H * adv.driftX) / 100
            let cy = cy_rest + (H * adv.sphereY) / 100 + (ny * H * adv.driftY) / 100

            // pointer: the sphere springs onto the cursor (Hover = share of the
            // way there), returns to its drift path on leave; press deepens the well
            const hv = reduce ? 0 : Math.max(0, adv.hover) / 100
            const ptr = ptrRef.current
            let tx = 0, ty = 0
            if (ptr.inside && hv > 0) {
                tx = (ptr.u * W - cx) * hv
                ty = (ptr.v * H - cy) * hv
            }
            const dTarget = ptr.down && hv > 0 ? 1 : 0
            const om = 4.7 / Math.max(0.05, adv.followMs / 1000)
            const steps = Math.max(1, Math.ceil((dt * om) / 0.3))
            const h = dt / steps
            for (let i = 0; i < steps; i++) {
                vx += (om * om * (tx - ox) - 2 * om * vx) * h
                vy += (om * om * (ty - oy) - 2 * om * vy) * h
                ox += vx * h
                oy += vy * h
                dv += (om * om * (dTarget - down) - 2 * om * dv) * h
                down += dv * h
            }
            cx += ox
            cy += oy

            const depth = (1 + (adv.depthSwing / 100) * 0.5 * ny) * (1 + (adv.pressBoost / 100) * down * hv)
            const reach = Math.max(1, (adv.reach / 100) * R)
            const amp = Math.min((Math.max(0, p.pull ?? 50) / 50) * 1.3 * depth * R, reach * 1.1)

            const isTransparent = !p.background || p.background === "transparent" || p.background === "none"
            const bg = parseColor(p.background, [0, 0, 0])
            const tc = parseColor(p.textColor, [1, 1, 1])
            const top = parseColor(p.sphereColor, [0.94, 0.1, 0.56])
            const mid = parseColor(adv.sphereMid, [0.82, 0.09, 0.6])
            const bot = parseColor(p.sphereShade, [0.42, 0.21, 0.75])
            const rc = parseColor(adv.reflectColor, [0.69, 0.5, 0.88])

            gl.viewport(0, 0, cw, ch)
            gl.clearColor(0.0, 0.0, 0.0, 0.0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.useProgram(prog)
            gl.bindVertexArray(vao)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.uniform2f(loc.uRes, W, H)
            gl.uniform1f(loc.uDpr, cw / W)
            gl.uniform4f(loc.uTexRect, texRect[0], texRect[1], texRect[2], texRect[3])
            gl.uniform2f(loc.uO, uOx, uOy)
            gl.uniform4f(loc.uAxes, cosA, -sinA, sinA, cosA)
            gl.uniform1f(loc.uPersp, adv.perspective / 100)
            gl.uniform3f(loc.uBall, cx, cy, R)
            gl.uniform4f(loc.uWell, (adv.wellDrop / 100) * R, amp, reach, (adv.holeSize / 100) * R)
            gl.uniform1f(loc.uShade, adv.funnelShade / 100)
            gl.uniform3f(loc.uBg, bg[0], bg[1], bg[2])
            gl.uniform3f(loc.uText, tc[0], tc[1], tc[2])
            gl.uniform3f(loc.uTop, top[0], top[1], top[2])
            gl.uniform3f(loc.uMid, mid[0], mid[1], mid[2])
            gl.uniform3f(loc.uBot, bot[0], bot[1], bot[2])
            gl.uniform3f(loc.uReflCol, rc[0], rc[1], rc[2])
            gl.uniform4f(loc.uLook, adv.specular / 100, adv.specPower, adv.reflection / 100, adv.rimDark / 100)
            gl.uniform1f(loc.uTransparent, isTransparent ? 1.0 : 0.0)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            window.removeEventListener("pointermove", onWindowPointerMove)
            window.removeEventListener("pointerdown", onWindowPointerDown)
            window.removeEventListener("pointerup", release)
            window.removeEventListener("pointercancel", release)
            window.removeEventListener("blur", onWindowPointerLeave)
            gl.deleteTexture(tex)
            gl.deleteVertexArray(vao)
            gl.deleteProgram(prog)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
        }
    }, [])

    const adv: Advanced = { ...ADVANCED_DEFAULTS, ...(props.advanced ?? {}) }
    const grainUrl =
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 -0.3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

    return (
        <div
            ref={rootRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "visible",
                background: background === "transparent" || !background ? "transparent" : background,
                isolation: "isolate",
                touchAction: "none",
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", background: "transparent" }}
            />
            {adv.vignette > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,${Math.min(1, adv.vignette / 100)}) 100%)`,
                    }}
                />
            )}
            {adv.grain > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        backgroundImage: grainUrl,
                        backgroundSize: "160px 160px",
                        opacity: Math.min(1, adv.grain / 100) * 0.5,
                    }}
                />
            )}
        </div>
    )
}

const __originkitPresetProps = {
  "advanced": {
    "angle": 30,
    "perspective": 70,
    "stretch": 126,
    "grain": 0,
    "hover": 87,
    "driftX": 3,
    "driftY": 3,
    "loopMs": 8000,
    "breathe": 3,
    "rimDark": 30,
    "sphereX": 0,
    "sphereY": 0,
    "holeSize": 35,
    "specular": 55,
    "vignette": 0,
    "wellDrop": 80,
    "specPower": 40,
    "depthSwing": 15,
    "pressBoost": 20,
    "reflection": 40,
    "funnelShade": 40
  }
};

export default function CerisePlunge(props: Record<string, unknown>) {
  return <__OriginkitBase_CerisePlunge {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
