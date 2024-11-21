// mathComponent.js
import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

const MathComponent = ({ latex, inline = false }) => {
  return inline ? (
    <InlineMath math={latex} />
  ) : (
    <BlockMath math={latex} />
  );
};

export default MathComponent;
