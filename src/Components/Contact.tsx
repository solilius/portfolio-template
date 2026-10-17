import React, { useState } from "react";
import { styled } from "styled-components";
import { config } from "../config";
import { PersonalInfo, socials } from "../data";
import { Button, Container, Eyebrow, Section, SectionLead, SectionTitle } from "../Styles/StyledComponents";
import Icon from "./Icon";

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 56px;
  border-radius: 28px;
  border: 1px solid var(--line-strong);
  background: radial-gradient(600px 300px at 0% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%),
    radial-gradient(600px 300px at 100% 100%, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 70%), var(--surface);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 36px 24px;
    gap: 32px;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
`;

const Channels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Channel = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(4, 7, 15, 0.45);
  transition: border-color 0.2s, transform 0.2s, background 0.2s;

  &:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--line-strong);
    background: rgba(4, 7, 15, 0.7);
  }

  span.icon {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
  }

  b {
    display: block;
    font-weight: 600;
  }

  small {
    display: block;
    color: var(--faint);
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > span:last-child {
    min-width: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 28px;

  textarea {
    min-height: 110px;
    resize: vertical;
  }

  ${Button} {
    align-self: flex-start;
    border: 0;
  }
`;

// "mailto:you@example.com" -> "you@example.com", "https://github.com/you" -> "github.com/you"
const handle = (url: string) => url.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hey, my name is ${name}\n${message}`;
    window.open(`https://wa.me/${config.phoneNumberToSend}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Section id="contact">
      <Container>
        <Panel>
          <Intro>
            <Eyebrow>Contact</Eyebrow>
            <SectionTitle>Let's work together</SectionTitle>
            <SectionLead>{PersonalInfo.contactText}</SectionLead>

            {config.phoneNumberToSend && (
              <Form onSubmit={sendWhatsApp}>
                <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <Button as="button" type="submit">
                  <Icon name="whatsapp" size={18} />
                  Send via WhatsApp
                </Button>
              </Form>
            )}
          </Intro>

          <Channels>
            {socials.map((s) => (
              <Channel key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <Icon name={s.icon} />
                </span>
                <span>
                  <b>{s.label}</b>
                  <small>{handle(s.url)}</small>
                </span>
              </Channel>
            ))}
          </Channels>
        </Panel>
      </Container>
    </Section>
  );
};

export default Contact;
