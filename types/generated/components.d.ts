import type { Schema, Attribute } from '@strapi/strapi';

export interface IndexPageCarouselIndexPage extends Schema.Component {
  collectionName: 'components_index_page_carousel_index_pages';
  info: {
    displayName: 'Carousel Index Page';
    icon: 'picture';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subTitle: Attribute.Text;
    url: Attribute.Text;
    background: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    buttonText: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'index-page.carousel-index-page': IndexPageCarouselIndexPage;
    }
  }
}
