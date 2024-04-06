import React from "react";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[:]/g, "");

const Heading = ({ level, children }) => {
  const slug = slugify(children);
  const Tag = `h${level}`;

  const Component = React.createElement(
    Tag,
    { id: slug },
    <>
      {children}
      <a href={`#${slug}`} className="anchor">
        ¶
      </a>
    </>
  );

  return Component;
};

export const H1 = (props) => <Heading level={1} {...props} />;
export const H2 = (props) => <Heading level={2} {...props} />;
export const H3 = (props) => <Heading level={3} {...props} />;
export const H4 = (props) => <Heading level={4} {...props} />;
export const H5 = (props) => <Heading level={5} {...props} />;
export const H6 = (props) => <Heading level={6} {...props} />;
