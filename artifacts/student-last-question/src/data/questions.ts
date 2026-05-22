import { Question } from "@/context/GameContext";

export type Difficulty = "easy" | "medium" | "hard";
export type Subject = "programming" | "electronics" | "networking";

// ─── Programming ──────────────────────────────────────────────────────────────
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

// ─── Electronics ──────────────────────────────────────────────────────────────
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

// ─── Networking (เครือข่ายคอมพิวเตอร์) ────────────────────────────────────────
const NETWORKING_EASY: Question[] = [
  { id: 121, question: "IP Address คืออะไร?", options: ["ที่อยู่ตัวเลขที่ใช้ระบุอุปกรณ์บนเครือข่าย", "ชื่อโปรโตคอลการส่งข้อมูล", "รหัสผ่านเครือข่าย", "ความเร็วของอินเทอร์เน็ต"], correct: 0 },
  { id: 122, question: "Router ทำหน้าที่อะไร?", options: ["จัดเก็บข้อมูลเครือข่าย", "เชื่อมต่อและส่งข้อมูลระหว่างเครือข่ายที่ต่างกัน", "แปลงสัญญาณไฟฟ้า", "กรองสัญญาณรบกวน"], correct: 1 },
  { id: 123, question: "LAN ย่อมาจากอะไร?", options: ["Large Area Network", "Local Area Network", "Limited Access Node", "Line Allocation Network"], correct: 1 },
  { id: 124, question: "DNS ย่อมาจากอะไร?", options: ["Data Network System", "Domain Name System", "Digital Network Service", "Dynamic Node System"], correct: 1 },
  { id: 125, question: "Firewall ทำหน้าที่อะไร?", options: ["เพิ่มความเร็วอินเทอร์เน็ต", "จัดเก็บข้อมูลสำรอง", "ป้องกันการเข้าถึงเครือข่ายที่ไม่ได้รับอนุญาต", "แปลงสัญญาณ WiFi"], correct: 2 },
  { id: 126, question: "HTTP ย่อมาจากอะไร?", options: ["HyperText Transfer Protocol", "High Tech Transmission Protocol", "Hyper Transfer Technology Protocol", "Hosting Text Transfer Procedure"], correct: 0 },
  { id: 127, question: "MAC Address คืออะไร?", options: ["ที่อยู่ IP แบบถาวร", "ที่อยู่ฮาร์ดแวร์เฉพาะของการ์ดเครือข่าย", "ชื่อโดเมนของอุปกรณ์", "รหัสใบอนุญาตซอฟต์แวร์"], correct: 1 },
  { id: 128, question: "WiFi ใช้การส่งสัญญาณแบบใด?", options: ["สายทองแดง", "ใยแก้วนำแสง", "คลื่นวิทยุไร้สาย", "อินฟราเรด"], correct: 2 },
];

const NETWORKING_MEDIUM: Question[] = [
  { id: 221, question: "OSI Model มีกี่เลเยอร์?", options: ["4", "5", "7", "10"], correct: 2 },
  { id: 222, question: "TCP แตกต่างจาก UDP อย่างไร?", options: ["TCP เร็วกว่า UDP", "TCP รับประกันการส่งข้อมูล UDP ไม่รับประกัน", "UDP เชื่อถือได้มากกว่า TCP", "ไม่แตกต่างกัน"], correct: 1 },
  { id: 223, question: "DHCP ทำหน้าที่อะไร?", options: ["เข้ารหัสข้อมูล", "แปลงชื่อโดเมนเป็น IP", "จ่าย IP Address ให้อุปกรณ์โดยอัตโนมัติ", "ตรวจจับไวรัส"], correct: 2 },
  { id: 224, question: "Port 443 ใช้สำหรับโปรโตคอลใด?", options: ["FTP", "HTTP", "HTTPS", "SSH"], correct: 2 },
  { id: 225, question: "Switch ต่างจาก Hub อย่างไร?", options: ["Switch ราคาถูกกว่า", "Switch ส่งข้อมูลถึงเฉพาะปลายทาง Hub กระจายทุกพอร์ต", "Hub เร็วกว่า Switch", "ใช้งานเหมือนกันทุกประการ"], correct: 1 },
  { id: 226, question: "VPN ย่อมาจากอะไร?", options: ["Visual Private Node", "Very Protected Network", "Virtual Private Network", "Verified Protocol Network"], correct: 2 },
  { id: 227, question: "Subnet Mask ใช้ทำอะไร?", options: ["เพิ่มความปลอดภัย", "แบ่งแยกส่วน Network และ Host ของ IP Address", "จ่าย IP อัตโนมัติ", "แปลงชื่อโดเมน"], correct: 1 },
  { id: 228, question: "คำสั่ง ping ใช้ทำอะไร?", options: ["ดูรหัสผ่านเครือข่าย", "ทดสอบการเชื่อมต่อระหว่างอุปกรณ์", "ดาวน์โหลดไฟล์", "สแกนไวรัส"], correct: 1 },
];

const NETWORKING_HARD: Question[] = [
  { id: 321, question: "TCP Three-way Handshake ทำงานอย่างไร?", options: ["SYN → ACK → SYN", "SYN → SYN-ACK → ACK", "ACK → SYN → SYN-ACK", "SYN → FIN → ACK"], correct: 1 },
  { id: 322, question: "BGP ใช้ทำอะไรในอินเทอร์เน็ต?", options: ["เข้ารหัสข้อมูลทุกแพ็กเก็ต", "แลกเปลี่ยนข้อมูล routing ระหว่าง ISP ต่างๆ", "จ่าย IP Address", "แปลงชื่อโดเมน"], correct: 1 },
  { id: 323, question: "VLAN คืออะไร?", options: ["ระบบไฟร์วอลล์ชั้นสูง", "การแบ่งเครือข่ายเสมือนบน switch เดียวกัน", "โปรโตคอลการเข้ารหัส", "ระบบสำรองข้อมูล"], correct: 1 },
  { id: 324, question: "NAT ย่อมาจากอะไรและทำหน้าที่อะไร?", options: ["Network Analysis Tool — วิเคราะห์เครือข่าย", "Network Address Translation — แปลง IP ส่วนตัวเป็น IP สาธารณะ", "Node Authentication Token — ยืนยันตัวตน", "Network Access Terminal — จุดเชื่อมต่อ"], correct: 1 },
  { id: 325, question: "IPv6 แตกต่างจาก IPv4 อย่างไร?", options: ["ใช้งานได้เฉพาะเครือข่ายไร้สาย", "มีความยาว 128 บิต รองรับที่อยู่ได้มากกว่ามาก", "ทำงานช้ากว่า IPv4", "ไม่รองรับการเข้ารหัส"], correct: 1 },
];

// ─── Shuffle answer choices (keeps correct answer tracked by value) ────────────
export function shuffleChoices(q: Question): Question {
  const correctAnswer = q.options[q.correct];
  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  return {
    ...q,
    options: shuffled,
    correct: shuffled.indexOf(correctAnswer),
  };
}

// ─── Get question pool for a stage (difficulty-gated by stage index) ──────────
export function getQuestionsForStage(subject: Subject, stageIndex: number): Question[] {
  let easy: Question[];
  let medium: Question[];
  let hard: Question[];

  if (subject === "programming") {
    easy = PROGRAMMING_EASY; medium = PROGRAMMING_MEDIUM; hard = PROGRAMMING_HARD;
  } else if (subject === "electronics") {
    easy = ELECTRONICS_EASY; medium = ELECTRONICS_MEDIUM; hard = ELECTRONICS_HARD;
  } else {
    easy = NETWORKING_EASY; medium = NETWORKING_MEDIUM; hard = NETWORKING_HARD;
  }

  // stages 0-1 → easy, 2-3 → medium, 4-5 → hard
  const pool = stageIndex <= 1 ? easy : stageIndex <= 3 ? medium : hard;
  return [...pool].sort(() => Math.random() - 0.5);
}

// ─── Labels ───────────────────────────────────────────────────────────────────
export const SUBJECT_LABELS: Record<Subject, string> = {
  programming: "โปรแกรมมิ่ง",
  electronics: "อิเล็กทรอนิกส์",
  networking:  "เครือข่าย",
};

export const SUBJECT_QUESTION_COUNTS: Record<Subject, number> = {
  programming: PROGRAMMING_EASY.length + PROGRAMMING_MEDIUM.length + PROGRAMMING_HARD.length,
  electronics: ELECTRONICS_EASY.length + ELECTRONICS_MEDIUM.length + ELECTRONICS_HARD.length,
  networking:  NETWORKING_EASY.length + NETWORKING_MEDIUM.length + NETWORKING_HARD.length,
};
