<template>
  <div class="mandelbrot-container">
    <canvas 
      ref="canvas" 
      width="800" 
      height="800"
      @mousedown="zoom"
      class="border border-gray-300 cursor-crosshair"
    ></canvas>
    <div class="info-panel mt-4 p-4 bg-gray-100 rounded">
      <p class="text-sm"><strong>Click to zoom in!</strong></p>
      <p class="text-xs mt-2">Location: {{ interestingPoints[currentPointIndex].name }}</p>
      <p class="text-xs">X: {{ xmin.toFixed(6) }}</p>
      <p class="text-xs">Y: {{ ymin.toFixed(6) }}</p>
      <p class="text-xs">Scale: {{ scale.toFixed(2) }}</p>
      <p class="text-xs" v-if="isAutoZooming">Progress: {{ zoomProgress }}/{{ maxZoomSteps }}</p>
      <p class="text-xs text-orange-600" v-if="isAutoZooming && sameFrameCount > 0">
        ⚠ Boring region detected: {{ sameFrameCount }}/{{ maxSameFrames }}
      </p>
      
      <div class="mt-3">
        <label class="text-xs block mb-1">Color Scheme:</label>
        <select 
          v-model="colorScheme" 
          @change="mandel"
          class="w-full px-3 py-2 border rounded"
        >
          <option value="fire">Fire (Red-Yellow-White)</option>
          <option value="ocean">Ocean (Blue-Cyan-White)</option>
          <option value="sunset">Sunset (Orange-Pink-Purple)</option>
          <option value="forest">Forest (Green-Teal-Brown)</option>
          <option value="lavender">Lavender Dream (Purple-Pink-White)</option>
          <option value="copper">Copper (Brown-Orange-Gold)</option>
          <option value="ice">Ice (White-Cyan-Blue)</option>
          <option value="cherry">Cherry Blossom (Pink-White-Rose)</option>
          <option value="midnight">Midnight (Navy-Purple-Magenta)</option>
          <option value="autumn">Autumn (Red-Orange-Yellow-Brown)</option>
          <option value="mint">Mint (Mint-Teal-Emerald)</option>
          <option value="peacock">Peacock (Teal-Blue-Green-Gold)</option>
          <option value="rainbow">Rainbow</option>
          <option value="grayscale">Grayscale</option>
          <option value="rgb">Red-Green-Blue (Classic)</option>
        </select>
      </div>
      
      <div class="mt-3">
        <label class="text-xs block mb-1">Select Region to Zoom:</label>
        <select 
          v-model="selectedRegion" 
          @change="jumpToRegion"
          class="w-full px-3 py-2 border rounded"
        >
          <option :value="null">-- Choose a region --</option>
          <option v-for="(point, index) in interestingPoints" :key="index" :value="index">
            {{ point.name }}
          </option>
        </select>
      </div>
      
      <div class="flex gap-2 mt-3">
        <button 
          @click="toggleAutoZoom" 
          :class="[
            'px-4 py-2 rounded transition',
            isAutoZooming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600',
            'text-white'
          ]"
        >
          {{ isAutoZooming ? 'Stop Auto Zoom' : 'Start Auto Zoom' }}
        </button>
        <button 
          @click="reset" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Reset
        </button>
      </div>
      <div class="mt-3">
        <label class="text-xs block mb-1">Zoom Speed: {{ zoomSpeed }}ms ({{ Math.round(1000/zoomSpeed) }} fps)</label>
        <input 
          v-model.number="zoomSpeed" 
          type="range" 
          min="16" 
          max="200" 
          step="16"
          class="w-full"
          :disabled="isAutoZooming"
        />
        <div class="flex justify-between text-xs text-gray-500">
          <span>Fast (60fps)</span>
          <span>Slow (5fps)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const canvas = ref(null);
const xmin = ref(-2);
const ymin = ref(-2);
const scale = ref(50);
const isAutoZooming = ref(false);
const zoomSpeed = ref(50); // Default to ~20 fps for smooth video-like motion
const colorScheme = ref('fire');
const selectedRegion = ref(null);
let autoZoomInterval = null;

// Frame comparison for detecting boring regions
let previousFrameData = null;
let sameFrameCount = 0;
const maxSameFrames = 200; // Skip after 10 identical frames
const similarityThreshold = 0.99; // 95% similarity = boring

// Color scheme generators
const generatePalette = (scheme) => {
  const palette = [];
  
  for (let i = 0; i < 256; i++) {
    let r, g, b;
    const t = i / 255; // Normalized 0-1
    
    switch(scheme) {
      case 'fire':
        // Fire: Black -> Red -> Orange -> Yellow -> White
        if (t < 0.25) {
          r = Math.floor(t * 4 * 255);
          g = 0;
          b = 0;
        } else if (t < 0.5) {
          r = 255;
          g = Math.floor((t - 0.25) * 4 * 255);
          b = 0;
        } else if (t < 0.75) {
          r = 255;
          g = 255;
          b = Math.floor((t - 0.5) * 4 * 255);
        } else {
          r = 255;
          g = 255;
          b = 255;
        }
        break;
        
      case 'ocean':
        // Ocean: Dark blue -> Cyan -> Light blue -> White
        r = Math.floor(t * 200);
        g = Math.floor(t * 255);
        b = Math.floor(150 + t * 105);
        break;
        
      case 'sunset':
        // Sunset: Deep orange -> Pink -> Purple -> Dark purple
        r = Math.floor(255 - t * 100);
        g = Math.floor(100 + Math.sin(t * Math.PI) * 155);
        b = Math.floor(150 + t * 105);
        break;
        
      case 'forest':
        // Forest: Dark green -> Bright green -> Teal -> Light brown
        r = Math.floor(34 + t * 150);
        g = Math.floor(139 + t * 80);
        b = Math.floor(34 + t * 60);
        break;
        
      case 'lavender':
        // Lavender: Deep purple -> Lavender -> Pink -> White
        r = Math.floor(150 + t * 105);
        g = Math.floor(100 + t * 155);
        b = Math.floor(200 + t * 55);
        break;
        
      case 'copper':
        // Copper: Dark brown -> Copper -> Orange -> Gold
        r = Math.floor(100 + t * 155);
        g = Math.floor(50 + t * 150);
        b = Math.floor(20 + t * 80);
        break;
        
      case 'ice':
        // Ice: White -> Light cyan -> Blue -> Navy
        r = Math.floor(255 - t * 100);
        g = Math.floor(255 - t * 80);
        b = 255;
        break;
        
      case 'cherry':
        // Cherry Blossom: Soft pink -> Rose -> Deep pink -> White
        r = Math.floor(255 - t * 50);
        g = Math.floor(182 + Math.sin(t * Math.PI) * 73);
        b = Math.floor(193 + t * 62);
        break;
        
      case 'midnight':
        // Midnight: Navy -> Purple -> Magenta -> Bright pink
        r = Math.floor(25 + t * 230);
        g = Math.floor(25 + t * 100);
        b = Math.floor(112 + t * 143);
        break;
        
      case 'autumn':
        // Autumn: Deep red -> Orange -> Yellow -> Brown
        if (t < 0.33) {
          r = 139 + Math.floor(t * 3 * 116);
          g = Math.floor(t * 3 * 100);
          b = 0;
        } else if (t < 0.66) {
          r = 255;
          g = 100 + Math.floor((t - 0.33) * 3 * 155);
          b = 0;
        } else {
          r = Math.floor(255 - (t - 0.66) * 3 * 100);
          g = Math.floor(255 - (t - 0.66) * 3 * 155);
          b = Math.floor((t - 0.66) * 3 * 100);
        }
        break;
        
      case 'mint':
        // Mint: White -> Mint -> Teal -> Emerald
        r = Math.floor(152 - t * 100);
        g = Math.floor(251 - t * 51);
        b = Math.floor(152 + t * 50);
        break;
        
      case 'peacock':
        // Peacock: Teal -> Blue -> Green -> Gold
        r = Math.floor(0 + Math.sin(t * Math.PI) * 255);
        g = Math.floor(128 + Math.sin(t * Math.PI * 2) * 127);
        b = Math.floor(128 + Math.cos(t * Math.PI) * 127);
        break;
      
      case 'rainbow':
        // Rainbow spectrum
        const hue = t * 360;
        const rgb = hslToRgb(hue / 360, 1, 0.5);
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        break;
        
      case 'grayscale':
        // Simple grayscale
        r = g = b = i;
        break;
        
      case 'rgb':
        // Original RGB scheme
        if (i < 85) {
          r = i * 3; g = 0; b = 0;
        } else if (i < 171) {
          r = 0; g = 3 * (i - 84); b = 0;
        } else {
          r = 0; g = 0; b = 3 * (i - 170);
        }
        break;
        
      default:
        r = g = b = i;
    }
    
    const rHex = Math.min(255, Math.max(0, Math.floor(r))).toString(16).padStart(2, '0');
    const gHex = Math.min(255, Math.max(0, Math.floor(g))).toString(16).padStart(2, '0');
    const bHex = Math.min(255, Math.max(0, Math.floor(b))).toString(16).padStart(2, '0');
    
    palette[i] = '#' + rHex + gHex + bHex;
  }
  
  return palette;
};

// HSL to RGB conversion helper
const hslToRgb = (h, s, l) => {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const palette = computed(() => generatePalette(colorScheme.value));

// Verified interesting points - these are on the boundary where detail is visible
const interestingPoints = [
  { x: -0.7453, y: 0.1127, name: "Elephant Valley" },
  { x: -0.7269, y: 0.1889, name: "Double Spiral" },
  { x: -0.743, y: 0.126, name: "Triple Spiral" },
  { x: 0.3, y: 0.0, name: "Seahorse Valley" },
  { x: -0.1592, y: 1.0317, name: "Needle" },
  { x: -0.1011, y: 0.9563, name: "Satellite" },
  { x: -0.7453, y: 0.1127, name: "Elephant Valley 2" },
  { x: -0.1592, y: -1.0317, name: "Southern Needle" },
];

let currentPointIndex = 0;
let zoomProgress = 0;
const maxZoomSteps = 8000; // Number of small zoom steps before moving to next point

const mandel = () => {
  if (!canvas.value) return;
  
  const context = canvas.value.getContext('2d');
  const currentXmin = xmin.value;
  const currentYmin = ymin.value;
  const currentScale = scale.value;
  const currentPalette = palette.value;
  
  for (let x = 0; x < 200; x++) {
    for (let y = 0; y < 200; y++) {
      let i = 0;
      const cx = currentXmin + x / currentScale;
      const cy = currentYmin + y / currentScale;
      let zx = 0;
      let zy = 0;
      
      do {
        const xt = zx * zy;
        zx = zx * zx - zy * zy + cx;
        zy = 2 * xt + cy;
        i++;
      } while (i < 255 && (zx * zx + zy * zy) < 4);
      
      context.beginPath();
      context.rect(x * 4, 800 - y * 4, 4, 4);
      context.fillStyle = currentPalette[i];
      context.fill();
    }
  }
  
  // Check if auto-zooming and compare frames
  if (isAutoZooming.value) {
    checkFrameSimilarity();
  }
};

const checkFrameSimilarity = () => {
  if (!canvas.value) return;
  
  const context = canvas.value.getContext('2d');
  
  // Sample every 10th pixel for performance (20x20 grid = 400 samples)
  const sampledPixels = [];
  const sampleSize = 40; // Sample every 20 pixels (800/20 = 40 samples per dimension)
  
  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      const pixelData = context.getImageData(x * 20, y * 20, 1, 1).data;
      // Store average color value
      sampledPixels.push((pixelData[0] + pixelData[1] + pixelData[2]) / 3);
    }
  }
  
  if (previousFrameData) {
    // Calculate similarity
    let matchingPixels = 0;
    const tolerance = 5; // Color difference tolerance
    
    for (let i = 0; i < sampledPixels.length; i++) {
      if (Math.abs(sampledPixels[i] - previousFrameData[i]) <= tolerance) {
        matchingPixels++;
      }
    }
    
    const similarity = matchingPixels / sampledPixels.length;
    
    if (similarity >= similarityThreshold) {
      sameFrameCount++;
      
      // If stuck in boring region, skip to next point
      if (sameFrameCount >= maxSameFrames) {
        console.log(`Detected boring region (${(similarity * 100).toFixed(1)}% similar), skipping to next point`);
        skipToNextPoint();
      }
    } else {
      // Reset counter if frame changed significantly
      sameFrameCount = 0;
    }
  }
  
  previousFrameData = sampledPixels;
};

const skipToNextPoint = () => {
  sameFrameCount = 0;
  zoomProgress = 0;
  currentPointIndex = (currentPointIndex + 1) % interestingPoints.length;
  previousFrameData = null; // Reset frame comparison
};

const zoom = (event) => {
  if (!canvas.value) return;
  
  const rect = canvas.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  
  xmin.value = xmin.value + Math.floor(mouseX / 4) / scale.value;
  ymin.value = -Math.floor(mouseY / 4) / scale.value + 200 / scale.value + ymin.value;
  scale.value = scale.value * 2;
  
  mandel();
};

const autoZoom = () => {
  const point = interestingPoints[currentPointIndex];
  
  // Start from a wide view when switching to a new point
  if (zoomProgress === 0) {
    // Set initial view centered on the interesting point
    const viewSize = 4.0; // Size of the initial view window
    xmin.value = point.x - viewSize / 2;
    ymin.value = point.y - viewSize / 2;
    scale.value = 200 / viewSize; // Calculate scale to fit the view
  }
  
  // Small, constant zoom steps for smooth video-like effect
  const zoomFactor = 1.01; // Smaller factor for smoother zoom (3% per step)
  
  // Calculate the center point before zoom
  const centerX = xmin.value + (200 / scale.value) / 2;
  const centerY = ymin.value + (200 / scale.value) / 2;
  
  // Smoothly move center towards the target point
  const targetX = point.x;
  const targetY = point.y;
  const moveSpeed = 0.02; // Slow, smooth movement
  
  const newCenterX = centerX + (targetX - centerX) * moveSpeed;
  const newCenterY = centerY + (targetY - centerY) * moveSpeed;
  
  // Apply zoom
  scale.value = scale.value * zoomFactor;
  
  // Recalculate xmin and ymin to keep the center point
  const newViewSize = 200 / scale.value;
  xmin.value = newCenterX - newViewSize / 2;
  ymin.value = newCenterY - newViewSize / 2;
  
  zoomProgress++;
  
  // After many zoom steps, move to the next interesting point
  if (zoomProgress >= maxZoomSteps) {
    zoomProgress = 0;
    currentPointIndex = (currentPointIndex + 1) % interestingPoints.length;
  }
  
  mandel();
};

const toggleAutoZoom = () => {
  isAutoZooming.value = !isAutoZooming.value;
  
  if (isAutoZooming.value) {
    zoomProgress = 0; // Reset zoom progress
    sameFrameCount = 0;
    previousFrameData = null;
    autoZoomInterval = setInterval(autoZoom, zoomSpeed.value);
  } else {
    if (autoZoomInterval) {
      clearInterval(autoZoomInterval);
      autoZoomInterval = null;
    }
  }
};

const reset = () => {
  if (isAutoZooming.value) {
    toggleAutoZoom();
  }
  xmin.value = -2;
  ymin.value = -2;
  scale.value = 50;
  currentPointIndex = 0;
  zoomProgress = 0;
  sameFrameCount = 0;
  previousFrameData = null;
  selectedRegion.value = null;
  mandel();
};

const jumpToRegion = () => {
  if (selectedRegion.value === null) return;
  
  // Stop auto-zoom if running
  if (isAutoZooming.value) {
    toggleAutoZoom();
  }
  
  // Jump to selected region
  currentPointIndex = selectedRegion.value;
  zoomProgress = 0;
  sameFrameCount = 0;
  previousFrameData = null;
  
  const point = interestingPoints[currentPointIndex];
  const viewSize = 4.0;
  xmin.value = point.x - viewSize / 2;
  ymin.value = point.y - viewSize / 2;
  scale.value = 200 / viewSize;
  
  mandel();
};

onMounted(() => {
  mandel();
});

onUnmounted(() => {
  if (autoZoomInterval) {
    clearInterval(autoZoomInterval);
  }
});
</script>

<style scoped>
.mandelbrot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

canvas {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-panel {
  max-width: 800px;
  width: 100%;
}
</style>