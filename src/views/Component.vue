<template>
  <v-container>
    <!-- ------------- Page title --------------- -->
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">Customize Your Character</h1>
      </v-col>
    </v-row>

    <!-- ------------- Character name --------------- -->
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>What is your name?</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="firstName"
              label="First Name"
              outlined
            />
          </v-card-text>

          <!-- ------------- Hair colour --------------- -->
          <v-card-text>
            <p>Pick a hair color:</p>
            <v-row>
              <v-col
                v-for="color in hairColors"
                :key="color.name"
                cols="6"
                md="4"
              >
                <v-btn
                  :style="{ backgroundColor: color.hex, color: color.textColor }"
                  :class="{ 'selected-color': hairColor === color.name }"
                  block
                  @click="selectHairColor(color.name)"
                >
                  {{ color.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- ------------- Skin colour slider --------------- -->
          <v-card-text>
            <p>Pick a skin color:</p>

            <!-- Gradient background + thumb overlay -->
            <div class="skin-picker">
              <input
                type="range"
                v-model="skinColorValue"
                min="0"
                max="100"
                @input="updateSkinColor"
                class="skin-range"
              />
            </div>

            <!-- Show currently selected colour next to the slider -->
            <div
              class="selected-skin"
              :style="{ backgroundColor: selectedSkinColor }"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ------------- Finish button --------------- -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="navigateToNextPage">
          Customization Complete
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CharacterCustomizer",
  data() {
    return {
      firstName: "",
      hairColor: "",
      hairColors: [
        { name: "Black", hex: "#000000", textColor: "#FFFFFF" },
        { name: "Brown", hex: "#8B4513", textColor: "#FFFFFF" },
        { name: "Blonde", hex: "#FFD700", textColor: "#000000" },
        { name: "Red", hex: "#FF0000", textColor: "#FFFFFF" },
        { name: "Gray", hex: "#808080", textColor: "#FFFFFF" },
        { name: "Pink", hex: "#FFC0CB", textColor: "#000000" },
        { name: "Blue", hex: "#0000FF", textColor: "#FFFFFF" },
      ],

      // slider value (0‑100), which we map to a skin‑tint
      skinColorValue: 50,
      // gradient used as the background of the picker
      skinGradient:
        "linear-gradient(to right, #FBE7C6, #F5CBA7, #D2A679, #A67C52, #6E4C2E)",
      selectedSkinColor: "#D2A679", // init with middle value
    };
  },
  methods: {
    /** Switch hair colour */
    selectHairColor(name) {
      this.hairColor = name;
    },

    /** Map slider value → colour */
    updateSkinColor() {
      const stops = [
        "#FBE7C6",
        "#F5CBA7",
        "#D2A679",
        "#A67C52",
        "#6E4C2E",
      ];
      const idx = Math.floor(
        (this.skinColorValue / 100) * (stops.length - 1)
      );
      this.selectedSkinColor = stops[idx];
    },

    /** Persist selections and move to next page */
    navigateToNextPage() {
      localStorage.setItem("firstName", this.firstName);
      localStorage.setItem("hairColor", this.hairColor);
      localStorage.setItem("skinColor", this.selectedSkinColor);
      this.$router.push("/next-page");
    },
  },
};
</script>

<style scoped>
/* ------------------------------------------------------------------
   Skin‑colour picker layout
   ------------------------------------------------------------------ */
.skin-picker {
  position: relative;
  height: 20px;
  border-radius: 10px;
  width: 100%;
}

.skin-picker::before {
  /* The gradient stripe */
  content: "";
  position: absolute;
  inset: 0;
  background: v-bind("skinGradient");
  border-radius: inherit;
}

/* ----- The range input that sits on top of the gradient ----- */
.skin-range {
  -webkit-appearance: none; /* reset default */
  width: 100%;
  height: 100%;
  background: transparent; /* let the ::before gradient show */
  position: relative;
  z-index: 2; /* on top of the pseudo element */
  outline: none;
}

/* ----- Thumb for WebKit (Chrome, Safari) ----- */
.skin-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #555;
  cursor: pointer;
  margin-top: -6px; /* center vertically */
}

/* ----- Thumb for Firefox ----- */
.skin-range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #555;
  cursor: pointer;
}

/* ---------- Display the chosen colour next to the slider -------- */
.selected-skin {
  height: 20px;
  margin-top: 8px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #ccc;
}
</style>