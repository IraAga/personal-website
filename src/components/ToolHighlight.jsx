import { Github } from 'lucide-react'

const CODE = `bt-traffic-gen — Bluetooth traffic generator & packet capture tool

# Generate TCP/UDP traffic flows
bt-traffic-gen flow --protocol tcp --rate 100Mbps --duration 60s

# Capture and filter packets
bt-traffic-gen capture --interface eth0 --filter "tcp port 443"

# Generate Bluetooth LE advertising traffic on channel 37
bt-traffic-gen ble --channel 37 --count 1000

# Interactive packet inspection
bt-traffic-gen shell`

export default function ToolHighlight() {
  return (
    <div>
      <p className="text-sm text-zinc-400 mb-4">
        A CLI tool for Bluetooth traffic data generation and packet capture,
        developed as part of research at FORTH-ICS. Generates network flows,
        captures packets, and supports BLE advertising traffic for stress testing.
      </p>
      <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed">
        <code className="text-zinc-200">{CODE}</code>
      </pre>
      <a
        href="https://github.com/iagathis/bt-traffic-gen"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors mt-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={16} />
        View on GitHub
      </a>
    </div>
  )
}
