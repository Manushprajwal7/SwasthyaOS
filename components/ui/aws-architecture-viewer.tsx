"use client";

import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card } from "@/components/ui/card";

// Custom node component for AWS services
function AWSServiceNode({
  data,
}: {
  data: {
    label: string;
    service: string;
    description: string;
    color: string;
    icon: string;
  };
}) {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-lg bg-white dark:bg-slate-800 min-w-[180px] ${data.color}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon}</span>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {data.service}
        </span>
      </div>
      <p className="font-semibold text-sm text-slate-900 dark:text-white">
        {data.label}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {data.description}
      </p>
    </div>
  );
}

// Data source node
function DataSourceNode({
  data,
}: {
  data: { label: string; items: string[] };
}) {
  return (
    <div className="px-4 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 min-w-[160px]">
      <p className="font-semibold text-sm text-slate-900 dark:text-white mb-2">
        {data.label}
      </p>
      <ul className="space-y-1">
        {data.items.map((item, i) => (
          <li
            key={i}
            className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Output node
function OutputNode({
  data,
}: {
  data: { label: string; description: string };
}) {
  return (
    <div className="px-4 py-3 rounded-lg border-2 border-teal-500 bg-teal-50 dark:bg-teal-950 min-w-[160px]">
      <p className="font-semibold text-sm text-teal-700 dark:text-teal-300">
        {data.label}
      </p>
      <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
        {data.description}
      </p>
    </div>
  );
}

const nodeTypes = {
  awsService: AWSServiceNode,
  dataSource: DataSourceNode,
  output: OutputNode,
};

const initialNodes: Node[] = [
  // Input Sources
  {
    id: "input-voice",
    type: "dataSource",
    position: { x: 0, y: 0 },
    data: {
      label: "Voice Input",
      items: [
        "Clinician dictation",
        "ASHA consultations",
        "Patient interviews",
      ],
    },
    sourcePosition: Position.Right,
  },
  {
    id: "input-data",
    type: "dataSource",
    position: { x: 0, y: 180 },
    data: {
      label: "Clinical Data",
      items: ["Vitals", "Symptoms", "Lab results", "Medical history"],
    },
    sourcePosition: Position.Right,
  },
  {
    id: "input-stream",
    type: "dataSource",
    position: { x: 0, y: 380 },
    data: {
      label: "Real-time Streams",
      items: ["IoT devices", "Wearables", "PHC feeds"],
    },
    sourcePosition: Position.Right,
  },

  // AWS Services - Layer 1 (Ingestion)
  {
    id: "transcribe",
    type: "awsService",
    position: { x: 280, y: 0 },
    data: {
      label: "Voice Transcription",
      service: "Transcribe Medical",
      description: "Hindi + 10 regional languages",
      color: "border-orange-400",
      icon: "🎤",
    },
  },
  {
    id: "kinesis",
    type: "awsService",
    position: { x: 280, y: 380 },
    data: {
      label: "Stream Processing",
      service: "Kinesis",
      description: "Real-time data ingestion",
      color: "border-purple-400",
      icon: "📊",
    },
  },

  // AWS Services - Layer 2 (Processing)
  {
    id: "comprehend",
    type: "awsService",
    position: { x: 540, y: 90 },
    data: {
      label: "Medical NLP",
      service: "Comprehend Medical",
      description: "Entity extraction, ICD-10, RxNorm",
      color: "border-blue-400",
      icon: "🔍",
    },
  },
  {
    id: "healthlake",
    type: "awsService",
    position: { x: 540, y: 260 },
    data: {
      label: "FHIR Data Store",
      service: "HealthLake",
      description: "HL7 FHIR R4 compliant",
      color: "border-green-400",
      icon: "🏥",
    },
  },

  // AWS Services - Layer 3 (AI/ML)
  {
    id: "bedrock",
    type: "awsService",
    position: { x: 800, y: 120 },
    data: {
      label: "Clinical AI Engine",
      service: "Bedrock",
      description: "Claude 3 Sonnet · 200K context",
      color: "border-teal-500",
      icon: "🧠",
    },
  },
  {
    id: "sagemaker",
    type: "awsService",
    position: { x: 800, y: 300 },
    data: {
      label: "Epidemic Forecasting",
      service: "SageMaker",
      description: "Outbreak prediction models",
      color: "border-pink-400",
      icon: "📈",
    },
  },

  // Outputs
  {
    id: "output-clinical",
    type: "output",
    position: { x: 1080, y: 60 },
    data: {
      label: "Clinical Decisions",
      description: "Diagnosis, Rx, Referrals",
    },
    targetPosition: Position.Left,
  },
  {
    id: "output-population",
    type: "output",
    position: { x: 1080, y: 200 },
    data: {
      label: "Population Health",
      description: "Surveillance, Alerts",
    },
    targetPosition: Position.Left,
  },
  {
    id: "output-audit",
    type: "output",
    position: { x: 1080, y: 340 },
    data: {
      label: "Audit Trail",
      description: "SHA-256 logged",
    },
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  // Input to Transcribe
  {
    id: "e-voice-transcribe",
    source: "input-voice",
    target: "transcribe",
    animated: true,
    style: { stroke: "#f97316" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
  },
  // Input to HealthLake
  {
    id: "e-data-healthlake",
    source: "input-data",
    target: "healthlake",
    animated: true,
    style: { stroke: "#22c55e" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  // Input to Kinesis
  {
    id: "e-stream-kinesis",
    source: "input-stream",
    target: "kinesis",
    animated: true,
    style: { stroke: "#a855f7" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" },
  },
  // Transcribe to Comprehend
  {
    id: "e-transcribe-comprehend",
    source: "transcribe",
    target: "comprehend",
    animated: true,
    style: { stroke: "#3b82f6" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
  },
  // Comprehend to HealthLake
  {
    id: "e-comprehend-healthlake",
    source: "comprehend",
    target: "healthlake",
    animated: true,
    style: { stroke: "#22c55e" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  // Kinesis to HealthLake
  {
    id: "e-kinesis-healthlake",
    source: "kinesis",
    target: "healthlake",
    animated: true,
    style: { stroke: "#22c55e" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  // HealthLake to Bedrock
  {
    id: "e-healthlake-bedrock",
    source: "healthlake",
    target: "bedrock",
    animated: true,
    style: { stroke: "#14b8a6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#14b8a6" },
  },
  // Comprehend to Bedrock
  {
    id: "e-comprehend-bedrock",
    source: "comprehend",
    target: "bedrock",
    animated: true,
    style: { stroke: "#14b8a6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#14b8a6" },
  },
  // HealthLake to SageMaker
  {
    id: "e-healthlake-sagemaker",
    source: "healthlake",
    target: "sagemaker",
    animated: true,
    style: { stroke: "#ec4899" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ec4899" },
  },
  // Kinesis to SageMaker
  {
    id: "e-kinesis-sagemaker",
    source: "kinesis",
    target: "sagemaker",
    animated: true,
    style: { stroke: "#ec4899" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ec4899" },
  },
  // Bedrock to Clinical Output
  {
    id: "e-bedrock-clinical",
    source: "bedrock",
    target: "output-clinical",
    animated: true,
    style: { stroke: "#14b8a6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#14b8a6" },
  },
  // SageMaker to Population Output
  {
    id: "e-sagemaker-population",
    source: "sagemaker",
    target: "output-population",
    animated: true,
    style: { stroke: "#ec4899" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ec4899" },
  },
  // Bedrock to Audit
  {
    id: "e-bedrock-audit",
    source: "bedrock",
    target: "output-audit",
    style: { stroke: "#64748b", strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  // SageMaker to Audit
  {
    id: "e-sagemaker-audit",
    source: "sagemaker",
    target: "output-audit",
    style: { stroke: "#64748b", strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
];

interface AWSArchitectureViewerProps {
  className?: string;
}

export function AWSArchitectureViewer({
  className,
}: AWSArchitectureViewerProps) {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <Card className={`p-0 overflow-hidden ${className || ""}`}>
      <div className="h-[500px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e2e8f0" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5 bg-teal-500"
              style={{ animation: "pulse 2s infinite" }}
            />
            <span className="text-muted-foreground">
              AI Processing Pipeline
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5 bg-slate-400"
              style={{ borderStyle: "dashed" }}
            />
            <span className="text-muted-foreground">Audit Trail</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Region:</span>
            <span className="font-mono text-teal-600">ap-south-1 (Mumbai)</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
