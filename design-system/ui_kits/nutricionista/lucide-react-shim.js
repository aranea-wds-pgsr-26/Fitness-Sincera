// lucide-react-shim.js
// The lucide-react UMD build does not populate a usable global in this runtime,
// so we rebuild a lucide-react-compatible API from the plain `lucide` UMD.
// The screens use window.LucideReact.<IconName> as React components
// (e.g. <LucideReact.Camera size={24} color="#000" strokeWidth={3} />).
(function () {
  var lucide = window.lucide;
  var React = window.React;
  if (!lucide || !React) {
    console.error("lucide-react-shim: `lucide` or `React` not loaded before this script.");
    window.LucideReact = window.LucideReact || {};
    return;
  }

  function toReactProps(attrs) {
    var p = {};
    for (var k in attrs) {
      var key = k.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
      p[key] = attrs[k];
    }
    return p;
  }

  var cache = {};
  function makeIcon(name, node) {
    if (cache[name]) return cache[name];
    var Comp = React.forwardRef(function (props, ref) {
      props = props || {};
      var size = props.size == null ? 24 : props.size;
      var color = props.color || "currentColor";
      var strokeWidth = props.strokeWidth == null ? 2 : props.strokeWidth;
      var rest = {};
      for (var k in props) {
        if (k === "size" || k === "color" || k === "strokeWidth" || k === "absoluteStrokeWidth") continue;
        rest[k] = props[k];
      }
      var children = node.map(function (child, i) {
        var a = toReactProps(child[1] || {});
        a.key = i;
        return React.createElement(child[0], a);
      });
      var svgProps = Object.assign({
        ref: ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, rest);
      return React.createElement("svg", svgProps, children);
    });
    Comp.displayName = name;
    cache[name] = Comp;
    return Comp;
  }

  var registry = lucide.icons || lucide;

  window.LucideReact = new Proxy({}, {
    get: function (obj, prop) {
      if (typeof prop !== "string") return obj[prop];
      if (prop === "__esModule") return true;
      var node = registry[prop] || lucide[prop];
      if (Array.isArray(node)) return makeIcon(prop, node);
      return undefined;
    },
    has: function () { return true; }
  });
})();
