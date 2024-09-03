import Image from 'next/image';
import React from 'react';

type Props = {
  name: string;
  height: number;
  width: number;
};

const Icon = ({ name, width, height }: Props) => {
  return (
    <Image alt={name} src={`/svgs/${name}.svg`} height={height} width={width} />
  );
};

export default Icon;
