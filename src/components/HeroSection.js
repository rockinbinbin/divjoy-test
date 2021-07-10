import React from "react";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Link from "next/link";

function HeroSection(props) {
  return (
    <Section
      color={props.color}
      size={props.size}
      backgroundImage={props.backgroundImage}
      backgroundImageOpacity={props.backgroundImageOpacity}
    >
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={1}
          spaced={true}
          className="has-text-centered"
        />
        <div className="buttons is-centered">
          <Link href={props.buttonPath}>
            <a
              className={
                "button is-medium" +
                (props.buttonColor ? ` is-${props.buttonColor}` : "") +
                (props.buttonInverted ? " is-inverted" : "")
              }
            >
              {props.buttonText}
            </a>
          </Link>
        </div>
        <div className="buttons is-centered">
          <Link href="/tailwind-demo">
            Tailwind Demo
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default HeroSection;
