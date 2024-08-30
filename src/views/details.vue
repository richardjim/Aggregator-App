<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
      <select
        id="building-select"
        class="border border-gray-400 p-3 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium shadow-md hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" class="text-gray-400">Select Building</option>
        <option v-for="i in buildings" :key="i" :value="'CMH' + i">
          CMH{{ i }}
        </option>
      </select>
      <span class="text-gray-500 ml-2 text-sm font-medium">ROUNDS</span>
    </h1>
    <div id="form-container" class="bg-gray-50 shadow-md rounded-lg p-6">
      <!-- Header Section -->
      <div class="section mb-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">
          <input
            type="text"
            value="BUILDING WALKTHROUGH"
            class="border-b border-gray-400 focus:outline-none w-full text-center bg-transparent text-lg font-semibold"
            placeholder="Enter building walkthrough details"
          />
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Fire Alarm Panel -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium"
              >Fire Alarm Panel</label
            >
            <select
              name="fire_alarm_panel"
              class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium w-full"
            >
              <option value="Normal">Normal</option>
              <option value="Alarm">Alarm</option>
            </select>
          </div>

          <!-- Date -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium">DATE:</label>
            <input
              type="date"
              id="date"
              v-model="currentDate"
              class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <!-- Audio Visual Disabled -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium"
              >Audio Visual Disabled</label
            >
            <div class="flex gap-4">
              <label class="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="audio_visual"
                  value="Y"
                  class="mr-2"
                />
                Y
              </label>
              <label class="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="audio_visual"
                  value="N"
                  class="mr-2"
                />
                N
              </label>
            </div>
          </div>

          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium">NAME:</label>
            <input
              type="text"
              id="name"
              class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <!-- Relays Disabled -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium"
              >Relays Disabled</label
            >
            <div class="flex gap-4">
              <label class="flex items-center text-gray-700">
                <input type="radio" name="relays" value="Y" class="mr-2" />
                Y
              </label>
              <label class="flex items-center text-gray-700">
                <input type="radio" name="relays" value="N" class="mr-2" />
                N
              </label>
            </div>
          </div>

          <!-- Start Time -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium">START TIME:</label>
            <input
              type="time"
              id="start-time"
              class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <!-- Building in Test -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium"
              >Building in Test</label
            >
            <div class="flex gap-4">
              <label class="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="building_test"
                  value="Y"
                  class="mr-2"
                />
                Y
              </label>
              <label class="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="building_test"
                  value="N"
                  class="mr-2"
                />
                N
              </label>
            </div>
          </div>

          <!-- End Time -->
          <div class="flex flex-col gap-2">
            <label class="text-gray-700 text-sm font-medium">END TIME:</label>
            <input
              type="time"
              id="end-time"
              class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
            />
          </div>
        </div>
        <div class="notes mt-4">
          <h3 class="text-lg font-medium mb-2 text-gray-800">NOTES:</h3>
          <textarea
            placeholder="Verify all 'In Progress' MCM's are being worked on, if not, place MCM back to Pause"
            class="w-full border border-gray-400 p-4 rounded-lg bg-gray-100 text-gray-800 h-24 text-sm"
          ></textarea>
        </div>
        <div class="signature mt-4">
          <h3 class="text-lg font-medium mb-2 text-gray-800">Signature:</h3>
          <canvas
            ref="signaturePad"
            class="signature-pad border border-gray-400 w-full h-24 rounded-lg bg-gray-100"
          ></canvas>
          <button
            @click="clearSignature"
            class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Clear Signature
          </button>
        </div>
        <div class="initials mt-4">
          <label class="block text-sm text-gray-800">DCEO INITIAL:</label>
          <input
            type="text"
            class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 w-full text-sm"
          />
        </div>

        <!-- EPMS and BMS Section -->
        <div class="section mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-medium mb-4 text-gray-800">EPMS & BMS</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- EPMS Section -->
            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >EPMS New ALARM Activity:</label
                >
                <textarea
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
                ></textarea>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >Upload all new alarms:</label
                >
                <input
                  type="file"
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full upload-field"
                />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >List all new alarms below:</label
                >
                <textarea
                  rows="5"
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
                ></textarea>
              </div>
            </div>

            <!-- BMS Section -->
            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >ACS New ALARM Activity:</label
                >
                <textarea
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
                ></textarea>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >Upload all new alarms:</label
                >
                <input
                  type="file"
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full upload-field"
                />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium"
                  >List all new alarms below:</label
                >
                <textarea
                  rows="5"
                  class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
                ></textarea>
              </div>
            </div>
            
          </div>
          
        </div>

        <!-- Submit Button -->
        <!-- <div class="mt-6 text-center">
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div> -->
        <!-- Checks Section -->
      </div>
    </div>
  
  
  <!-- Checks Section -->
  <div class="section mt-6">
      <h3 class="text-lg font-medium mb-4 text-gray-800">Checks</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Check for Comm Failures -->
        <div class="flex flex-col gap-2">
          <label class="text-gray-700 text-sm font-medium">
            Check For Comm Failures
          </label>
          <div class="flex items-center gap-4">
            <label class="flex items-center text-gray-700">
              <input type="radio" name="comm_failures" value="Y" class="mr-2" />
              Y
            </label>
            <label class="flex items-center text-gray-700">
              <input type="radio" name="comm_failures" value="N" class="mr-2" />
              N
            </label>
          </div>
        </div>

        <!-- Check Graphic Overview/Equipment -->
        <div class="flex flex-col gap-2">
          <label class="text-gray-700 text-sm font-medium">
            Check Graphic Overview/Equipment
          </label>
          <div class="flex items-center gap-4">
            <label class="flex items-center text-gray-700">
              <input
                type="radio"
                name="graphic_overview"
                value="Y"
                class="mr-2"
              />
              Y
            </label>
            <label class="flex items-center text-gray-700">
              <input
                type="radio"
                name="graphic_overview"
                value="N"
                class="mr-2"
              />
              N
            </label>
          </div>
        </div>

        <!-- Verify PUE -->
        <div class="flex flex-col gap-2 mt-4">
          <label class="text-gray-700 text-sm font-medium">Verify PUE</label>
          <input
            type="text"
            class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
          />
        </div>

        <!-- Verify Temps/Pressures Acceptable -->
        <div class="flex flex-col gap-2 mt-4">
          <label class="text-gray-700 text-sm font-medium">
            Verify Temps/Pressures Acceptable
          </label>
          <div class="flex items-center gap-4">
            <label class="flex items-center text-gray-700">
              <input
                type="radio"
                name="temps_pressures"
                value="Y"
                class="mr-2"
              />
              Y
            </label>
            <label class="flex items-center text-gray-700">
              <input
                type="radio"
                name="temps_pressures"
                value="N"
                class="mr-2"
              />
              N
            </label>
          </div>
        </div>

        <!-- Check Onelines -->
        <div class="flex flex-col gap-2 mt-4">
          <label class="text-gray-700 text-sm font-medium">Check Onelines</label>
          <div class="flex items-center gap-4">
            <label class="flex items-center text-gray-700">
              <input type="radio" name="onelines" value="Y" class="mr-2" />
              Y
            </label>
            <label class="flex items-center text-gray-700">
              <input type="radio" name="onelines" value="N" class="mr-2" />
              N
            </label>
          </div>
        </div>

        <!-- Create TT as needed -->
        <div class="flex flex-col gap-2 mt-4">
          <label class="text-gray-700 text-sm font-medium">
            Create TT as needed
          </label>
          <input
            type="text"
            class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
          />
        </div>

        <!-- Check AHU -->
        <div class="flex flex-col gap-2 mt-4">
          <label class="text-gray-700 text-sm font-medium">Check AHU</label>
          <div class="flex items-center gap-4">
            <label class="flex items-center text-gray-700">
              <input type="radio" name="ahu" value="Y" class="mr-2" />
              Y
            </label>
            <label class="flex items-center text-gray-700">
              <input type="radio" name="ahu" value="N" class="mr-2" />
              N
            </label>
          </div>
        </div>
      </div>

 <!-- Dynamic Sections -->
 <div v-for="(section, index) in sections" :key="index" class="mt-4">
  <div class="grid grid-cols-1  gap-1">
   
    <!-- New Section Format -->
    <div class="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <!-- Editable Label -->
      <input
        type="text"
        v-model="section.label"
        placeholder="Enter section label"
        class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm w-full"
      />
      <!-- Radio Buttons and Input Field -->
      <div class="flex items-center gap-4">
        <label class="flex items-center text-gray-700">
          <input
            type="radio"
            name="temps_pressures"
            v-model="section.temps_pressures"
            value="Y"
            class="mr-2"
          />
          Y
        </label>
        <label class="flex items-center text-gray-700">
          <input
            type="radio"
            name="temps_pressures"
            v-model="section.temps_pressures"
            value="N"
            class="mr-2"
          />
          N
        </label>
        <!-- Input Field on the Side -->
        <input
          type="text"
          v-model="section.temp_input"
          placeholder="Specify value"
          class="border border-gray-400 p-2 rounded-lg bg-gray-100 text-gray-800 text-sm flex-1"
        />
      </div>
    </div>
  </div>
</div>







  <!-- Buttons -->
  <div class="flex gap-4 mt-6">
    <button
      @click="addRow"
      class="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
    >
      Add Row
    </button>
    <button
      @click="save"
      class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
    >
      Save
    </button>
    <button
      @click="edit"
      class="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600"
    >
      Edit
    </button>
    <button
      @click="deleteRow"
      class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
    >
      Delete
    </button>
  </div>
    </div>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      buildings: Array.from({ length: 31 }, (_, i) => i + 70),
      currentDate: new Date().toISOString().split("T")[0],
      signaturePad: null,
      checks: [
        { label1: "Check For Comm failures", label2: "Check Graphic Overview/Equipment" },
        { label1: "Verify PUE", label2: "Verify Temps/Pressures Acceptable" },
        { label1: "Check Onelines", label2: "Create TT as needed" },
        { label1: "Create TT as needed", label2: "Check AHU" }
      ],
      sections: [
      { label: 'Verify Temps/Pressures Acceptable', value: '' },
      { label: 'Another Section', value: '' },
      // Add more sections as needed
    ],
    };

  },
  mounted() {
    // Initialize SignaturePad
    const canvas = this.$refs.signaturePad;
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: 0.5,
      maxWidth: 2.5,
      penColor: "black",
      backgroundColor: "white",
    });
    window.addEventListener("resize", this.resizeCanvas);
    this.resizeCanvas();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCanvas);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    addRow() {
      this.sections.push({ name: '', details: '' });
    },
    save() {
      console.log('Save button clicked', this.sections);
      // Implement the save logic, e.g., send the data to an API.
    },
    edit() {
      console.log('Edit button clicked');
      // Implement the edit logic, such as enabling/disabling editing of sections.
    },
    deleteRow(index) {
      this.sections.splice(index, 1);
    },
    clearSignature() {
      this.signaturePad.clear();
    },
    resizeCanvas() {
      const canvas = this.$refs.signaturePad;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.signaturePad.clear();
    },
  },
};
</script>

<style scoped>
.signature-pad {
  touch-action: none; /* Allow touch interactions */
}
.section {
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.upload-field {
  padding: 6px;
  border-radius: 0.375rem;
  border-color: #d1d5db;
  background-color: #f9fafb;
  font-size: 0.875rem;
  color: #4b5563;
}

.upload-field:hover {
  border-color: #a1a1a1;
}

.signature-pad {
  border: 2px dashed #d1d5db;
  background-color: #f9fafb;
}

.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}

.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}

@media (min-width: 640px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}
</style>