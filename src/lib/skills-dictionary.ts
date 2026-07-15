import type { SkillCategory } from "./types";

export interface SkillEntry {
  name: string;
  category: SkillCategory;
  /** Regex sources (case-insensitive) that signal this skill in free text. */
  patterns: string[];
}

/**
 * A broad, categorized vocabulary used by the skill extractor. The extractor
 * scans pasted work text for these patterns and returns the canonical skills
 * that were detected, grouped by discipline. Patterns use \b word boundaries
 * and avoid noisy single-letter matches.
 */
export const SKILL_DICTIONARY: SkillEntry[] = [
  // ───────────────────────── AI / ML ─────────────────────────
  { name: "Python", category: "AI/ML", patterns: ["python"] },
  { name: "C/C++", category: "AI/ML", patterns: ["c\\+\\+", "c/c\\+\\+", "c / c\\+\\+"] },
  { name: "C#", category: "AI/ML", patterns: ["c#", "c sharp"] },
  { name: "Java", category: "AI/ML", patterns: ["\\bjava\\b"] },
  { name: "JavaScript", category: "AI/ML", patterns: ["javascript", "node\\.?js", "nodejs"] },
  { name: "TypeScript", category: "AI/ML", patterns: ["typescript"] },
  { name: "MATLAB", category: "AI/ML", patterns: ["matlab"] },
  { name: "SQL", category: "AI/ML", patterns: ["\\bsql\\b"] },
  { name: "Git", category: "AI/ML", patterns: ["\\bgit\\b", "github", "gitlab"] },
  { name: "Docker", category: "AI/ML", patterns: ["docker", "containeriz", "kubernetes", "\\bk8s\\b"] },
  { name: "Machine Learning", category: "AI/ML", patterns: ["machine learning", "\\bml\\b"] },
  { name: "Deep Learning", category: "AI/ML", patterns: ["deep learning", "deep neural"] },
  { name: "Supervised Learning", category: "AI/ML", patterns: ["supervised learning"] },
  { name: "Unsupervised Learning", category: "AI/ML", patterns: ["unsupervised learning"] },
  { name: "Reinforcement Learning", category: "AI/ML", patterns: ["reinforcement learning", "\\brl\\b"] },
  { name: "Neural Networks", category: "AI/ML", patterns: ["neural network", "neural net", "\\bnns?\\b"] },
  { name: "CNN", category: "AI/ML", patterns: ["convolutional neural network", "\\bcnn\\b", "convnet"] },
  { name: "RNN", category: "AI/ML", patterns: ["recurrent neural network", "\\brnn\\b"] },
  { name: "LSTM", category: "AI/ML", patterns: ["long short-term memory", "\\blstm\\b"] },
  { name: "Transformers", category: "AI/ML", patterns: ["transformer", "\\bllm\\b", "attention mechanism"] },
  { name: "GANs", category: "AI/ML", patterns: ["generative adversarial", "\\bgan\\b"] },
  { name: "Computer Vision", category: "AI/ML", patterns: ["computer vision", "\\bcv\\b"] },
  { name: "NLP", category: "AI/ML", patterns: ["natural language processing", "\\bnlp\\b"] },
  { name: "Image Processing", category: "AI/ML", patterns: ["image processing", "image classification", "image segmentation"] },
  { name: "Object Detection", category: "AI/ML", patterns: ["object detection", "\\bdetr\\b"] },
  { name: "YOLO", category: "AI/ML", patterns: ["\\byolo\\b", "you only look once"] },
  { name: "TensorFlow", category: "AI/ML", patterns: ["tensorflow"] },
  { name: "PyTorch", category: "AI/ML", patterns: ["pytorch", "\\btorch\\b"] },
  { name: "Keras", category: "AI/ML", patterns: ["keras"] },
  { name: "Scikit-learn", category: "AI/ML", patterns: ["scikit-learn", "sklearn", "scikit learn"] },
  { name: "NumPy", category: "AI/ML", patterns: ["numpy"] },
  { name: "Pandas", category: "AI/ML", patterns: ["pandas"] },
  { name: "Matplotlib", category: "AI/ML", patterns: ["matplotlib"] },
  { name: "OpenCV", category: "AI/ML", patterns: ["opencv"] },
  { name: "MediaPipe", category: "AI/ML", patterns: ["mediapipe"] },
  { name: "XGBoost", category: "AI/ML", patterns: ["xgboost", "gradient boosting", "boosted trees"] },
  { name: "ResNet", category: "AI/ML", patterns: ["resnet", "residual network"] },
  { name: "Data Science", category: "AI/ML", patterns: ["data science", "data scientist", "data analysis", "data analytics"] },
  { name: "Data Visualization", category: "AI/ML", patterns: ["data visualization", "data viz"] },
  { name: "Feature Engineering", category: "AI/ML", patterns: ["feature engineering"] },
  { name: "Hyperparameter Tuning", category: "AI/ML", patterns: ["hyperparameter", "model tuning"] },
  { name: "Time Series", category: "AI/ML", patterns: ["time series", "time-series forecasting"] },
  { name: "MLOps", category: "AI/ML", patterns: ["mlops", "model deployment", "model serving"] },
  { name: "Prompt Engineering", category: "AI/ML", patterns: ["prompt engineering", "fine-tun", "fine tun"] },

  // ─────────────────── Astrophysics / Astrodynamics ───────────────────
  { name: "Astropy", category: "Astrophysics", patterns: ["astropy"] },
  { name: "AstroQuery", category: "Astrophysics", patterns: ["astroquery"] },
  { name: "SpiceyPy", category: "Astrophysics", patterns: ["spiceypy", "\\bspice\\b", "naif spice"] },
  { name: "Orbital Mechanics", category: "Astrophysics", patterns: ["orbital mechanics", "orbital dynamics", "astrodynamics", "celestial mechanics"] },
  { name: "Satellite Systems", category: "Astrophysics", patterns: ["satellite", "spacecraft"] },
  { name: "Trajectory Prediction", category: "Astrophysics", patterns: ["trajectory", "trajectories", "orbit propagat", "propagation"] },
  { name: "Ephemeris", category: "Astrophysics", patterns: ["ephemeris", "ephemerides"] },
  { name: "Orbital Perturbations", category: "Astrophysics", patterns: ["perturbation", "solar radiation pressure", "atmospheric drag", "gravitational harmonics", "space weather", "solar storm"] },
  { name: "Multiwavelength Astronomy", category: "Astrophysics", patterns: ["multiwavelength", "multi-wavelength", "photometry", "spectroscopy"] },
  { name: "Galaxy Morphology", category: "Astrophysics", patterns: ["galaxy morpholog", "morphological classification", "galaxy classification"] },
  { name: "Astronomy", category: "Astrophysics", patterns: ["astronomical imaging", "astronomy", "astrophysics", "cosmology", "\\bccd\\b"] },
  { name: "Numerical Integration", category: "Astrophysics", patterns: ["numerical integration", "runge-kutta", "ode solver"] },

  // ─────────────────── Mechanical Engineering ───────────────────
  { name: "SolidWorks", category: "Mechanical", patterns: ["solidworks", "solid works"] },
  { name: "CREO Parametric", category: "Mechanical", patterns: ["creo", "pro/e", "proengineer"] },
  { name: "OnShape", category: "Mechanical", patterns: ["onshape", "on-shape"] },
  { name: "AutoCAD", category: "Mechanical", patterns: ["autocad", "autodesk"] },
  { name: "CATIA", category: "Mechanical", patterns: ["catia"] },
  { name: "ANSYS", category: "Mechanical", patterns: ["ansys"] },
  { name: "CAD", category: "Mechanical", patterns: ["\\bcad\\b", "computer-aided design", "computer aided design"] },
  { name: "FEA", category: "Mechanical", patterns: ["finite element analysis", "\\bfea\\b", "finite element"] },
  { name: "CFD", category: "Mechanical", patterns: ["computational fluid dynamics", "\\bcfd\\b", "fluid simulation", "fluid mechanics", "fluid dynamics"] },
  { name: "Vibration Engineering", category: "Mechanical", patterns: ["flow-induced vibration", "\\bfiv\\b", "vortex-induced vibration", "\\bviv\\b", "galloping", "bluff body", "energy harvesting", "energy harvester", "vibration"] },
  { name: "Thermodynamics", category: "Mechanical", patterns: ["thermodynamics"] },
  { name: "Heat Transfer", category: "Mechanical", patterns: ["heat transfer"] },
  { name: "Mechanics of Materials", category: "Mechanical", patterns: ["mechanics of materials", "strength of materials", "solid mechanics"] },
  { name: "Control Systems", category: "Mechanical", patterns: ["control system", "control theory", "pid control"] },
  { name: "Robotics", category: "Mechanical", patterns: ["robotics", "robot", "kinematics", "dynamics"] },
  { name: "3D Printing", category: "Mechanical", patterns: ["3d printing", "additive manufacturing"] },

  // ─────────────────── General / Professional ───────────────────
  { name: "Research", category: "General", patterns: ["research", "publication", "peer-reviewed", "conference paper"] },
  { name: "Technical Writing", category: "General", patterns: ["technical writing", "documentation", "report writing"] },
  { name: "Problem Solving", category: "General", patterns: ["problem solving", "critical thinking"] },
  { name: "Project Management", category: "General", patterns: ["project management", "agile", "scrum"] },
];
