// Pipeline stages behave as tabs: one log panel visible at a time.
// Without JS every log stays visible.
const tabs = [...document.querySelectorAll(".stage")];

function select(tab, focus) {
    tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
}

tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", e => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
});

if (tabs.length) select(tabs.find(t => t.getAttribute("aria-selected") === "true") || tabs[0]);
