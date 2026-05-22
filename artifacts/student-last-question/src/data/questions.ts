import { Question } from "@/context/GameContext";

export type Difficulty = "easy" | "medium" | "hard";
export type Subject = "programming" | "electronics" | "mechanics";

const PROGRAMMING_EASY: Question[] = [
  { id: 101, question: "โปรแกรมคอมพิวเตอร์คืออะไร?", options: ["ชุดคำสั่งที่ให้คอมพิวเตอร์ทำงาน", "ฮาร์ดแวร์ของคอมพิวเตอร์", "จอแสดงผล", "หน่วยความจำหลัก"], correct: 0 },
  { id: 102, question: "ภาษาโปรแกรมใดเหมาะสำหรับผู้เริ่มต้น?", options: ["Assembly", "Python", "C++", "Rust"], correct: 1 },
  { id: 103, question: "คำสั่ง if-else ในโปรแกรมใช้ทำอะไร?", options: ["วนซ้ำคำสั่ง", "เก็บข้อมูล", "ตัดสินใจตามเงื่อนไข", "แสดงผลลัพธ์"], correct: 2 },
  { id: 104, question: "Loop (ลูป) ในการเขียนโปรแกรมคืออะไร?", options: ["ฟังก์ชันที่คืนค่า", "การทำซ้ำชุดคำสั่ง", "ประเภทข้อมูล", "ตัวแปรพิเศษ"], correct: 1 },
  { id: 105, question: "HTML ย่อมาจากอะไร?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Method Language", "Home Tool Markup Language"], correct: 0 },
  { id: 106, question: "CSS ใช้ทำอะไรในการพัฒนาเว็บ?", options: ["เขียนฐานข้อมูล", "จัดรูปแบบหน้าเว็บ", "เชื่อมต่อเซิร์ฟเวอร์", "สร้างแอนิเมชัน3D"], correct: 1 },
  { id: 107, question: "ตัวแปร (Variable) ในโปรแกรมคืออะไร?", options: ["ค่าคงที่ที่เปลี่ยนไม่ได้", "ที่เก็บข้อมูลชั่วคราวในหน่วยความจำ", "ฟังก์ชันพิเศษ", "ไฟล์ข้อมูล"], correct: 1 },
  { id: 108, question: "ข้อใดเป็นประเภทข้อมูลพื้นฐาน (Primitive Type)?", options: ["Array", "Object", "Integer", "List"], correct: 2 },
];

const PROGRAMMING_MEDIUM: Question[] = [
  { id: 201, question: "Array (อาร์เรย์) คืออะไร?", options: ["ฟังก์ชันที่เรียกซ้ำ", "โครงสร้างข้อมูลที่เก็บหลายค่าด้วยชื่อเดียว", "คลาสพิเศษ", "ภาษาโปรแกรม"], correct: 1 },
  { id: 202, question: "OOP ย่อมาจากและหมายความว่าอะไร?", options: ["Online Output Processing", "Object-Oriented Programming", "Open Operating Platform", "Optional Output Parameter"], correct: 1 },
  { id: 203, question: "Stack ใช้หลักการใด?", options: ["FIFO - เข้าก่อนออกก่อน", "LIFO - เข้าหลังออกก่อน", "Random - สุ่มลำดับ", "FILO - เข้าก่อนออกหลัง"], correct: 1 },
  { id: 204, question: "ความซับซ้อนของ Bubble Sort โดยเฉลี่ยคือ?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: 2 },
  { id: 205, question: "คำสั่ง SQL SELECT ใช้ทำอะไร?", options: ["ลบข้อมูล", "แก้ไขข้อมูล", "เพิ่มข้อมูล", "ดึงข้อมูลจากตาราง"], correct: 3 },
  { id: 206, question: "Inheritance (การสืบทอด) ใน OOP คืออะไร?", options: ["การซ่อนข้อมูล", "คลาสลูกรับคุณสมบัติจากคลาสแม่", "การสร้างออบเจกต์", "การทำลายออบเจกต์"], correct: 1 },
  { id: 207, question: "5 % 2 มีค่าเท่ากับเท่าไร?", options: ["2", "2.5", "1", "0"], correct: 2 },
  { id: 208, question: "Function (ฟังก์ชัน) ในโปรแกรมคืออะไร?", options: ["ประเภทตัวแปร", "บล็อกโค้ดที่สามารถเรียกใช้ซ้ำได้", "ตารางข้อมูล", "โปรโตคอลเครือข่าย"], correct: 1 },
];

const PROGRAMMING_HARD: Question[] = [
  { id: 301, question: "Big O Notation O(log n) หมายความว่าอะไร?", options: ["เวลาคงที่", "เวลาเพิ่มแบบเชิงเส้น", "เวลาเพิ่มแบบลอการิทึม", "เวลาเพิ่มแบบกำลังสอง"], correct: 2 },
  { id: 302, question: "Recursion (การเรียกซ้ำ) คืออะไร?", options: ["ลูปธรรมดา", "ฟังก์ชันที่เรียกตัวเองซ้ำ", "การสืบทอดคลาส", "การโอเวอร์โหลดเมธอด"], correct: 1 },
  { id: 303, question: "Deadlock ในระบบปฏิบัติการเกิดจากอะไร?", options: ["CPU ทำงานเกิน", "กระบวนการต่างรอกันโดยไม่มีใครสิ้นสุด", "หน่วยความจำไม่พอ", "ไฟล์เสียหาย"], correct: 1 },
  { id: 304, question: "HTTP status code 404 หมายความว่าอะไร?", options: ["สำเร็จ", "ข้อผิดพลาดเซิร์ฟเวอร์", "ไม่พบทรัพยากรที่ร้องขอ", "ไม่มีสิทธิ์เข้าถึง"], correct: 2 },
  { id: 305, question: "Design Pattern Observer ใช้แก้ปัญหาอะไร?", options: ["สร้างออบเจกต์จำนวนมาก", "แจ้งเตือนออบเจกต์หลายตัวเมื่อสถานะเปลี่ยน", "เชื่อมต่อฐานข้อมูล", "จัดการหน่วยความจำ"], correct: 1 },
];

const ELECTRONICS_EASY: Question[] = [
  { id: 111, question: "โอห์ม (Ohm) ใช้วัดอะไร?", options: ["กระแสไฟฟ้า", "แรงดันไฟฟ้า", "ความต้านทาน", "กำลังไฟฟ้า"], correct: 2 },
  { id: 112, question: "แอมแปร์ (Ampere) ใช้วัดอะไร?", options: ["ความต้านทาน", "กระแสไฟฟ้า", "แรงดันไฟฟ้า", "ความถี่"], correct: 1 },
  { id: 113, question: "ตัวต้านทาน (Resistor) ทำหน้าที่อะไร?", options: ["เก็บประจุ", "ขยายสัญญาณ", "จำกัดกระแสไฟฟ้า", "แปลงไฟฟ้ากระแสสลับ"], correct: 2 },
  { id: 114, question: "LED ย่อมาจากอะไร?", options: ["Light Emitting Diode", "Low Energy Display", "Large Electronic Device", "Linear Emission Driver"], correct: 0 },
  { id: 115, question: "ตัวเก็บประจุ (Capacitor) เก็บอะไร?", options: ["กำลังงาน", "กระแสไฟฟ้า", "ประจุไฟฟ้า", "ความต้านทาน"], correct: 2 },
  { id: 116, question: "วงจรอนุกรม (Series Circuit) ต่ออุปกรณ์อย่างไร?", options: ["ต่อแบบขนาน", "ต่อกันเป็นแถวเดียว", "ต่อแบบสุ่ม", "ต่อแบบวงรอบ"], correct: 1 },
  { id: 117, question: "ฟิวส์ (Fuse) ทำหน้าที่อะไร?", options: ["เพิ่มกระแส", "ป้องกันกระแสไฟฟ้าเกิน", "แปลงแรงดัน", "เก็บประจุ"], correct: 1 },
  { id: 118, question: "โวลต์มิเตอร์ใช้วัดอะไร?", options: ["กระแสไฟฟ้า", "ความต้านทาน", "แรงดันไฟฟ้า", "กำลังงาน"], correct: 2 },
];

const ELECTRONICS_MEDIUM: Question[] = [
  { id: 211, question: "กฎของโอห์ม V = IR หมายความว่าอะไร?", options: ["แรงดัน = กำลัง × เวลา", "กระแส = แรงดัน × ความต้านทาน", "แรงดัน = กระแส × ความต้านทาน", "ความต้านทาน = แรงดัน + กระแส"], correct: 2 },
  { id: 212, question: "วงจรขนาน (Parallel Circuit) มีคุณสมบัติอย่างไร?", options: ["กระแสเท่ากันทุกส่วน", "แรงดันเท่ากันทุกส่วน", "ความต้านทานรวมเพิ่มขึ้น", "มีทางเดินกระแสเดียว"], correct: 1 },
  { id: 213, question: "ทรานซิสเตอร์ (Transistor) ทำหน้าที่อะไร?", options: ["เก็บประจุ", "แปลงไฟฟ้า", "ขยายสัญญาณหรือทำหน้าที่สวิตช์", "กรองสัญญาณรบกวน"], correct: 2 },
  { id: 214, question: "ไดโอด (Diode) ทำหน้าที่อะไร?", options: ["ขยายสัญญาณทั้งสองทิศทาง", "ให้กระแสไหลได้ทิศทางเดียว", "เก็บพลังงาน", "ต้านกระแสไฟฟ้า"], correct: 1 },
  { id: 215, question: "ความถี่ไฟฟ้า (Frequency) วัดด้วยหน่วยใด?", options: ["โวลต์ (V)", "แอมแปร์ (A)", "เฮิรตซ์ (Hz)", "วัตต์ (W)"], correct: 2 },
  { id: 216, question: "PCB ย่อมาจากอะไร?", options: ["Power Control Board", "Printed Circuit Board", "Primary Current Box", "Parallel Control Bus"], correct: 1 },
  { id: 217, question: "ออสซิลโลสโคป (Oscilloscope) ใช้ทำอะไร?", options: ["วัดความต้านทาน", "วัดและแสดงรูปคลื่นสัญญาณไฟฟ้า", "จ่ายไฟฟ้า", "กรองสัญญาณ"], correct: 1 },
  { id: 218, question: "กำลังไฟฟ้า (Power) คำนวณอย่างไร?", options: ["P = V + I", "P = V / I", "P = V × I", "P = V - I"], correct: 2 },
];

const ELECTRONICS_HARD: Question[] = [
  { id: 311, question: "Op-Amp (ออปแอมป์) ทำหน้าที่หลักคืออะไร?", options: ["จ่ายกระแสคงที่", "ขยายสัญญาณแบบดิฟเฟอเรนเชียล", "แปลง AC เป็น DC", "เก็บประจุขนาดใหญ่"], correct: 1 },
  { id: 312, question: "RC Time Constant (τ) คำนวณอย่างไร?", options: ["τ = R + C", "τ = R / C", "τ = R × C", "τ = C / R"], correct: 2 },
  { id: 313, question: "ลอจิกเกต AND ให้ผลลัพธ์เป็น 1 เมื่อใด?", options: ["อินพุตใดอินพุตหนึ่งเป็น 1", "อินพุตทั้งหมดเป็น 1", "อินพุตทั้งหมดเป็น 0", "อินพุตแรกเป็น 1 เท่านั้น"], correct: 1 },
  { id: 314, question: "PWM ย่อมาจากอะไรและใช้ทำอะไร?", options: ["Power Width Module - วัดพลังงาน", "Pulse Width Modulation - ควบคุมความเร็วมอเตอร์/ความสว่าง", "Phase Wave Mode - สร้างคลื่น", "Parallel Wire Method - เดินสาย"], correct: 1 },
  { id: 315, question: "ไมโครคอนโทรลเลอร์แตกต่างจากไมโครโปรเซสเซอร์อย่างไร?", options: ["ทำงานได้เร็วกว่า", "รวม CPU RAM ROM และ I/O ไว้ในชิปเดียว", "ราคาถูกกว่าเสมอ", "ใช้ไฟฟ้ามากกว่า"], correct: 1 },
];

const MECHANICS_EASY: Question[] = [
  { id: 121, question: "เครื่องยนต์สันดาปภายใน (ICE) แปลงพลังงานอะไรเป็นอะไร?", options: ["ไฟฟ้าเป็นกล", "พลังงานเคมีเป็นพลังงานกล", "ความร้อนเป็นไฟฟ้า", "กลเป็นความร้อน"], correct: 1 },
  { id: 122, question: "น้ำมันเครื่อง (Engine Oil) ทำหน้าที่อะไร?", options: ["ทำให้เครื่องเย็นลง", "จ่ายไฟฟ้า", "หล่อลื่นชิ้นส่วนเครื่องยนต์", "กรองอากาศ"], correct: 2 },
  { id: 123, question: "ไส้กรองอากาศ (Air Filter) ทำหน้าที่อะไร?", options: ["กรองน้ำมันเชื้อเพลิง", "กรองฝุ่นก่อนอากาศเข้าเครื่องยนต์", "ระบายความร้อน", "เพิ่มกำลัง"], correct: 1 },
  { id: 124, question: "แบตเตอรี่รถยนต์ทำหน้าที่อะไร?", options: ["กักเก็บน้ำมัน", "ระบายความร้อน", "จ่ายไฟฟ้าให้ระบบสตาร์ทและอุปกรณ์ไฟฟ้า", "หล่อลื่นเครื่องยนต์"], correct: 2 },
  { id: 125, question: "คลัตช์ (Clutch) ทำหน้าที่อะไร?", options: ["เพิ่มกำลังเครื่องยนต์", "ตัดต่อกำลังระหว่างเครื่องยนต์และเกียร์", "ระบายความร้อน", "กรองอากาศ"], correct: 1 },
  { id: 126, question: "ยางรถยนต์นิยมวัดความดันด้วยหน่วยใด?", options: ["กิโลกรัม", "เมตร", "PSI หรือ บาร์", "นิวตัน"], correct: 2 },
  { id: 127, question: "ระบบเบรกไฮดรอลิก (Hydraulic Brake) ทำงานด้วยหลักการใด?", options: ["แรงสปริง", "แรงดันของเหลวส่งแรง", "แรงไฟฟ้า", "แรงลม"], correct: 1 },
  { id: 128, question: "ไส้กรองน้ำมันเครื่อง (Oil Filter) ทำหน้าที่อะไร?", options: ["เพิ่มน้ำมัน", "กรองสิ่งสกปรกออกจากน้ำมัน", "ทำให้น้ำมันเย็น", "วัดระดับน้ำมัน"], correct: 1 },
];

const MECHANICS_MEDIUM: Question[] = [
  { id: 221, question: "เกียร์อัตโนมัติ (Automatic Transmission) ทำงานอย่างไร?", options: ["คนขับเปลี่ยนเกียร์ด้วยมือ", "เปลี่ยนเกียร์โดยอัตโนมัติตามความเร็วและโหลด", "ใช้คลัตช์ทุกครั้ง", "ไม่มีเกียร์ถอยหลัง"], correct: 1 },
  { id: 222, question: "หัวเทียน (Spark Plug) ทำหน้าที่อะไร?", options: ["กรองน้ำมันเชื้อเพลิง", "จุดระเบิดส่วนผสมน้ำมันและอากาศ", "ระบายความร้อน", "ปั๊มน้ำมัน"], correct: 1 },
  { id: 223, question: "ระบบหล่อเย็น (Cooling System) ทำหน้าที่อะไร?", options: ["เพิ่มกำลังเครื่องยนต์", "กรองอากาศ", "ควบคุมอุณหภูมิเครื่องยนต์ไม่ให้ร้อนเกิน", "จ่ายน้ำมันเชื้อเพลิง"], correct: 2 },
  { id: 224, question: "ABS ย่อมาจากอะไร?", options: ["Automatic Braking System", "Anti-lock Braking System", "Advanced Brake Sensor", "Axle Brake Support"], correct: 1 },
  { id: 225, question: "ลูกสูบ (Piston) ทำหน้าที่อะไรในเครื่องยนต์?", options: ["กรองอากาศ", "ปั๊มน้ำมัน", "เปลี่ยนแรงดันก๊าซเป็นการเคลื่อนที่เชิงเส้น", "ระบายความร้อน"], correct: 2 },
  { id: 226, question: "ระบบพวงมาลัยพาวเวอร์ (Power Steering) ทำงานอย่างไร?", options: ["ใช้มอเตอร์ไฟฟ้าหรือปั๊มน้ำมันช่วยผ่อนแรงหมุน", "เพิ่มความเร็ว", "ล็อคพวงมาลัย", "ควบคุมระบบเบรก"], correct: 0 },
  { id: 227, question: "ไฟหน้า Halogen และ LED ต่างกันอย่างไร?", options: ["Halogen สว่างกว่าเสมอ", "LED ใช้ไฟน้อยกว่าและอายุการใช้งานยาวกว่า", "ราคา Halogen แพงกว่า", "LED ไม่เหมาะกับรถยนต์"], correct: 1 },
  { id: 228, question: "น้ำหล่อเย็น (Coolant) ควรเปลี่ยนทุกระยะเวลาเท่าไร?", options: ["ทุก 1,000 กม.", "ทุก 5,000 กม.", "ทุก 40,000-60,000 กม.", "ไม่ต้องเปลี่ยน"], correct: 2 },
];

const MECHANICS_HARD: Question[] = [
  { id: 321, question: "หัวฉีดน้ำมันเชื้อเพลิง (Fuel Injector) ทำงานอย่างไร?", options: ["จ่ายน้ำมันแบบต่อเนื่อง", "พ่นน้ำมันเป็นฝอยในปริมาณที่แม่นยำตามสัญญาณ ECU", "กรองน้ำมัน", "อุ่นน้ำมันก่อนเผาไหม้"], correct: 1 },
  { id: 322, question: "CVT ย่อมาจากอะไรและทำงานอย่างไร?", options: ["Controlled Variable Torque - ควบคุมแรงบิด", "Continuously Variable Transmission - เปลี่ยนอัตราทดแบบต่อเนื่องไม่มีขั้น", "Central Velocity Trigger - ควบคุมความเร็ว", "Cam Valve Timing - ควบคุมวาล์ว"], correct: 1 },
  { id: 323, question: "ระบบ OBD-II ในรถยนต์ใช้ทำอะไร?", options: ["เพิ่มกำลังเครื่องยนต์", "วินิจฉัยความผิดปกติของระบบต่างๆ ในรถยนต์", "ปรับปรุงระบบเสียง", "ควบคุมระบบแอร์"], correct: 1 },
  { id: 324, question: "Torque (แรงบิด) และ Horsepower (แรงม้า) ต่างกันอย่างไร?", options: ["เหมือนกันทุกประการ", "Torque คือแรงบิด HP คืออัตราการทำงาน", "HP วัดเป็นนิวตัน Torque วัดเป็นวัตต์", "Torque ใช้กับรถยนต์เท่านั้น"], correct: 1 },
  { id: 325, question: "เทอร์โบชาร์จเจอร์ (Turbocharger) เพิ่มกำลังเครื่องยนต์ด้วยวิธีใด?", options: ["เพิ่มขนาดลูกสูบ", "อัดอากาศเข้าเครื่องยนต์มากขึ้นด้วยไอเสีย", "ใช้น้ำมันคุณภาพสูง", "ลดความต้านทานของอากาศ"], correct: 1 },
];

export function getQuestionsForStage(subject: Subject, stageIndex: number): Question[] {
  let easy: Question[];
  let medium: Question[];
  let hard: Question[];

  if (subject === "programming") {
    easy = PROGRAMMING_EASY;
    medium = PROGRAMMING_MEDIUM;
    hard = PROGRAMMING_HARD;
  } else if (subject === "electronics") {
    easy = ELECTRONICS_EASY;
    medium = ELECTRONICS_MEDIUM;
    hard = ELECTRONICS_HARD;
  } else {
    easy = MECHANICS_EASY;
    medium = MECHANICS_MEDIUM;
    hard = MECHANICS_HARD;
  }

  // Stages 1-2: easy, stages 3-4: medium, stages 5-6: hard
  let pool: Question[];
  if (stageIndex <= 1) pool = easy;
  else if (stageIndex <= 3) pool = medium;
  else pool = hard;

  return [...pool].sort(() => Math.random() - 0.5);
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  programming: "โปรแกรมมิ่ง",
  electronics: "อิเล็กทรอนิกส์",
  mechanics: "ช่างยนต์",
};
