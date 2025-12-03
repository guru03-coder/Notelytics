import React, { useState } from 'react';
import { Network, Plus, BookOpen } from 'lucide-react';
import { Button } from './Button';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

export function ConceptMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: '1', label: 'Machine Learning', x: 50, y: 30, connections: ['2', '3', '4'] },
    { id: '2', label: 'Supervised Learning', x: 25, y: 60, connections: ['1'] },
    { id: '3', label: 'Unsupervised Learning', x: 50, y: 70, connections: ['1'] },
    { id: '4', label: 'Reinforcement Learning', x: 75, y: 60, connections: ['1'] },
    { id: '5', label: 'Neural Networks', x: 25, y: 90, connections: ['2'] },
    { id: '6', label: 'Decision Trees', x: 50, y: 95, connections: ['2'] }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[var(--text-primary)] mb-4">Interactive Concept Maps</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Visualize how concepts connect. AI automatically builds knowledge graphs from your study materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept Map Canvas */}
          <div className="lg:col-span-2 p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network size={20} className="text-[var(--color-primary)]" />
                <span className="text-[var(--text-primary)]">Knowledge Graph</span>
              </div>
              <Button variant="ghost" size="sm">
                <Plus size={16} className="mr-2" />
                Add Node
              </Button>
            </div>

            <div className="relative h-96 bg-[var(--bg)] rounded-xl border border-white/5 overflow-hidden">
              <svg className="w-full h-full">
                {/* Draw connections */}
                {nodes.map(node => 
                  node.connections.map(targetId => {
                    const target = nodes.find(n => n.id === targetId);
                    if (!target) return null;
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke="rgba(76, 110, 245, 0.3)"
                        strokeWidth="2"
                      />
                    );
                  })
                )}

                {/* Draw nodes */}
                {nodes.map(node => (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r="8"
                      fill={selectedNode === node.id ? 'url(#gradient)' : 'rgba(76, 110, 245, 0.5)'}
                      className="transition-all hover:r-10"
                    />
                    <text
                      x={`${node.x}%`}
                      y={`${node.y - 2}%`}
                      textAnchor="middle"
                      fill="var(--text-primary)"
                      fontSize="12"
                      dy="-12"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 flex gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/5 text-[var(--text-secondary)] flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
                6 Concepts
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/5 text-[var(--text-secondary)] flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]"></div>
                8 Connections
              </div>
            </div>
          </div>

          {/* Node Details Panel */}
          <div className="p-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-white/5 backdrop-blur-[var(--blur)]">
            {selectedNode ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <h3 className="text-[var(--text-primary)]">
                    {nodes.find(n => n.id === selectedNode)?.label}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[var(--text-secondary)] mb-2">Sources</div>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-white/5 text-[var(--text-primary)]">
                        ML_Notes.pdf (p. 2-4)
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 text-[var(--text-primary)]">
                        Lecture_03.pdf (p. 1)
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[var(--text-secondary)] mb-2">Summary</div>
                    <p className="text-[var(--text-primary)]">
                      Core concept covering algorithms that learn from labeled data to make predictions.
                    </p>
                  </div>

                  <Button variant="secondary" className="w-full">
                    Add to Study Plan
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Network size={48} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                <p className="text-[var(--text-secondary)]">
                  Click a node to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
