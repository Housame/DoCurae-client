<template>
    <div >
        <div class="icon-item" :class="getBackground" :style="{ width: calculatedSize(true), height: calculatedSize(true), background: background && bgcolor }" >
            <div
              v-if="iconText"
              class="icon-text"
              :style="{width: calculatedSize(), height: calculatedSize(), color: color, 'font-size': fontSize}"
            >
              {{ iconText }}
            </div>
            <svgicon
              v-if="!iconText"
              :icon="iconname" 
              :style="{width: calculatedSize(true), height: calculatedSize(true)}" :color="color" style="margin: 0 auto;"></svgicon>
        </div>
    </div>
</template>

<script>
import "@/compiled-icons";
export default {
  name: "ico-item",
  props: [
    "iconcolor",
    "iconsize",
    "iconname",
    "background",
    "iconText",
    "size",
    "standard",
    "fontSize",
    "backgroundColor"
  ],
  data() {
    return {
      ic: "#14abf4",
      bgsize: "",
      bgtype: ""
    };
  },
  methods: {
    calculatedSize: function(icon) {
      let size2;
      if (this.iconsize === "x-large") {
        this.bgsize = "icon-large";
        size2 = this.size || "150";
      }
      else if (this.iconsize === "large") {
        this.bgsize = "icon-large";
        size2 = this.size || "100";
      } else if (this.iconsize === "medium") {
        this.bgsize = "icon-medium";
        size2 = this.size || "50";
      } else {
        this.bgsize = "icon-small";
        size2 = this.size || "34";
      }

      if (this.standard) {
        size2 = this.$mq === "mobile" || this.$mq === "tablet" ? 40 : 46;
        if (icon) {
          size2 -= 6;
        }
      }

      if (this.size) {
        if (icon) {
          size2 -= 6;
        }
      }

      return size2 + "px";
    },
  },
  computed: {
    getBackground() {
      if (this.background) {
        return [this.bgsize, this.bgtype, "icon-bg-color"];
      }
    },
    color() {
      switch (this.iconcolor) {
        case "green":
          return "#73c68b";

        case "blue":
          return "#14abf4";

        case "red":
          return "#ff7878";

        case "yellow": 
          return "#ffb73a"

        case "purple":
          return "#9986f2"

        case "gray":
          return "#aaaaaa"

        case "white": 
          return "#ffffff";

        case "bolblue": 
          return "#415770";
          
        default:
          return this.iconcolor;
      }
    },
    bgcolor() {
      if (this.backgroundColor) {
        return this.backgroundColor
      }
      switch (this.iconcolor) {
        case "green": 
          return "#edf5e6";
        
        case "blue": 
          return "#e7f5fe";
          
        case "red": 
          return "#ffebeb";
        
        case "yellow": 
          return "#fff4df";
        
        case "purple": 
          return "#ece9fb";
        
        case "gray":
        case "white": 
          return "#eeeeee";
        
        default:
          return "";
        
      }
    }
  }
};
</script>
<style scoped>
.icon-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}
.icon-bg-none {
  display: flex;
  align-items: center;
}
.icon-small {
  font-size: 13px;
}
.icon-large {
  font-size: 40px;
}
.icon-green {
  background-color: #edf5e6;
}
.icon-blue {
  background-color: #e7f5fe;
}
.icon-red {
  background-color: #ffebeb;
}
.icon-yellow {
  background-color: #fff4df;
}
.icon-purple {
  background-color: #ece9fb;
}
.icon-gray {
  background-color: #eeeeee;
}
.icon-white {
  background-color: #eeeeee;
}
.icon-bg-disabled {
  display: none;
}
.icon-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>