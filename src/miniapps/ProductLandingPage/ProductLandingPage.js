import React from 'react';
import { ReactComponent as CalendarSvg } from './assets/icons/calendar.svg';
import { ReactComponent as LineChartSvg } from './assets/icons/chart-line.svg';
import { ReactComponent as DollarSvg } from './assets/icons/currency-dollar.svg';
import { ReactComponent as OrderedListSvg } from './assets/icons/list-numbers.svg';
import { ReactComponent as TableSvg } from './assets/icons/table.svg';
import { ReactComponent as TrendUpSvg } from './assets/icons/trend-up.svg';
import { ReactComponent as FileTextSvg } from './assets/icons/file-text.svg';
import { ReactComponent as HandshakeSvg } from './assets/icons/handshake.svg';
import { ReactComponent as SigninSvg } from './assets/icons/sign-in.svg';
import FaqQuestions from './FaqQuestions';
import {
  LandingPage,
  PageStyle,
  HeaderSection,
  Logo,
  LogoImg,
  LogoText,
  HeaderDots,
  Nav,
  ButtonOutlined,
  ButtonBlue,
  HeroSection,
  HeroLeft,
  HeroTitle,
  ButtonOrange,
  HeroImg,
  HeroRight,
  HeroFeatures,
  HeroFeature,
  GetStartedSection,
  GetStartedCall,
  GetStartedIntro,
  Step,
  BenefitsSection,
  BenefitsTitle,
  BenefitsImg,
  Benefit,
  BenefitTitle,
  BenefitDesc,
  BenefitsList,
  JoinSection,
  JoinLeftDotsBg,
  JoinRightDotsBg,
  JoinText,
  FaqSection,
  FaqTitle,
  FaqSubtitle,
  FaqImg,
  ContactSection,
  FooterSection,
  FooterMenuTitle,
  FooterLiLink,
} from './styles';

const ProductLandingPage = () => {
  return (
    <LandingPage>
      <PageStyle />

      <HeaderSection>
        <Logo>
          <LogoImg />
          <LogoText>accounto</LogoText>
        </Logo>
        <HeaderDots />
        <Nav>
          <ButtonOutlined>Login</ButtonOutlined>
          <ButtonBlue>Sign up Free</ButtonBlue>
        </Nav>
      </HeaderSection>

      <HeroSection>
        <HeroLeft>
          <HeroTitle>
            Simplifying the Financial Management of Your Business
          </HeroTitle>
          <ButtonOrange>Get Free Trial Now</ButtonOrange>
          <ButtonBlue>Watch Demo</ButtonBlue>
        </HeroLeft>
        <HeroRight>
          <HeroImg />
          <HeroFeatures>
            <HeroFeature>
              Payroll <DollarSvg />
            </HeroFeature>
            <HeroFeature>
              Easy Invoicing <TableSvg />
            </HeroFeature>
            <HeroFeature>
              Customizable <OrderedListSvg />
            </HeroFeature>
            <HeroFeature>
              Tax Advisory <LineChartSvg />
            </HeroFeature>
            <HeroFeature>
              Optimization <TrendUpSvg />
            </HeroFeature>
            <HeroFeature>
              Month End <CalendarSvg />
            </HeroFeature>
          </HeroFeatures>
        </HeroRight>
      </HeroSection>

      <GetStartedSection>
        <GetStartedIntro>
          Three steps <GetStartedCall>to get started</GetStartedCall>
        </GetStartedIntro>
        <Step>
          <SigninSvg />
          Create a free account
        </Step>
        <Step>
          <HandshakeSvg />
          Talk to experts
        </Step>
        <Step>
          <FileTextSvg />
          Get monthly review
        </Step>
      </GetStartedSection>

      <BenefitsSection>
        <BenefitsTitle>
          How accounting with
          <span>
            <mark>Accounto</mark> will benefit your business
          </span>
        </BenefitsTitle>

        <BenefitsList>
          <Benefit>
            <BenefitTitle>Payroll</BenefitTitle>
            <BenefitDesc>
              Focus on your core elements while Accounto takes care of your
              payrolls
            </BenefitDesc>
          </Benefit>
          <Benefit>
            <BenefitTitle>Easy Invoicing</BenefitTitle>
            <BenefitDesc>
              Get your invoices structured error-free to increase productivity
              in your business finances
            </BenefitDesc>
          </Benefit>
          <Benefit>
            <BenefitTitle>Customizable</BenefitTitle>
            <BenefitDesc>
              Our solution is flexible and customizable, fully adaptable to your
              business
            </BenefitDesc>
          </Benefit>
        </BenefitsList>

        <BenefitsImg />

        <BenefitsList>
          <Benefit>
            <BenefitTitle>Tax Advisory</BenefitTitle>
            <BenefitDesc>
              Get advice on financial strategies to manage your taxes and better
              decision-making
            </BenefitDesc>
          </Benefit>
          <Benefit>
            <BenefitTitle>Optimization</BenefitTitle>
            <BenefitDesc>
              Enhance your business accounts to increase efficiency and give
              better results
            </BenefitDesc>
          </Benefit>
          <Benefit>
            <BenefitTitle>Month End</BenefitTitle>
            <BenefitDesc>
              Walking you through monthly reports and accounting records
            </BenefitDesc>
          </Benefit>
        </BenefitsList>
      </BenefitsSection>

      <JoinSection>
        <JoinLeftDotsBg />
        <JoinText>
          Join <mark>1000+</mark> Users <br />
          and start Free Accounting with Accounto
        </JoinText>
        <ButtonOutlined>Let&apos;s Start!</ButtonOutlined>
        <JoinRightDotsBg />
      </JoinSection>

      <FaqSection>
        <FaqTitle>Frequently Asked Questions</FaqTitle>
        <FaqSubtitle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sint
          qui, nesciunt impedit necessitatibus iusto aliquam voluptatum tenetur
          dolorem molestiae ad sequi ex delectus?
        </FaqSubtitle>
        <FaqQuestions
          QandAs={[
            {
              title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis repudiandae odit error fugiat porro quaerat sint doloremque illum! Ab quae hic sed non corrupti odio nulla debitis et eaque?',
            },
            {
              title: 'Lorem, ipsum dolor sit amet consectetur adipisicing',
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis repudiandae odit error fugiat porro quaerat sint doloremque illum! Ab quae hic sed non corrupti odio nulla debitis et eaque?',
            },
            {
              title:
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, laboriosam?',
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis repudiandae odit error fugiat porro quaerat sint doloremque illum! Ab quae hic sed non corrupti odio nulla debitis et eaque?',
            },
            {
              title:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut eos aspernatur',
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis repudiandae odit error fugiat porro quaerat sint doloremque illum! Ab quae hic sed non corrupti odio nulla debitis et eaque?',
            },
          ]}
        />
        <FaqImg />
      </FaqSection>

      <ContactSection>
        <h2>Got a question?</h2>
        <div>Leave your email, we will contact you shortly!</div>
        <input placeholder="Your email" />
        <ButtonOrange>Send</ButtonOrange>
      </ContactSection>

      <FooterSection>
        <div>
          <div>
            <Logo>
              <LogoImg />
              <LogoText>accounto</LogoText>
            </Logo>
          </div>
          <div>
            <FooterMenuTitle>Product</FooterMenuTitle>
            <ul>
              <FooterLiLink>Accounting</FooterLiLink>
              <FooterLiLink>Auditing</FooterLiLink>
              <FooterLiLink>Book Keeping</FooterLiLink>
              <FooterLiLink>CFO</FooterLiLink>
              <FooterLiLink>Taxation</FooterLiLink>
            </ul>
          </div>
          <div>
            <FooterMenuTitle>Solution</FooterMenuTitle>
            <ul>
              <FooterLiLink>Ecommerce</FooterLiLink>
              <FooterLiLink>Professional Service</FooterLiLink>
              <FooterLiLink>Startup</FooterLiLink>
              <FooterLiLink>Case Study</FooterLiLink>
            </ul>
          </div>
          <div>
            <h3>Address:</h3>282-8351 Tincidunt
            <br />
            Ave Sedalia Utah 53700
            <br />
            <h3>Telephone:</h3> (252) 204-1434
          </div>
          <div>
            Copyright 2020 &#169; - All rights reserved
            <br />
            Inspired by
            <a href="https://www.behance.net/gallery/107699295/Landing-Page">
              this design
            </a>
          </div>
        </div>
      </FooterSection>
    </LandingPage>
  );
};

export default ProductLandingPage;
