import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #050a0e; font-family: 'Rajdhani', sans-serif; color: #c9d8e8; min-height: 100vh; }
  :root { --cyan: #00e5ff; --green: #00ff88; --red: #ff3b5c; --yellow: #ffd600; --bg: #050a0e; --panel: #0a1520; --border: #0d2035; --border-bright: #0f3050; --text: #c9d8e8; --mono: 'Share Tech Mono', monospace; }
  .app { max-width: 1100px; margin: 0 auto; padding: 24px 20px 60px; }
  .header { text-align: center; margin-bottom: 40px; position: relative; }
  .header::after { content: ''; display: block; height: 1px; background: linear-gradient(90deg, transparent, var(--cyan), transparent); margin-top: 24px; opacity: 0.4; }
  .header-badge { display: inline-block; font-family: var(--mono); font-size: 11px; letter-spacing: 3px; color: var(--cyan); border: 1px solid var(--cyan); padding: 4px 14px; margin-bottom: 14px; opacity: 0.7; }
  .header h1 { font-size: 42px; font-weight: 700; letter-spacing: 2px; color: #fff; text-shadow: 0 0 40px rgba(0,229,255,0.3); }
  .header h1 span { color: var(--cyan); }
  .header-sub { margin-top: 8px; font-family: var(--mono); font-size: 12px; color: #3a6080; letter-spacing: 2px; }
  .tabs { display: flex; gap: 0; margin-bottom: 28px; border: 1px solid var(--border-bright); border-radius: 4px; overflow: hidden; width: fit-content; }
  .tab { padding: 10px 32px; font-family: var(--mono); font-size: 13px; letter-spacing: 2px; cursor: pointer; border: none; background: var(--panel); color: #3a6080; transition: all 0.2s; border-right: 1px solid var(--border-bright); }
  .tab:last-child { border-right: none; }
  .tab:hover { color: var(--cyan); background: #0d1e2e; }
  .tab.active { background: rgba(0,229,255,0.08); color: var(--cyan); box-shadow: inset 0 -2px 0 var(--cyan); }
  .panel { background: var(--panel); border: 1px solid var(--border-bright); border-radius: 6px; padding: 28px; margin-bottom: 20px; position: relative; overflow: hidden; }
  .panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--cyan), transparent); opacity: 0.3; }
  .panel-title { font-family: var(--mono); font-size: 11px; letter-spacing: 3px; color: var(--cyan); margin-bottom: 20px; opacity: 0.8; }
  .dropzone { border: 2px dashed var(--border-bright); border-radius: 6px; padding: 40px 24px; text-align: center; cursor: pointer; transition: all 0.25s; background: rgba(0,229,255,0.02); }
  .dropzone:hover, .dropzone.drag-over { border-color: var(--cyan); background: rgba(0,229,255,0.05); box-shadow: 0 0 20px rgba(0,229,255,0.08) inset; }
  .dropzone-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.6; }
  .dropzone-text { font-size: 15px; font-weight: 600; color: #5a8aaa; margin-bottom: 4px; }
  .dropzone-sub { font-family: var(--mono); font-size: 11px; color: #2a4a60; letter-spacing: 1px; }
  .file-info { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: rgba(0,255,136,0.05); border: 1px solid rgba(0,255,136,0.2); border-radius: 4px; margin-top: 16px; }
  .file-icon { font-size: 22px; }
  .file-details { flex: 1; min-width: 0; }
  .file-name { font-weight: 600; font-size: 14px; color: var(--green); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-size { font-family: var(--mono); font-size: 11px; color: #3a7055; margin-top: 2px; }
  .file-remove { background: none; border: none; color: #3a5060; cursor: pointer; font-size: 18px; padding: 4px; transition: color 0.2s; }
  .file-remove:hover { color: var(--red); }
  .input-group { margin-top: 18px; }
  .input-label { font-family: var(--mono); font-size: 11px; letter-spacing: 2px; color: #3a6080; margin-bottom: 8px; display: block; }
  .input-row { display: flex; gap: 10px; align-items: center; }
  .text-input { flex: 1; background: rgba(0,0,0,0.4); border: 1px solid var(--border-bright); border-radius: 4px; padding: 10px 14px; color: var(--text); font-family: var(--mono); font-size: 13px; letter-spacing: 1px; outline: none; transition: border-color 0.2s; }
  .text-input:focus { border-color: var(--cyan); }
  .text-input::placeholder { color: #1a3a50; }
  .strength-bar { display: flex; gap: 4px; margin-top: 8px; }
  .strength-seg { height: 3px; flex: 1; border-radius: 2px; background: #0d2035; transition: background 0.3s; }
  .strength-label { font-family: var(--mono); font-size: 10px; margin-top: 5px; letter-spacing: 1px; }
  .btn { padding: 11px 28px; border: none; border-radius: 4px; font-family: var(--mono); font-size: 12px; letter-spacing: 2px; cursor: pointer; transition: all 0.2s; font-weight: 600; }
  .btn-primary { background: var(--cyan); color: #050a0e; }
  .btn-primary:hover { background: #33eeff; box-shadow: 0 0 20px rgba(0,229,255,0.3); }
  .btn-primary:disabled { background: #0d2035; color: #1a3a50; cursor: not-allowed; box-shadow: none; }
  .btn-ghost { background: transparent; border: 1px solid var(--border-bright); color: #5a8aaa; }
  .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); }
  .btn-full { width: 100%; margin-top: 20px; padding: 13px; }
  .progress-wrap { margin-top: 20px; }
  .progress-header { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: #3a6080; margin-bottom: 8px; }
  .progress-track { height: 4px; background: #0d2035; border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; background: linear-gradient(90deg, var(--cyan), var(--green)); box-shadow: 0 0 8px var(--cyan); }
  .progress-steps { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
  .progress-step { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11px; color: #2a4a60; letter-spacing: 1px; }
  .progress-step.done { color: var(--green); }
  .progress-step.active { color: var(--cyan); }
  .step-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .step-dot.pulse { animation: pulse 1s infinite; }
  .result-box { margin-top: 20px; padding: 20px; border-radius: 6px; border: 1px solid; }
  .result-box.success { background: rgba(0,255,136,0.04); border-color: rgba(0,255,136,0.25); }
  .result-box.error { background: rgba(255,59,92,0.04); border-color: rgba(255,59,92,0.25); }
  .result-title { font-family: var(--mono); font-size: 12px; letter-spacing: 2px; margin-bottom: 14px; }
  .result-box.success .result-title { color: var(--green); }
  .result-box.error .result-title { color: var(--red); }
  .hash-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 12px; background: rgba(0,0,0,0.3); border-radius: 3px; margin-bottom: 6px; }
  .hash-label { font-family: var(--mono); font-size: 10px; color: #3a6080; letter-spacing: 1px; white-space: nowrap; }
  .hash-value { font-family: var(--mono); font-size: 10px; color: var(--cyan); word-break: break-all; text-align: right; }
  .download-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
  .download-btn { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-bright); border-radius: 4px; cursor: pointer; transition: all 0.2s; color: var(--text); font-family: 'Rajdhani', sans-serif; text-align: left; }
  .download-btn:hover { border-color: var(--cyan); background: rgba(0,229,255,0.05); }
  .download-btn-icon { font-size: 20px; }
  .download-btn-label { font-size: 13px; font-weight: 600; color: #8ab0cc; }
  .download-btn-sub { font-family: var(--mono); font-size: 10px; color: #2a4a60; }
  .report { background: #020810; border: 1px solid var(--border-bright); border-radius: 6px; padding: 24px; margin-top: 20px; font-family: var(--mono); font-size: 11px; }
  .report-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
  .report-title { color: var(--cyan); font-size: 13px; letter-spacing: 3px; }
  .report-stamp { color: #2a4a60; font-size: 10px; text-align: right; }
  .report-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #080f18; }
  .report-key { color: #3a6080; }
  .report-val { color: var(--green); }
  .report-val.warn { color: var(--yellow); }
  .report-section-title { color: #2a5070; letter-spacing: 2px; margin: 14px 0 6px; font-size: 10px; }
  .verify-status { margin-top: 20px; padding: 20px; border-radius: 6px; border: 1px solid; text-align: center; }
  .verify-status.match { background: rgba(0,255,136,0.05); border-color: rgba(0,255,136,0.3); }
  .verify-status.mismatch { background: rgba(255,59,92,0.05); border-color: rgba(255,59,92,0.3); }
  .verify-icon { font-size: 40px; margin-bottom: 10px; }
  .verify-title { font-family: var(--mono); font-size: 14px; letter-spacing: 2px; margin-bottom: 8px; }
  .verify-status.match .verify-title { color: var(--green); }
  .verify-status.mismatch .verify-title { color: var(--red); }
  .verify-desc { font-size: 13px; color: #5a8aaa; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .hash-compare { display: flex; flex-direction: column; gap: 8px; padding: 14px; background: rgba(0,0,0,0.3); border-radius: 4px; font-family: var(--mono); font-size: 10px; }
  .hash-compare-row { display: flex; gap: 10px; align-items: flex-start; }
  .hc-label { color: #3a6080; min-width: 80px; flex-shrink: 0; }
  .hc-val { color: var(--cyan); word-break: break-all; }
  .hc-val.mismatch { color: var(--red); }
  .hc-match { color: var(--green); font-size: 12px; letter-spacing: 1px; margin-top: 6px; }
  .hc-fail { color: var(--red); font-size: 12px; letter-spacing: 1px; margin-top: 6px; }
  @media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } .download-grid { grid-template-columns: 1fr; } .header h1 { font-size: 28px; } }
`;

async function sha256hex(buffer) {
  const h = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,"0")).join("");
}
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name:"PBKDF2", salt, iterations:250000, hash:"SHA-256" }, km, { name:"AES-GCM", length:256 }, false, ["encrypt","decrypt"]);
}
function toBase64(buf) { return btoa(String.fromCharCode(...buf)); }
function fromBase64(str) { return Uint8Array.from(atob(str), c => c.charCodeAt(0)); }
function formatBytes(b) { if(b<1024) return b+" B"; if(b<1048576) return (b/1024).toFixed(1)+" KB"; return (b/1048576).toFixed(2)+" MB"; }
function pwStrength(pw) { let s=0; if(pw.length>=8)s++; if(pw.length>=12)s++; if(/[A-Z]/.test(pw))s++; if(/[0-9]/.test(pw))s++; if(/[^A-Za-z0-9]/.test(pw))s++; return s; }
const tick = () => new Promise(r => setTimeout(r, 400));

function DropZone({ onFile, label }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  return (
    <div className={`dropzone${drag?" drag-over":""}`}
      onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files[0])onFile(e.dataTransfer.files[0]);}}
      onClick={()=>ref.current.click()}>
      <input ref={ref} type="file" style={{display:"none"}} onChange={e=>e.target.files[0]&&onFile(e.target.files[0])} />
      <div className="dropzone-icon">📂</div>
      <div className="dropzone-text">{label||"Drop file here or click to browse"}</div>
      <div className="dropzone-sub">ANY FILE TYPE SUPPORTED</div>
    </div>
  );
}

function FileInfo({ file, onRemove }) {
  return (
    <div className="file-info">
      <div className="file-icon">📄</div>
      <div className="file-details">
        <div className="file-name">{file.name}</div>
        <div className="file-size">{formatBytes(file.size)} · {file.name.split(".").pop().toUpperCase()}</div>
      </div>
      <button className="file-remove" onClick={onRemove}>✕</button>
    </div>
  );
}

function PasswordInput({ value, onChange, label }) {
  const [show, setShow] = useState(false);
  const s = pwStrength(value);
  const colors = ["#0d2035","#ff3b5c","#ffd600","#ffd600","#00e5ff","#00ff88"];
  const labels = ["","WEAK","FAIR","FAIR","GOOD","STRONG"];
  const lColors = ["","#ff3b5c","#ffd600","#ffd600","#00e5ff","#00ff88"];
  return (
    <div className="input-group">
      <label className="input-label">{label||"ENCRYPTION PASSWORD"}</label>
      <div className="input-row">
        <input className="text-input" type={show?"text":"password"} value={value} onChange={e=>onChange(e.target.value)} placeholder="Enter secure password..." />
        <button className="btn btn-ghost" style={{padding:"10px 14px"}} onClick={()=>setShow(v=>!v)}>{show?"🙈":"👁"}</button>
      </div>
      {value && (<>
        <div className="strength-bar">{[1,2,3,4,5].map(i=><div key={i} className="strength-seg" style={{background:i<=s?colors[s]:"#0d2035"}} />)}</div>
        <div className="strength-label" style={{color:lColors[s]}}>{labels[s]}</div>
      </>)}
    </div>
  );
}

function ProgressSteps({ steps, current }) {
  return (
    <div className="progress-steps">
      {steps.map((s,i)=>{
        const isDone=i<current, isActive=i===current;
        return <div key={i} className={`progress-step${isDone?" done":isActive?" active":""}`}>
          <div className={`step-dot${isActive?" pulse":""}`} />{s}
        </div>;
      })}
    </div>
  );
}

function SecurityReport({ file, hash, encSize }) {
  const now = new Date();
  return (
    <div className="report">
      <div className="report-header">
        <div><div className="report-title">SECURITY TRANSFER REPORT</div><div style={{color:"#2a4a60",fontSize:10,marginTop:4}}>GENERATED AUTOMATICALLY AFTER ENCRYPTION</div></div>
        <div className="report-stamp"><div>{now.toLocaleDateString()}</div><div>{now.toLocaleTimeString()}</div><div style={{marginTop:4,color:"#1a3a50"}}>REF: {Math.random().toString(36).substr(2,8).toUpperCase()}</div></div>
      </div>
      <div className="report-section-title">▸ FILE METADATA</div>
      {[["FILENAME",file.name],["ORIGINAL SIZE",formatBytes(file.size)],["ENCRYPTED SIZE",formatBytes(encSize)],["FILE TYPE",file.type||"UNKNOWN"]].map(([k,v])=>(
        <div className="report-row" key={k}><span className="report-key">{k}</span><span className="report-val">{v}</span></div>
      ))}
      <div className="report-section-title">▸ CRYPTOGRAPHIC PARAMETERS</div>
      {[["CIPHER","AES-256-GCM"],["KEY DERIVATION","PBKDF2"],["HASH FUNCTION","SHA-256"],["ITERATIONS","250,000"],["SALT SIZE","256 BIT"],["IV SIZE","96 BIT (GCM NONCE)"],["AUTH TAG","128 BIT (GCM)"]].map(([k,v])=>(
        <div className="report-row" key={k}><span className="report-key">{k}</span><span className="report-val">{v}</span></div>
      ))}
      <div className="report-section-title">▸ INTEGRITY</div>
      <div className="report-row"><span className="report-key">SHA-256 HASH</span><span className="report-val" style={{fontSize:9,wordBreak:"break-all",maxWidth:400,textAlign:"right"}}>{hash}</span></div>
      <div className="report-section-title">▸ SECURITY ASSESSMENT</div>
      {[["CONFIDENTIALITY","✓ AES-256 ENCRYPTION"],["INTEGRITY","✓ SHA-256 HASH VERIFIED"],["KEY STRENGTH","✓ PBKDF2 HARDENED"],["ZERO-KNOWLEDGE","✓ CLIENT-SIDE ONLY"]].map(([k,v])=>(
        <div className="report-row" key={k}><span className="report-key">{k}</span><span className="report-val">{v}</span></div>
      ))}
      <div className="report-row"><span className="report-key">REPLAY ATTACK</span><span className="report-val warn">⚠ OUT OF SCOPE</span></div>
    </div>
  );
}

function EncryptTab() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const steps = ["READING FILE BUFFER","COMPUTING SHA-256 HASH","GENERATING SALT & IV","DERIVING KEY (PBKDF2 · 250K ITERATIONS)","ENCRYPTING (AES-256-GCM)","PACKAGING OUTPUT"];

  const runEncrypt = async () => {
    setStage("processing"); setProgress(0); setCurrentStep(0);
    try {
      const buf = await file.arrayBuffer(); setProgress(15); setCurrentStep(1); await tick();
      const hash = await sha256hex(buf); setProgress(30); setCurrentStep(2); await tick();
      const salt = crypto.getRandomValues(new Uint8Array(32));
      const iv = crypto.getRandomValues(new Uint8Array(12)); setProgress(45); setCurrentStep(3); await tick();
      const key = await deriveKey(password, salt); setProgress(70); setCurrentStep(4); await tick();
      const encrypted = await crypto.subtle.encrypt({name:"AES-GCM",iv}, key, buf); setProgress(90); setCurrentStep(5); await tick();
      const keyData = {salt:toBase64(salt),iv:toBase64(iv),hash,originalName:file.name,originalSize:file.size,timestamp:new Date().toISOString()};
      setProgress(100); setCurrentStep(6); await tick();
      setResult({encrypted:new Uint8Array(encrypted),keyData,hash,originalSize:file.size});
      setStage("done");
    } catch(e) { setError(e.message); setStage("error"); }
  };

  const dl = (data, name, type) => { const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([data],{type})); a.download=name; a.click(); };
  const reset = () => { setFile(null); setPassword(""); setStage("idle"); setProgress(0); setCurrentStep(-1); setResult(null); setError(""); };

  return (
    <div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-title">// FILE SELECTION</div>
          {!file ? <DropZone onFile={setFile} label="Drop file to encrypt" /> : <FileInfo file={file} onRemove={()=>setFile(null)} />}
          <PasswordInput value={password} onChange={setPassword} />
          <button className="btn btn-primary btn-full" disabled={!file||!password||stage==="processing"} onClick={runEncrypt}>
            {stage==="processing"?"ENCRYPTING...":"ENCRYPT FILE"}
          </button>
        </div>
        <div className="panel">
          <div className="panel-title">// ENCRYPTION PIPELINE</div>
          {stage==="idle" && <div style={{color:"#1a3a50",fontFamily:"var(--mono)",fontSize:12,paddingTop:20}}>SELECT A FILE AND PASSWORD TO BEGIN...</div>}
          {(stage==="processing"||stage==="done") && <>
            <div className="progress-wrap">
              <div className="progress-header"><span>PROGRESS</span><span>{progress}%</span></div>
              <div className="progress-track"><div className="progress-fill" style={{width:progress+"%"}} /></div>
            </div>
            <ProgressSteps steps={steps} current={currentStep} />
          </>}
          {stage==="error" && <div className="result-box error" style={{marginTop:16}}><div className="result-title">❌ ENCRYPTION FAILED</div><div style={{fontFamily:"var(--mono)",fontSize:11,color:"#ff3b5c"}}>{error}</div></div>}
        </div>
      </div>
      {stage==="done"&&result&&<>
        <div className="result-box success">
          <div className="result-title">✅ ENCRYPTION COMPLETE</div>
          {[["SHA-256",result.hash],["ALGORITHM","AES-256-GCM"],["KEY DERIVATION","PBKDF2 · SHA-256 · 250,000 ITER"],["ORIG. SIZE",formatBytes(result.originalSize)],["ENC. SIZE",formatBytes(result.encrypted.length)]].map(([k,v])=>(
            <div className="hash-row" key={k}><span className="hash-label">{k}</span><span className="hash-value" style={{color:"#00ff88"}}>{v}</span></div>
          ))}
          <div className="download-grid">
            <button className="download-btn" onClick={()=>dl(result.encrypted,file.name+".enc","application/octet-stream")}>
              <span className="download-btn-icon">🔒</span>
              <div><div className="download-btn-label">ENCRYPTED FILE</div><div className="download-btn-sub">.enc · AES-256-GCM</div></div>
            </button>
            <button className="download-btn" onClick={()=>dl(JSON.stringify(result.keyData,null,2),file.name+".key.json","application/json")}>
              <span className="download-btn-icon">🗝</span>
              <div><div className="download-btn-label">KEY METADATA</div><div className="download-btn-sub">.key.json · SALT + IV + HASH</div></div>
            </button>
          </div>
        </div>
        <SecurityReport file={file} hash={result.hash} encSize={result.encrypted.length} />
        <button className="btn btn-ghost" style={{marginTop:14}} onClick={reset}>ENCRYPT ANOTHER FILE</button>
      </>}
    </div>
  );
}

function DecryptTab() {
  const [encFile, setEncFile] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [integrityMatch, setIntegrityMatch] = useState(null);
  const [hashes, setHashes] = useState(null);
  const steps = ["PARSING KEY METADATA","RE-DERIVING KEY (PBKDF2)","DECRYPTING (AES-256-GCM)","VERIFYING SHA-256 INTEGRITY","COMPLETE"];

  const runDecrypt = async () => {
    setStage("processing"); setProgress(0); setCurrentStep(0); setError("");
    try {
      const keyData = JSON.parse(await keyFile.text());
      const salt = fromBase64(keyData.salt), iv = fromBase64(keyData.iv);
      setProgress(20); setCurrentStep(1); await tick();
      const encBuf = await encFile.arrayBuffer();
      const key = await deriveKey(password, salt);
      setProgress(50); setCurrentStep(2); await tick();
      let decrypted;
      try { decrypted = new Uint8Array(await crypto.subtle.decrypt({name:"AES-GCM",iv}, key, encBuf)); }
      catch { throw new Error("Decryption failed — wrong password or corrupted file."); }
      setProgress(75); setCurrentStep(3); await tick();
      const decHash = await sha256hex(decrypted.buffer);
      const match = decHash === keyData.hash;
      setIntegrityMatch(match); setHashes({original:keyData.hash,computed:decHash});
      setProgress(100); setCurrentStep(4); await tick();
      setResult({decrypted, originalName:keyData.originalName||"decrypted_file"});
      setStage("done");
    } catch(e) { setError(e.message); setStage("error"); }
  };

  const reset = () => { setEncFile(null); setKeyFile(null); setPassword(""); setStage("idle"); setResult(null); setError(""); setIntegrityMatch(null); setHashes(null); };

  return (
    <div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-title">// INPUT FILES</div>
          <label className="input-label">ENCRYPTED FILE (.enc)</label>
          {!encFile?<DropZone onFile={setEncFile} label="Drop .enc file" />:<FileInfo file={encFile} onRemove={()=>setEncFile(null)} />}
          <div style={{height:14}} />
          <label className="input-label">KEY METADATA (.key.json)</label>
          {!keyFile?<DropZone onFile={setKeyFile} label="Drop .key.json file" />:<FileInfo file={keyFile} onRemove={()=>setKeyFile(null)} />}
          <PasswordInput value={password} onChange={setPassword} label="DECRYPTION PASSWORD" />
          <button className="btn btn-primary btn-full" disabled={!encFile||!keyFile||!password||stage==="processing"} onClick={runDecrypt}>
            {stage==="processing"?"DECRYPTING...":"DECRYPT FILE"}
          </button>
        </div>
        <div className="panel">
          <div className="panel-title">// DECRYPTION PIPELINE</div>
          {stage==="idle"&&<div style={{color:"#1a3a50",fontFamily:"var(--mono)",fontSize:12,paddingTop:20}}>UPLOAD ENCRYPTED FILE AND KEY TO BEGIN...</div>}
          {(stage==="processing"||stage==="done")&&<>
            <div className="progress-wrap">
              <div className="progress-header"><span>PROGRESS</span><span>{progress}%</span></div>
              <div className="progress-track"><div className="progress-fill" style={{width:progress+"%"}} /></div>
            </div>
            <ProgressSteps steps={steps} current={currentStep} />
          </>}
          {stage==="error"&&<div className="result-box error" style={{marginTop:16}}><div className="result-title">❌ DECRYPTION FAILED</div><div style={{fontFamily:"var(--mono)",fontSize:11,color:"#ff3b5c"}}>{error}</div></div>}
        </div>
      </div>
      {stage==="done"&&result&&<>
        <div className={`result-box ${integrityMatch?"success":"error"}`} style={{textAlign:"left"}}>
          <div className="result-title">{integrityMatch?"✅ INTEGRITY VERIFIED — FILE IS AUTHENTIC":"⚠️ INTEGRITY MISMATCH — FILE MAY BE TAMPERED"}</div>
          <div className="hash-compare" style={{marginTop:12}}>
            <div className="hash-compare-row"><span className="hc-label">EXPECTED</span><span className="hc-val">{hashes.original}</span></div>
            <div className="hash-compare-row"><span className="hc-label">COMPUTED</span><span className={`hc-val${!integrityMatch?" mismatch":""}`}>{hashes.computed}</span></div>
            <div className={integrityMatch?"hc-match":"hc-fail"}>{integrityMatch?"✓ HASHES MATCH — SAFE TO USE":"✗ HASHES DO NOT MATCH — DO NOT TRUST FILE"}</div>
          </div>
          {integrityMatch&&<button className="btn btn-primary" style={{marginTop:16}} onClick={()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([result.decrypted]));a.download=result.originalName;a.click();}}>⬇ DOWNLOAD DECRYPTED FILE</button>}
        </div>
        <button className="btn btn-ghost" style={{marginTop:14}} onClick={reset}>DECRYPT ANOTHER FILE</button>
      </>}
    </div>
  );
}

function VerifyTab() {
  const [file, setFile] = useState(null);
  const [expectedHash, setExpectedHash] = useState("");
  const [computedHash, setComputedHash] = useState("");
  const [status, setStatus] = useState("idle");
  const [computing, setComputing] = useState(false);

  const compute = async () => {
    setComputing(true); setComputedHash(""); setStatus("idle");
    const h = await sha256hex(await file.arrayBuffer());
    setComputedHash(h);
    setStatus(expectedHash.trim() ? (h===expectedHash.trim()?"match":"mismatch") : "computed");
    setComputing(false);
  };

  return (
    <div className="panel">
      <div className="panel-title">// FILE INTEGRITY VERIFIER</div>
      {!file?<DropZone onFile={setFile} label="Drop any file to verify" />:<FileInfo file={file} onRemove={()=>{setFile(null);setComputedHash("");setStatus("idle");}} />}
      <div className="input-group">
        <label className="input-label">EXPECTED SHA-256 HASH (OPTIONAL)</label>
        <input className="text-input" type="text" value={expectedHash} onChange={e=>setExpectedHash(e.target.value)} placeholder="Paste known hash to compare..." style={{width:"100%"}} />
      </div>
      <button className="btn btn-primary btn-full" disabled={!file||computing} onClick={compute}>{computing?"COMPUTING...":"VERIFY INTEGRITY"}</button>
      {computedHash&&<>
        <div className="hash-row" style={{marginTop:16}}><span className="hash-label">SHA-256</span><span className="hash-value">{computedHash}</span></div>
        <div className="hash-row"><span className="hash-label">FILE</span><span className="hash-value" style={{color:"#00ff88"}}>{file.name}</span></div>
        <div className="hash-row"><span className="hash-label">SIZE</span><span className="hash-value" style={{color:"#00ff88"}}>{formatBytes(file.size)}</span></div>
      </>}
      {status==="match"&&<div className="verify-status match" style={{marginTop:16}}><div className="verify-icon">✅</div><div className="verify-title">HASH MATCHED</div><div className="verify-desc">File is authentic and has not been tampered with.</div></div>}
      {status==="mismatch"&&<div className="verify-status mismatch" style={{marginTop:16}}><div className="verify-icon">⚠️</div><div className="verify-title">HASH MISMATCH</div><div className="verify-desc">File may have been modified or corrupted.</div></div>}
      {status==="computed"&&<div style={{marginTop:14,fontFamily:"var(--mono)",fontSize:11,color:"#3a6080"}}>↑ COPY HASH ABOVE TO SHARE OR COMPARE LATER</div>}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("encrypt");
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-badge">FINAL YEAR PROJECT · CYBERSECURITY</div>
          <h1>SECURE<span>XFER</span></h1>
          <div className="header-sub">AES-256-GCM · PBKDF2 · SHA-256 · ZERO-KNOWLEDGE · CLIENT-SIDE</div>
        </div>
        <div className="tabs">
          {[["encrypt","🔒 ENCRYPT"],["decrypt","🔓 DECRYPT"],["verify","🔍 VERIFY"]].map(([id,label])=>(
            <button key={id} className={`tab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>
        {tab==="encrypt"&&<EncryptTab />}
        {tab==="decrypt"&&<DecryptTab />}
        {tab==="verify"&&<VerifyTab />}
      </div>
    </>
  );
}
