const radius = 5;

TweenMax.staggerFromTo('.blob', 5, 
{
    cycle: {
        attr: function (i) {
            const r = i * 90;
            return {
                transform: 'rotate(' + r + ') translate(' + radius + ', 0.1) rotate(' + (-r) + ')'
            }
        }
    }
}, {
    cycle: {
        attr: function (i) {
            const r = i * 90 + 360;
            return {
                transform: 'rotate(' + r + ') translate(' + radius + ', 0.1) rotate(' + (-r) + ')'
            }
        }
    },
    ease: Linear.easeNone,
    repeat: -1
});