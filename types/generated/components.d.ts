import type { Schema, Attribute } from '@strapi/strapi';

export interface IndexPageCarouselIndexPage extends Schema.Component {
  collectionName: 'components_index_page_carousel_index_pages';
  info: {
    displayName: 'Carousel Index Page';
    icon: 'picture';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subTitle: Attribute.Text;
    url: Attribute.Text;
    background: Attribute.Media<'images'> & Attribute.Required;
    buttonText: Attribute.String;
    img: Attribute.Media<'images'>;
  };
}

export interface IndexPageImageLibraryItem extends Schema.Component {
  collectionName: 'components_index_page_image_library_items';
  info: {
    displayName: 'Image Library Item';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface IndexPageInfoBanner extends Schema.Component {
  collectionName: 'components_index_page_info_banners';
  info: {
    displayName: 'FactBanner';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    key: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

export interface MajorSyllabus extends Schema.Component {
  collectionName: 'components_major_syllabi';
  info: {
    displayName: 'Syllabus';
    icon: 'bulletList';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Value: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'index-page.carousel-index-page': IndexPageCarouselIndexPage;
      'index-page.image-library-item': IndexPageImageLibraryItem;
      'index-page.info-banner': IndexPageInfoBanner;
      'major.syllabus': MajorSyllabus;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
