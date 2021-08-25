import React from 'react';

interface Props {
  svgPath?: string;
  text?: string;
}

const AnimatedLoader: React.FC<Props> = ({ svgPath, text = '' }) => {
  return (
    <div>
      <object type="image/svg+xml" data={svgPath ?? '/loader.svg'}>
        {text}
      </object>
    </div>
  );
};

export default AnimatedLoader;
