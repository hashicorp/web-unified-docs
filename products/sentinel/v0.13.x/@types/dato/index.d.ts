/* eslint-disable */
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  /** Represents `true` or `false` values. */
  BooleanType: any
  ItemId: any
  /** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  IntType: any
  UploadId: any
  Date: any
  /**
   * Represents signed double-precision fractional values as specified by [IEEE
   * 754](http://en.wikipedia.org/wiki/IEEE_floating_point).
   **/
  FloatType: any
  MetaTagAttributes: any
  JsonField: any
}

export type AboutPageModelPageContentField =
  | CalloutSectionRecord
  | HeroSectionRecord
  | PersonListRecord
  | TwoColumnTextSectionRecord

/** Record of type About Page (about_page) */
export type AboutPageRecord = {
  __typename?: 'AboutPageRecord'
  _allNameLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  name?: Maybe<Scalars['String']>
  pageContent?: Maybe<Array<Maybe<AboutPageModelPageContentField>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type About Page (about_page) */
export type AboutPageRecord_AllNameLocalesArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type About Page (about_page) */
export type AboutPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type About Page (about_page) */
export type AboutPageRecordNameArgs = {
  locale?: Maybe<SiteLocale>
}

export type AlertBannerModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  linkText?: Maybe<StringFilter>
  tag?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  text?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  theme?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<AlertBannerModelFilter>>>
}

export enum AlertBannerModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  LinkTextAsc = 'linkText_ASC',
  LinkTextDesc = 'linkText_DESC',
  TagAsc = 'tag_ASC',
  TagDesc = 'tag_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC'
}

/** Record of type Alert Banner (alert_banner) */
export type AlertBannerRecord = {
  __typename?: 'AlertBannerRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  linkText?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Alert Banner (alert_banner) */
export type AlertBannerRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type AlertModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  textColor?: Maybe<StringFilter>
  tag?: Maybe<StringFilter>
  tagColor?: Maybe<StringFilter>
  text?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<AlertModelFilter>>>
}

export enum AlertModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TextColorAsc = 'textColor_ASC',
  TextColorDesc = 'textColor_DESC',
  TagAsc = 'tag_ASC',
  TagDesc = 'tag_DESC',
  TagColorAsc = 'tagColor_ASC',
  TagColorDesc = 'tagColor_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type Alert (alert) */
export type AlertRecord = {
  __typename?: 'AlertRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  tag?: Maybe<Scalars['String']>
  tagColor?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Alert (alert) */
export type AlertRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type BasicTableModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<BasicTableModelFilter>>>
}

export enum BasicTableModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Basic Table (basic_table) */
export type BasicTableRecord = {
  __typename?: 'BasicTableRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  rows?: Maybe<Array<Maybe<RowRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Basic Table (basic_table) */
export type BasicTableRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Become A Partner CTA Footer (become_a_partner_cta_footer) */
export type BecomeAPartnerCtaFooterRecord = {
  __typename?: 'BecomeAPartnerCtaFooterRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Become A Partner CTA Footer (become_a_partner_cta_footer) */
export type BecomeAPartnerCtaFooterRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type BecomeAPartnerPageModelContentField =
  | MajorHeadlineSectionRecord
  | TextSectionRecord
  | FeatureTableRecord

/** Record of type Become A Partner Page (become_a_partner_page) */
export type BecomeAPartnerPageRecord = {
  __typename?: 'BecomeAPartnerPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<BecomeAPartnerPageModelContentField>>>
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  prefooter?: Maybe<HeroSectionRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Become A Partner Page (become_a_partner_page) */
export type BecomeAPartnerPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Blog Index Page (blog_index_page) */
export type BlogIndexPageRecord = {
  __typename?: 'BlogIndexPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Blog Index Page (blog_index_page) */
export type BlogIndexPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type BlogPostCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<BlogPostCategoryModelFilter>>>
}

export enum BlogPostCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Blog Post Category (blog_post_category) */
export type BlogPostCategoryRecord = {
  __typename?: 'BlogPostCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Blog Post Category (blog_post_category) */
export type BlogPostCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type BlogPostModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  snippet?: Maybe<TextFilter>
  author?: Maybe<LinkFilter>
  dateTime?: Maybe<DateTimeFilter>
  metadata?: Maybe<SeoFilter>
  thumbnail?: Maybe<FileFilter>
  image?: Maybe<FileFilter>
  categories?: Maybe<LinksFilter>
  guestBlog?: Maybe<BooleanFilter>
  body?: Maybe<TextFilter>
  toDoItems?: Maybe<JsonFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  date?: Maybe<DateFilter>
  OR?: Maybe<Array<Maybe<BlogPostModelFilter>>>
}

export enum BlogPostModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DateTimeAsc = 'dateTime_ASC',
  DateTimeDesc = 'dateTime_DESC',
  GuestBlogAsc = 'guestBlog_ASC',
  GuestBlogDesc = 'guestBlog_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC'
}

/** Record of type Blog Post (blog_post) */
export type BlogPostRecord = {
  __typename?: 'BlogPostRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  author?: Maybe<PersonRecord>
  body?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Maybe<BlogPostCategoryRecord>>>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  dateTime?: Maybe<Scalars['DateTime']>
  guestBlog?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  metadata?: Maybe<SeoField>
  slug?: Maybe<Scalars['String']>
  snippet?: Maybe<Scalars['String']>
  thumbnail?: Maybe<FileField>
  title?: Maybe<Scalars['String']>
  toDoItems?: Maybe<Scalars['JsonField']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Blog Post (blog_post) */
export type BlogPostRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Blog Post (blog_post) */
export type BlogPostRecordBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Blog Post (blog_post) */
export type BlogPostRecordSnippetArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Specifies how to filter Boolean fields */
export type BooleanFilter = {
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['BooleanType']>
}

export type Button2ModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  external?: Maybe<BooleanFilter>
  theme?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<Button2ModelFilter>>>
}

export enum Button2ModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC'
}

/** Record of type Button 2 (button_2) */
export type Button2Record = {
  __typename?: 'Button2Record'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  theme?: Maybe<ButtonThemeRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Button 2 (button_2) */
export type Button2Record_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Button (button) */
export type ButtonRecord = {
  __typename?: 'ButtonRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  theme?: Maybe<ButtonThemeRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Button (button) */
export type ButtonRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ButtonThemeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<ButtonThemeModelFilter>>>
}

export enum ButtonThemeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Button Theme (button_theme) */
export type ButtonThemeRecord = {
  __typename?: 'ButtonThemeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Button Theme (button_theme) */
export type ButtonThemeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type CalloutItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  link?: Maybe<LinkFilter>
  image?: Maybe<FileFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<CalloutItemModelFilter>>>
}

export enum CalloutItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Callout Item (callout_item) */
export type CalloutItemRecord = {
  __typename?: 'CalloutItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  link?: Maybe<LinkRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Callout Item (callout_item) */
export type CalloutItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Callout Item (callout_item) */
export type CalloutItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type CalloutSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  calloutImage?: Maybe<FileFilter>
  items?: Maybe<LinksFilter>
  companies?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<CalloutSectionModelFilter>>>
}

export enum CalloutSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Callout Section (callout_section) */
export type CalloutSectionRecord = {
  __typename?: 'CalloutSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  calloutImage?: Maybe<FileField>
  companies?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<CalloutItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Callout Section (callout_section) */
export type CalloutSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Callout Section (callout_section) */
export type CalloutSectionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Callouts Section (callouts_section) */
export type CalloutsSectionRecord = {
  __typename?: 'CalloutsSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<CalloutItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Callouts Section (callouts_section) */
export type CalloutsSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type CodeblockLanguageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<CodeblockLanguageModelFilter>>>
}

export enum CodeblockLanguageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Code Block Language (codeblock_language) */
export type CodeblockLanguageRecord = {
  __typename?: 'CodeblockLanguageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Code Block Language (codeblock_language) */
export type CodeblockLanguageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type CodeSampleModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  codeBlock?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<CodeSampleModelFilter>>>
}

export enum CodeSampleModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Code Sample (code_sample) */
export type CodeSampleRecord = {
  __typename?: 'CodeSampleRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  codeBlock?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Code Sample (code_sample) */
export type CodeSampleRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Code Sample (code_sample) */
export type CodeSampleRecordCodeBlockArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Code Sample (code_sample) */
export type CodeSampleRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type CollectionMetadata = {
  __typename?: 'CollectionMetadata'
  count: Scalars['IntType']
}

export type ColorField = {
  __typename?: 'ColorField'
  alpha?: Maybe<Scalars['IntType']>
  blue?: Maybe<Scalars['IntType']>
  green?: Maybe<Scalars['IntType']>
  hex?: Maybe<Scalars['String']>
  red?: Maybe<Scalars['IntType']>
}

/** Specifies how to filter Color fields */
export type ColorFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

/** Record of type Community Landing Page (community_landing_page) */
export type CommunityLandingPageRecord = {
  __typename?: 'CommunityLandingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  conversationSectionHeader?: Maybe<SbcSectionHeaderRecord>
  createdAt: Scalars['DateTime']
  eventsButton?: Maybe<SbcMultiButtonRecord>
  eventsFeatured?: Maybe<Array<Maybe<HashiconfRecord>>>
  eventsSectionHeader?: Maybe<SbcSectionHeaderRecord>
  findYourUserGroupButtons?: Maybe<SbcMultiButtonRecord>
  findYourUserGroupSectionHeader?: Maybe<SbcSectionHeaderRecord>
  gettingStartedSectionHeader?: Maybe<SbcSectionHeaderRecord>
  gettingStartedTools?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  headerAlert?: Maybe<SbcAlertRecord>
  headerButtonCollection?: Maybe<SbcMultiButtonRecord>
  headerCommunityImageRow?: Maybe<Array<Maybe<FileField>>>
  headerSectionHeader?: Maybe<SbcSectionHeaderRecord>
  hugCountries?: Maybe<Scalars['IntType']>
  hugGroups?: Maybe<Scalars['IntType']>
  hugMembers?: Maybe<Scalars['IntType']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  resourcesButtons?: Maybe<SbcMultiButtonRecord>
  resourcesSectionHeader?: Maybe<SbcSectionHeaderRecord>
  resourcesSlider?: Maybe<SbcResourcesSliderRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Community Landing Page (community_landing_page) */
export type CommunityLandingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type CompanyModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  enableProductIntegrations?: Maybe<BooleanFilter>
  whiteLogo?: Maybe<FileFilter>
  productIntegrations?: Maybe<LinksFilter>
  monochromeLogo?: Maybe<FileFilter>
  description?: Maybe<TextFilter>
  slug?: Maybe<SlugFilter>
  name?: Maybe<StringFilter>
  logo?: Maybe<FileFilter>
  link?: Maybe<StringFilter>
  blogPostCategorys?: Maybe<LinkFilter>
  companyType?: Maybe<StringFilter>
  integrationPage?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<CompanyModelFilter>>>
}

export enum CompanyModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  EnableProductIntegrationsAsc = 'enableProductIntegrations_ASC',
  EnableProductIntegrationsDesc = 'enableProductIntegrations_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  CompanyTypeAsc = 'companyType_ASC',
  CompanyTypeDesc = 'companyType_DESC'
}

/** Record of type Company (company) */
export type CompanyRecord = {
  __typename?: 'CompanyRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  blogPostCategorys?: Maybe<BlogPostCategoryRecord>
  companyType?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  enableProductIntegrations?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  integrationPage?: Maybe<IntegrationDetailPageRecord>
  link?: Maybe<Scalars['String']>
  logo?: Maybe<FileField>
  monochromeLogo?: Maybe<FileField>
  name?: Maybe<Scalars['String']>
  productIntegrations?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  productIntegrationsV2?: Maybe<Array<Maybe<ProductIntegrationRecord>>>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  whiteLogo?: Maybe<FileField>
}

/** Record of type Company (company) */
export type CompanyRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Company (company) */
export type CompanyRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Consul Field Day Live (consul_field_day_live) */
export type ConsulFieldDayLiveRecord = {
  __typename?: 'ConsulFieldDayLiveRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  ctaTagText?: Maybe<Scalars['String']>
  ctaUrl?: Maybe<Scalars['String']>
  headerBody?: Maybe<Scalars['String']>
  headerTitle?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  sidebarBody?: Maybe<Scalars['String']>
  sidebarTitle?: Maybe<Scalars['String']>
  streamIsLive?: Maybe<Scalars['BooleanType']>
  streamUrl?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Consul Field Day Live (consul_field_day_live) */
export type ConsulFieldDayLiveRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Consul Field Day Live (consul_field_day_live) */
export type ConsulFieldDayLiveRecordHeaderBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Consul Field Day Live (consul_field_day_live) */
export type ConsulFieldDayLiveRecordSidebarBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ConsulGraphicSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  desktopImage?: Maybe<FileFilter>
  mobileImage?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<ConsulGraphicSectionModelFilter>>>
}

export enum ConsulGraphicSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Consul Graphic Section (consul_graphic_section) */
export type ConsulGraphicSectionRecord = {
  __typename?: 'ConsulGraphicSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  desktopImage?: Maybe<FileField>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  mobileImage?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Consul Graphic Section (consul_graphic_section) */
export type ConsulGraphicSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Consul Product Page (consul_product_page) */
export type ConsulProductPageRecord = {
  __typename?: 'ConsulProductPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  caseStudiesSection?: Maybe<SectionBlockV2Record>
  companiesSection?: Maybe<SectionBlockV2Record>
  createdAt: Scalars['DateTime']
  enterprisePricingPage?: Maybe<SectionBlockPageRecord>
  featuresSection?: Maybe<SectionBlockV2Record>
  heroSection?: Maybe<HeroSectionRecord>
  howConsulWorksSection?: Maybe<SectionBlockV2Record>
  id: Scalars['ItemId']
  infrastructureSection?: Maybe<SectionBlockV2Record>
  metadata?: Maybe<SeoField>
  principlesSection?: Maybe<SectionBlockV2Record>
  resourcesSection?: Maybe<SectionBlockV2Record>
  subnav?: Maybe<ProductSubnavRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  useCasePages?: Maybe<Array<Maybe<SectionBlockPageRecord>>>
  useCasesSection?: Maybe<SectionBlockV2Record>
}

/** Record of type Consul Product Page (consul_product_page) */
export type ConsulProductPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ContactCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  image?: Maybe<FileFilter>
  formPage?: Maybe<LinkFilter>
  url?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ContactCategoryModelFilter>>>
}

export enum ContactCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type Contact Category (contact_category) */
export type ContactCategoryRecord = {
  __typename?: 'ContactCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  formPage?: Maybe<ContactFormPageRecord>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Contact Category (contact_category) */
export type ContactCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Contact Category (contact_category) */
export type ContactCategoryRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ContactFormPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  slug?: Maybe<SlugFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<ContactFormPageModelFilter>>>
}

export type ContactFormPageModelFormFieldsField =
  | FormTextFieldRecord
  | FormTextAreaFieldRecord
  | FormMultiSelectFieldRecord
  | FormHiddenFieldRecord
  | FormEmailFieldRecord

export enum ContactFormPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Contact Form Page (contact_form_page) */
export type ContactFormPageRecord = {
  __typename?: 'ContactFormPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  formFields?: Maybe<Array<Maybe<ContactFormPageModelFormFieldsField>>>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Contact Form Page (contact_form_page) */
export type ContactFormPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Contact Form Page (contact_form_page) */
export type ContactFormPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Contact Page (contact_page) */
export type ContactPageRecord = {
  __typename?: 'ContactPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  categories?: Maybe<Array<Maybe<ContactCategoryRecord>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Contact Page (contact_page) */
export type ContactPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Contact Page (contact_page) */
export type ContactPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Content Section (content_section) */
export type ContentSectionRecord = {
  __typename?: 'ContentSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  imageGrid?: Maybe<Array<Maybe<FileField>>>
  lead?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Content Section (content_section) */
export type ContentSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Content Section (content_section) */
export type ContentSectionRecordLeadArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Content Section (content_section) */
export type ContentSectionRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Specifies how to filter Date fields */
export type DateFilter = {
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: Maybe<Scalars['Date']>
  /** Filter records with a value that's less than the one specified */
  lt?: Maybe<Scalars['Date']>
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: Maybe<Scalars['Date']>
  /** Filter records with a value that's less or equal than the one specified */
  lte?: Maybe<Scalars['Date']>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['Date']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['Date']>
}

/** Specifies how to filter DateTime fields */
export type DateTimeFilter = {
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: Maybe<Scalars['DateTime']>
  /** Filter records with a value that's less than the one specified */
  lt?: Maybe<Scalars['DateTime']>
  /** Filter records with a value that's greater than or equal to than the one specified */
  gte?: Maybe<Scalars['DateTime']>
  /** Filter records with a value that's less or equal than the one specified */
  lte?: Maybe<Scalars['DateTime']>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['DateTime']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['DateTime']>
}

export type DropdownLinkModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  links?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<DropdownLinkModelFilter>>>
}

export enum DropdownLinkModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Dropdown Link (dropdown_link) */
export type DropdownLinkRecord = {
  __typename?: 'DropdownLinkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  links?: Maybe<Array<Maybe<LinkRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Dropdown Link (dropdown_link) */
export type DropdownLinkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecord = {
  __typename?: 'EcosystemFindAPartnerPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<SectionBlockV2Record>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  integratorsBronze?: Maybe<Array<Maybe<CompanyRecord>>>
  integratorsGold?: Maybe<Array<Maybe<CompanyRecord>>>
  integratorsLabel?: Maybe<Scalars['String']>
  integratorsSilver?: Maybe<Array<Maybe<CompanyRecord>>>
  integratorsTooltip?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  resellersBronze?: Maybe<Array<Maybe<CompanyRecord>>>
  resellersGold?: Maybe<Array<Maybe<CompanyRecord>>>
  resellersLabel?: Maybe<Scalars['String']>
  resellersSilver?: Maybe<Array<Maybe<CompanyRecord>>>
  resellersTooltip?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  trainers?: Maybe<Array<Maybe<CompanyRecord>>>
  trainersLabel?: Maybe<Scalars['String']>
  trainersTooltip?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecordIntegratorsTooltipArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecordResellersTooltipArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Ecosystem - Find a Partner Page (ecosystem_find_a_partner_page) */
export type EcosystemFindAPartnerPageRecordTrainersTooltipArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Ecosystem - Landing Page (ecosystem_landing_page) */
export type EcosystemLandingPageRecord = {
  __typename?: 'EcosystemLandingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<SectionBlockV2Record>>>
  createdAt: Scalars['DateTime']
  ctaButtonsTest?: Maybe<Array<Maybe<SbcButtonRecord>>>
  ctaHeadlineTest?: Maybe<SbcSectionHeaderRecord>
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  infrastructuresInfoTest?: Maybe<SbcTextAndContentRecord>
  metadata?: Maybe<SeoField>
  partnerNetworkInfoTest?: Maybe<SbcTextAndContentRecord>
  technologyIntegrationsInfoTest?: Maybe<SbcTextAndContentRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Ecosystem - Landing Page (ecosystem_landing_page) */
export type EcosystemLandingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EmbeddedPodcastSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  spotifyLink?: Maybe<StringFilter>
  soundcloudId?: Maybe<StringFilter>
  subscribeTitle?: Maybe<StringFilter>
  itunesPodcastLink?: Maybe<StringFilter>
  soundcloudMainUrl?: Maybe<StringFilter>
  googlePlayMusicUrl?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EmbeddedPodcastSectionModelFilter>>>
}

export enum EmbeddedPodcastSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SpotifyLinkAsc = 'spotifyLink_ASC',
  SpotifyLinkDesc = 'spotifyLink_DESC',
  SoundcloudIdAsc = 'soundcloudId_ASC',
  SoundcloudIdDesc = 'soundcloudId_DESC',
  SubscribeTitleAsc = 'subscribeTitle_ASC',
  SubscribeTitleDesc = 'subscribeTitle_DESC',
  ItunesPodcastLinkAsc = 'itunesPodcastLink_ASC',
  ItunesPodcastLinkDesc = 'itunesPodcastLink_DESC',
  SoundcloudMainUrlAsc = 'soundcloudMainUrl_ASC',
  SoundcloudMainUrlDesc = 'soundcloudMainUrl_DESC',
  GooglePlayMusicUrlAsc = 'googlePlayMusicUrl_ASC',
  GooglePlayMusicUrlDesc = 'googlePlayMusicUrl_DESC'
}

/** Record of type Embedded Audio Section (embedded_podcast_section) */
export type EmbeddedPodcastSectionRecord = {
  __typename?: 'EmbeddedPodcastSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  googlePlayMusicUrl?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  itunesPodcastLink?: Maybe<Scalars['String']>
  soundcloudId?: Maybe<Scalars['String']>
  soundcloudMainUrl?: Maybe<Scalars['String']>
  spotifyLink?: Maybe<Scalars['String']>
  subscribeTitle?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Embedded Audio Section (embedded_podcast_section) */
export type EmbeddedPodcastSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EmbeddedSlidesSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  slideshareEmbedLink?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EmbeddedSlidesSectionModelFilter>>>
}

export enum EmbeddedSlidesSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SlideshareEmbedLinkAsc = 'slideshareEmbedLink_ASC',
  SlideshareEmbedLinkDesc = 'slideshareEmbedLink_DESC'
}

/** Record of type Embedded Slides Section (embedded_slides_section) */
export type EmbeddedSlidesSectionRecord = {
  __typename?: 'EmbeddedSlidesSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  slideshareEmbedLink?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Embedded Slides Section (embedded_slides_section) */
export type EmbeddedSlidesSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Employee Nav Link (employee_nav_link) */
export type EmployeeNavLinkRecord = {
  __typename?: 'EmployeeNavLinkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  titleDesktop?: Maybe<Scalars['String']>
  titleMobile?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Employee Nav Link (employee_nav_link) */
export type EmployeeNavLinkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EmployeePageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  hero?: Maybe<LinkFilter>
  miniHeroTitle?: Maybe<StringFilter>
  miniHeroDescription?: Maybe<TextFilter>
  content?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<EmployeePageModelFilter>>>
}

export enum EmployeePageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  MiniHeroTitleAsc = 'miniHeroTitle_ASC',
  MiniHeroTitleDesc = 'miniHeroTitle_DESC'
}

/** Record of type Employee Page (employee_page) */
export type EmployeePageRecord = {
  __typename?: 'EmployeePageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<HashiconfSectionBlockRecord>>>
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  miniHeroDescription?: Maybe<Scalars['String']>
  miniHeroTitle?: Maybe<Scalars['String']>
  nav?: Maybe<Array<Maybe<EmployeeNavLinkRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Employee Page (employee_page) */
export type EmployeePageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Employee Page (employee_page) */
export type EmployeePageRecordMiniHeroDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type EnterpriseFeaturesCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EnterpriseFeaturesCategoryModelFilter>>>
}

export enum EnterpriseFeaturesCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Enterprise Features Category (enterprise_features_category) */
export type EnterpriseFeaturesCategoryRecord = {
  __typename?: 'EnterpriseFeaturesCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  features?: Maybe<Array<Maybe<FeatureRecord>>>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Enterprise Features Category (enterprise_features_category) */
export type EnterpriseFeaturesCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EnterprisePricingSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalName?: Maybe<StringFilter>
  packageOptions?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<EnterprisePricingSectionModelFilter>>>
}

export enum EnterprisePricingSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC'
}

/** Record of type Enterprise Pricing Section (enterprise_pricing_section) */
export type EnterprisePricingSectionRecord = {
  __typename?: 'EnterprisePricingSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalName?: Maybe<Scalars['String']>
  packageOptions?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Enterprise Pricing Section (enterprise_pricing_section) */
export type EnterprisePricingSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EnterpriseProductModelEnterpriseProductPageField =
  | VaultProductPageRecord
  | ConsulProductPageRecord
  | TerraformProductPageRecord
  | NomadProductPageRecord

export type EnterpriseProductModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  githubUrl?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  siteUrl?: Maybe<StringFilter>
  colorLogo?: Maybe<FileFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  logoDark?: Maybe<FileFilter>
  logo?: Maybe<FileFilter>
  subtitle?: Maybe<StringFilter>
  accentColor?: Maybe<ColorFilter>
  enterpriseProductPage?: Maybe<LinkFilter>
  downloadUrl?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EnterpriseProductModelFilter>>>
}

export enum EnterpriseProductModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  GithubUrlAsc = 'githubUrl_ASC',
  GithubUrlDesc = 'githubUrl_DESC',
  SiteUrlAsc = 'siteUrl_ASC',
  SiteUrlDesc = 'siteUrl_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  DownloadUrlAsc = 'downloadUrl_ASC',
  DownloadUrlDesc = 'downloadUrl_DESC'
}

export type EnterpriseProductPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  alertBanner?: Maybe<LinkFilter>
  pageContent?: Maybe<LinksFilter>
  useCasePages?: Maybe<LinksFilter>
  trialForm?: Maybe<LinkFilter>
  faqs?: Maybe<LinksFilter>
  faqsPreFooterCta?: Maybe<LinkFilter>
  metadata?: Maybe<SeoFilter>
  draft?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  product?: Maybe<LinkFilter>
  subnav?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<EnterpriseProductPageModelFilter>>>
}

export enum EnterpriseProductPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type EnterpriseProductPageModelPageContentField =
  | CalloutSectionRecord
  | TextImageSectionRecord
  | VideoSectionRecord
  | HeroSectionRecord
  | ConsulGraphicSectionRecord
  | ProductPackageSectionRecord
  | LargeLogoGridSectionRecord
  | TextHeadlineAndGridSectionRecord
  | HtmlSectionRecord
  | VaultIntegrationSectionRecord
  | TerraformGraphSectionRecord
  | SectionBlockRecord
  | MiniCalloutRecord
  | ImageTextCarouselRecord

/** Record of type Enterprise Product Page (deprecated) (enterprise_product_page) */
export type EnterpriseProductPageRecord = {
  __typename?: 'EnterpriseProductPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  createdAt: Scalars['DateTime']
  draft?: Maybe<Scalars['BooleanType']>
  faqs?: Maybe<Array<Maybe<FaqCategoryRecord>>>
  faqsPreFooterCta?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  name?: Maybe<Scalars['String']>
  pageContent?: Maybe<Array<Maybe<EnterpriseProductPageModelPageContentField>>>
  position?: Maybe<Scalars['IntType']>
  product?: Maybe<EnterpriseProductRecord>
  subnav?: Maybe<EnterpriseProductSubnavRecord>
  trialForm?: Maybe<TrialFormPageRecord>
  updatedAt: Scalars['DateTime']
  useCasePages?: Maybe<Array<Maybe<EnterpriseProductUseCasePageRecord>>>
}

/** Record of type Enterprise Product Page (deprecated) (enterprise_product_page) */
export type EnterpriseProductPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Enterprise Product (enterprise_product) */
export type EnterpriseProductRecord = {
  __typename?: 'EnterpriseProductRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  accentColor?: Maybe<ColorField>
  colorLogo?: Maybe<FileField>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  downloadUrl?: Maybe<Scalars['String']>
  enterpriseProductPage?: Maybe<
    EnterpriseProductModelEnterpriseProductPageField
  >
  githubUrl?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  logo?: Maybe<FileField>
  logoDark?: Maybe<FileField>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  siteUrl?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Enterprise Product (enterprise_product) */
export type EnterpriseProductRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Enterprise Product (enterprise_product) */
export type EnterpriseProductRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type EnterpriseProductSubnavModelEnterpriseLinksField =
  | LinkRecord
  | UseCasePageDropdownRecord

export type EnterpriseProductSubnavModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  enterpriseLinks?: Maybe<LinksFilter>
  productLinks?: Maybe<LinksFilter>
  links?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<EnterpriseProductSubnavModelFilter>>>
}

export type EnterpriseProductSubnavModelLinksField =
  | LinkRecord
  | UseCasePageDropdownRecord

export enum EnterpriseProductSubnavModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

export type EnterpriseProductSubnavModelProductLinksField =
  | LinkRecord
  | UseCasePageDropdownRecord

/** Record of type Enterprise Product Subnav (deprecated) (enterprise_product_subnav) */
export type EnterpriseProductSubnavRecord = {
  __typename?: 'EnterpriseProductSubnavRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  enterpriseLinks?: Maybe<
    Array<Maybe<EnterpriseProductSubnavModelEnterpriseLinksField>>
  >
  id: Scalars['ItemId']
  links?: Maybe<Array<Maybe<EnterpriseProductSubnavModelLinksField>>>
  productLinks?: Maybe<
    Array<Maybe<EnterpriseProductSubnavModelProductLinksField>>
  >
  updatedAt: Scalars['DateTime']
}

/** Record of type Enterprise Product Subnav (deprecated) (enterprise_product_subnav) */
export type EnterpriseProductSubnavRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EnterpriseProductUseCasePageModelContentField =
  | HeroSectionRecord
  | SectionBlockRecord

export type EnterpriseProductUseCasePageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  metadata?: Maybe<SeoFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  content?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<EnterpriseProductUseCasePageModelFilter>>>
}

export enum EnterpriseProductUseCasePageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Enterprise Product Use Case Page (enterprise_product_use_case_page) */
export type EnterpriseProductUseCasePageRecord = {
  __typename?: 'EnterpriseProductUseCasePageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<EnterpriseProductUseCasePageModelContentField>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Enterprise Product Use Case Page (enterprise_product_use_case_page) */
export type EnterpriseProductUseCasePageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Event CTA (event_ctas_item) */
export type EventCtasItemRecord = {
  __typename?: 'EventCtasItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  icon?: Maybe<FileField>
  id: Scalars['ItemId']
  linkLabel?: Maybe<Scalars['String']>
  linkUrl?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Event CTA (event_ctas_item) */
export type EventCtasItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Event CTA (event_ctas_item) */
export type EventCtasItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type EventModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  date?: Maybe<DateFilter>
  title?: Maybe<StringFilter>
  eventType?: Maybe<LinksFilter>
  image?: Maybe<FileFilter>
  location?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EventModelFilter>>>
}

export enum EventModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type Event (event) */
export type EventRecord = {
  __typename?: 'EventRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  eventType?: Maybe<Array<Maybe<EventTypeRecord>>>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  location?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Event (event) */
export type EventRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Events Page (events_page) */
export type EventsPageRecord = {
  __typename?: 'EventsPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  eventCtas?: Maybe<Array<Maybe<EventCtasItemRecord>>>
  events?: Maybe<Array<Maybe<EventRecord>>>
  featuredEvents?: Maybe<Array<Maybe<FeaturedEventRecord>>>
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Events Page (events_page) */
export type EventsPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type EventTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  plural?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<EventTypeModelFilter>>>
}

export enum EventTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  PluralAsc = 'plural_ASC',
  PluralDesc = 'plural_DESC'
}

/** Record of type Event Type (event_type) */
export type EventTypeRecord = {
  __typename?: 'EventTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  plural?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Event Type (event_type) */
export type EventTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Expandable Text with Photo (expandable_text_with_photo) */
export type ExpandableTextWithPhotoRecord = {
  __typename?: 'ExpandableTextWithPhotoRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  readLessLinkText?: Maybe<Scalars['String']>
  readMoreLinkText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Expandable Text with Photo (expandable_text_with_photo) */
export type ExpandableTextWithPhotoRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Expandable Text with Photo (expandable_text_with_photo) */
export type ExpandableTextWithPhotoRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ExperienceLevelModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ExperienceLevelModelFilter>>>
}

export enum ExperienceLevelModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Experience Level (experience_level) */
export type ExperienceLevelRecord = {
  __typename?: 'ExperienceLevelRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Experience Level (experience_level) */
export type ExperienceLevelRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ExternalResourceModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  contentType?: Maybe<LinkFilter>
  industry?: Maybe<LinksFilter>
  link?: Maybe<StringFilter>
  date?: Maybe<DateFilter>
  title?: Maybe<StringFilter>
  draft?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  image?: Maybe<FileFilter>
  mediaType?: Maybe<LinkFilter>
  infrastructureProvider?: Maybe<LinksFilter>
  product?: Maybe<LinksFilter>
  people?: Maybe<LinksFilter>
  organizations?: Maybe<LinksFilter>
  events?: Maybe<LinksFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<ExternalResourceModelFilter>>>
}

export enum ExternalResourceModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC'
}

export type ExternalResourceModelProductField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord

/** Record of type External Resource (external_resource) */
export type ExternalResourceRecord = {
  __typename?: 'ExternalResourceRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  contentType?: Maybe<ResourceContentTypeRecord>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['BooleanType']>
  events?: Maybe<Array<Maybe<EventRecord>>>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  industry?: Maybe<Array<Maybe<ResourceIndustryRecord>>>
  infrastructureProvider?: Maybe<
    Array<Maybe<ResourceInfrastructureProviderRecord>>
  >
  link?: Maybe<Scalars['String']>
  mediaType?: Maybe<ResourceMediaTypeRecord>
  metadata?: Maybe<SeoField>
  organizations?: Maybe<Array<Maybe<CompanyRecord>>>
  people?: Maybe<Array<Maybe<PersonRecord>>>
  product?: Maybe<Array<Maybe<ExternalResourceModelProductField>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type External Resource (external_resource) */
export type ExternalResourceRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type External Resource (external_resource) */
export type ExternalResourceRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type FaqCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<FaqCategoryModelFilter>>>
}

export enum FaqCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type FAQ Category (faq_category) */
export type FaqCategoryRecord = {
  __typename?: 'FaqCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  faqs?: Maybe<Array<Maybe<FaqItemRecord>>>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type FAQ Category (faq_category) */
export type FaqCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type FAQ Item (faq_item) */
export type FaqItemRecord = {
  __typename?: 'FaqItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  answer?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  question?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type FAQ Item (faq_item) */
export type FaqItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type FAQ Item (faq_item) */
export type FaqItemRecordAnswerArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export enum FaviconType {
  Icon = 'icon',
  AppleTouchIcon = 'appleTouchIcon',
  MsApplication = 'msApplication'
}

/** Record of type Featured Event (featured_event) */
export type FeaturedEventRecord = {
  __typename?: 'FeaturedEventRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttonLabel?: Maybe<Scalars['String']>
  buttonUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  eventLogo?: Maybe<FileField>
  id: Scalars['ItemId']
  location?: Maybe<Scalars['String']>
  locationImage?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Featured Event (featured_event) */
export type FeaturedEventRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Featured Event (featured_event) */
export type FeaturedEventRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Feature (feature) */
export type FeatureRecord = {
  __typename?: 'FeatureRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  isAnUpgradeIn?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  offeredIn?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature (feature) */
export type FeatureRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Feature (feature) */
export type FeatureRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type FeatureTableColumnModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<FeatureTableColumnModelFilter>>>
}

export enum FeatureTableColumnModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Feature Table Column (feature_table_column) */
export type FeatureTableColumnRecord = {
  __typename?: 'FeatureTableColumnRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature Table Column (feature_table_column) */
export type FeatureTableColumnRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FeatureTableModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  tabs?: Maybe<LinksFilter>
  applyLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<FeatureTableModelFilter>>>
}

export enum FeatureTableModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Feature Table (feature_table) */
export type FeatureTableRecord = {
  __typename?: 'FeatureTableRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  applyLink?: Maybe<LinkRecord>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  tabs?: Maybe<Array<Maybe<FeatureTableTabRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature Table (feature_table) */
export type FeatureTableRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FeatureTableRowModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  tooltip?: Maybe<TextFilter>
  columnValues?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<FeatureTableRowModelFilter>>>
}

export enum FeatureTableRowModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Feature Table Row (feature_table_row) */
export type FeatureTableRowRecord = {
  __typename?: 'FeatureTableRowRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  columnValues?: Maybe<Array<Maybe<FeatureTableRowValueRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  tooltip?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature Table Row (feature_table_row) */
export type FeatureTableRowRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Feature Table Row (feature_table_row) */
export type FeatureTableRowRecordTooltipArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type FeatureTableRowValueModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  column?: Maybe<LinkFilter>
  description?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<FeatureTableRowValueModelFilter>>>
}

export enum FeatureTableRowValueModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC'
}

/** Record of type Feature Table Row Value (feature_table_row_value) */
export type FeatureTableRowValueRecord = {
  __typename?: 'FeatureTableRowValueRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  column?: Maybe<FeatureTableColumnRecord>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature Table Row Value (feature_table_row_value) */
export type FeatureTableRowValueRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FeatureTableTabModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  columns?: Maybe<LinksFilter>
  rows?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<FeatureTableTabModelFilter>>>
}

export enum FeatureTableTabModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Feature Table Tab (feature_table_tab) */
export type FeatureTableTabRecord = {
  __typename?: 'FeatureTableTabRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  columns?: Maybe<Array<Maybe<FeatureTableColumnRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  rows?: Maybe<Array<Maybe<FeatureTableRowRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Feature Table Tab (feature_table_tab) */
export type FeatureTableTabRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FileField = {
  __typename?: 'FileField'
  alt?: Maybe<Scalars['String']>
  format: Scalars['String']
  height?: Maybe<Scalars['IntType']>
  id: Scalars['UploadId']
  size: Scalars['IntType']
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['IntType']>
}

/** Specifies how to filter Single-file/image fields */
export type FileFilter = {
  /** Search for records with an exact match. The specified value must be an Upload ID */
  eq?: Maybe<Scalars['UploadId']>
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: Maybe<Scalars['UploadId']>
  /** Filter records that have one of the specified uploads */
  in?: Maybe<Array<Maybe<Scalars['UploadId']>>>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

/** Specifies how to filter Floating-point fields */
export type FloatFilter = {
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: Maybe<Scalars['FloatType']>
  /** Filter records with a value that's less than the one specified */
  lt?: Maybe<Scalars['FloatType']>
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: Maybe<Scalars['FloatType']>
  /** Filter records with a value that's less or equal than the one specified */
  lte?: Maybe<Scalars['FloatType']>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['FloatType']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['FloatType']>
}

/** Record of type Form Checkbox Field (form_checkbox_field) */
export type FormCheckboxFieldRecord = {
  __typename?: 'FormCheckboxFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Checkbox Field (form_checkbox_field) */
export type FormCheckboxFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FormContactTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  contactType?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<FormContactTypeModelFilter>>>
}

export enum FormContactTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ContactTypeAsc = 'contactType_ASC',
  ContactTypeDesc = 'contactType_DESC'
}

/** Record of type Form Contact Type (form_contact_type) */
export type FormContactTypeRecord = {
  __typename?: 'FormContactTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  contactType?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Contact Type (form_contact_type) */
export type FormContactTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FormContactTypeRecordMultiLocaleField = {
  __typename?: 'FormContactTypeRecordMultiLocaleField'
  locale?: Maybe<SiteLocale>
  value?: Maybe<FormContactTypeRecord>
}

/** Record of type Form Email Field (form_email_field) */
export type FormEmailFieldRecord = {
  __typename?: 'FormEmailFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  placeholder?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Email Field (form_email_field) */
export type FormEmailFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Form Hidden Field (form_hidden_field) */
export type FormHiddenFieldRecord = {
  __typename?: 'FormHiddenFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  value?: Maybe<Scalars['String']>
}

/** Record of type Form Hidden Field (form_hidden_field) */
export type FormHiddenFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Form Multi Select Field (form_multi_select_field) */
export type FormMultiSelectFieldRecord = {
  __typename?: 'FormMultiSelectFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<FormMultiSelectOptionRecord>>>
  required?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Multi Select Field (form_multi_select_field) */
export type FormMultiSelectFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type FormMultiSelectOptionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  label?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<FormMultiSelectOptionModelFilter>>>
}

export enum FormMultiSelectOptionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Form Multi Select Option (form_multi_select_option) */
export type FormMultiSelectOptionRecord = {
  __typename?: 'FormMultiSelectOptionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Multi Select Option (form_multi_select_option) */
export type FormMultiSelectOptionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Form Text Area Field (form_text_area_field) */
export type FormTextAreaFieldRecord = {
  __typename?: 'FormTextAreaFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  placeholder?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Text Area Field (form_text_area_field) */
export type FormTextAreaFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Form Text Field (form_text_field) */
export type FormTextFieldRecord = {
  __typename?: 'FormTextFieldRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  label?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  placeholder?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Form Text Field (form_text_field) */
export type FormTextFieldRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type 404 Page (fourohfour_page) */
export type FourohfourPageRecord = {
  __typename?: 'FourohfourPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type 404 Page (fourohfour_page) */
export type FourohfourPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Specifies how to filter Multiple files/images field */
export type GalleryFilter = {
  /** Search for records with an exact match. The specified values must be Upload IDs */
  eq?: Maybe<Array<Maybe<Scalars['UploadId']>>>
  /** Filter records that have all of the specified uploads. The specified values must be Upload IDs */
  allIn?: Maybe<Array<Maybe<Scalars['UploadId']>>>
  /** Filter records that have one of the specified uploads. The specified values must be Upload IDs */
  anyIn?: Maybe<Array<Maybe<Scalars['UploadId']>>>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

/** Record of type Global Demo Form (global_demo_form) */
export type GlobalDemoFormRecord = {
  __typename?: 'GlobalDemoFormRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  form?: Maybe<SalesFormRecord>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Global Demo Form (global_demo_form) */
export type GlobalDemoFormRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Global Footer (Basic) (global_footer_basic) */
export type GlobalFooterBasicRecord = {
  __typename?: 'GlobalFooterBasicRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  links?: Maybe<Array<Maybe<LinkRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Global Footer (Basic) (global_footer_basic) */
export type GlobalFooterBasicRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Global Footer (global_footer) */
export type GlobalFooterRecord = {
  __typename?: 'GlobalFooterRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  allProductLinks?: Maybe<Array<Maybe<LinkRecord>>>
  company?: Maybe<Scalars['String']>
  companyLinks?: Maybe<Array<Maybe<LinkRecord>>>
  copyrightText?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  disclaimerLinks?: Maybe<Array<Maybe<LinkRecord>>>
  id: Scalars['ItemId']
  openSourceLinks?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  partnerLinks?: Maybe<Array<Maybe<LinkRecord>>>
  partners?: Maybe<Scalars['String']>
  primaryLogo?: Maybe<FileField>
  productLinks?: Maybe<Array<Maybe<EnterpriseProductRecord>>>
  products?: Maybe<Scalars['String']>
  resources?: Maybe<Scalars['String']>
  resourcesLinks?: Maybe<Array<Maybe<LinkRecord>>>
  socialLinks?: Maybe<Array<Maybe<SocialNetworkRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Global Footer (global_footer) */
export type GlobalFooterRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Global Navigation (global_navigation) */
export type GlobalNavigationRecord = {
  __typename?: 'GlobalNavigationRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companyImageLockup?: Maybe<ImageLockupRecord>
  companyLinks?: Maybe<Array<Maybe<IconLinkRecord>>>
  createdAt: Scalars['DateTime']
  ctaButton?: Maybe<Button2Record>
  enterpriseProducts?: Maybe<Array<Maybe<EnterpriseProductRecord>>>
  id: Scalars['ItemId']
  navigationLinks?: Maybe<Array<Maybe<LinkRecord>>>
  openSourceImageLockup?: Maybe<ImageLockupRecord>
  openSourceTools?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  partnerImageLockup?: Maybe<ImageLockupRecord>
  partnerLinks?: Maybe<Array<Maybe<IconLinkRecord>>>
  primaryLogo?: Maybe<FileField>
  productsImageLockup?: Maybe<ImageLockupRecord>
  resourceLinks?: Maybe<Array<Maybe<IconLinkRecord>>>
  resourcesImageLockup?: Maybe<ImageLockupRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Global Navigation (global_navigation) */
export type GlobalNavigationRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type GlobalSeoField = {
  __typename?: 'GlobalSeoField'
  facebookPageUrl?: Maybe<Scalars['String']>
  fallbackSeo?: Maybe<SeoField>
  siteName?: Maybe<Scalars['String']>
  titleSuffix?: Maybe<Scalars['String']>
  twitterAccount?: Maybe<Scalars['String']>
}

/** Record of type Guest Blog Text (guest_blog_text) */
export type GuestBlogTextRecord = {
  __typename?: 'GuestBlogTextRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Guest Blog Text (guest_blog_text) */
export type GuestBlogTextRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Guest Blog Text (guest_blog_text) */
export type GuestBlogTextRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfBasicPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  systemTitle?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  leadInContent?: Maybe<TextFilter>
  content?: Maybe<TextFilter>
  sidebarContent?: Maybe<TextFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<HashiconfBasicPageModelFilter>>>
}

export enum HashiconfBasicPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SystemTitleAsc = 'systemTitle_ASC',
  SystemTitleDesc = 'systemTitle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC'
}

/** Record of type HashiConf Basic Page (hashiconf_basic_page) */
export type HashiconfBasicPageRecord = {
  __typename?: 'HashiconfBasicPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  leadInContent?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  sidebarContent?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  systemTitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Basic Page (hashiconf_basic_page) */
export type HashiconfBasicPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Basic Page (hashiconf_basic_page) */
export type HashiconfBasicPageRecordContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Basic Page (hashiconf_basic_page) */
export type HashiconfBasicPageRecordLeadInContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Basic Page (hashiconf_basic_page) */
export type HashiconfBasicPageRecordSidebarContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfFeaturedSpeakersSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  speakers?: Maybe<LinksFilter>
  secondaryText?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<HashiconfFeaturedSpeakersSectionModelFilter>>>
}

export enum HashiconfFeaturedSpeakersSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type HashiConf Featured Speakers Section (hashiconf_featured_speakers_section) */
export type HashiconfFeaturedSpeakersSectionRecord = {
  __typename?: 'HashiconfFeaturedSpeakersSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  secondaryText?: Maybe<Scalars['String']>
  speakers?: Maybe<Array<Maybe<HashiconfSpeakerRecord>>>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Featured Speakers Section (hashiconf_featured_speakers_section) */
export type HashiconfFeaturedSpeakersSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Featured Speakers Section (hashiconf_featured_speakers_section) */
export type HashiconfFeaturedSpeakersSectionRecordSecondaryTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Featured Speakers Section (hashiconf_featured_speakers_section) */
export type HashiconfFeaturedSpeakersSectionRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfLandingPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  heroHelpText?: Maybe<StringFilter>
  preFooterNav?: Maybe<LinksFilter>
  metadata?: Maybe<SeoFilter>
  content?: Maybe<LinksFilter>
  aboutImage3?: Maybe<FileFilter>
  aboutImage2?: Maybe<FileFilter>
  aboutImage1?: Maybe<FileFilter>
  aboutImage?: Maybe<FileFilter>
  title?: Maybe<StringFilter>
  subPages?: Maybe<LinksFilter>
  nav?: Maybe<LinksFilter>
  heroDescription?: Maybe<TextFilter>
  aboutHeading?: Maybe<StringFilter>
  aboutContent?: Maybe<TextFilter>
  aboutLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<HashiconfLandingPageModelFilter>>>
}

export enum HashiconfLandingPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeroHelpTextAsc = 'heroHelpText_ASC',
  HeroHelpTextDesc = 'heroHelpText_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  AboutHeadingAsc = 'aboutHeading_ASC',
  AboutHeadingDesc = 'aboutHeading_DESC'
}

export type HashiconfLandingPageModelSubPagesField =
  | HashiconfBasicPageRecord
  | HashiconfSectionBlockPageRecord

/** Record of type HashiConf Landing Page (hashiconf_landing_page) */
export type HashiconfLandingPageRecord = {
  __typename?: 'HashiconfLandingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  aboutContent?: Maybe<Scalars['String']>
  aboutHeading?: Maybe<Scalars['String']>
  aboutImage?: Maybe<FileField>
  aboutImage1?: Maybe<FileField>
  aboutImage2?: Maybe<FileField>
  aboutImage3?: Maybe<FileField>
  aboutLink?: Maybe<LinkRecord>
  content?: Maybe<Array<Maybe<HashiconfSectionBlockRecord>>>
  createdAt: Scalars['DateTime']
  heroDescription?: Maybe<Scalars['String']>
  heroHelpText?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  nav?: Maybe<Array<Maybe<LinkRecord>>>
  preFooterNav?: Maybe<Array<Maybe<LinkRecord>>>
  subPages?: Maybe<Array<Maybe<HashiconfLandingPageModelSubPagesField>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Landing Page (hashiconf_landing_page) */
export type HashiconfLandingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Landing Page (hashiconf_landing_page) */
export type HashiconfLandingPageRecordAboutContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Landing Page (hashiconf_landing_page) */
export type HashiconfLandingPageRecordHeroDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfLiveStreamPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  metadata?: Maybe<SeoFilter>
  headlineContent?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<HashiconfLiveStreamPageModelFilter>>>
}

export enum HashiconfLiveStreamPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC'
}

/** Record of type HashiConf Live Stream Page (hashiconf_live_stream_page) */
export type HashiconfLiveStreamPageRecord = {
  __typename?: 'HashiconfLiveStreamPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headlineContent?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Live Stream Page (hashiconf_live_stream_page) */
export type HashiconfLiveStreamPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Live Stream Page (hashiconf_live_stream_page) */
export type HashiconfLiveStreamPageRecordHeadlineContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  twitterHashtag?: Maybe<StringFilter>
  dates?: Maybe<StringFilter>
  logoWhite?: Maybe<FileFilter>
  logo?: Maybe<FileFilter>
  liveStreamPage?: Maybe<LinkFilter>
  location?: Maybe<StringFilter>
  buyTicketsLink?: Maybe<LinkFilter>
  landing2020Page?: Maybe<LinkFilter>
  trainingDayPage?: Maybe<LinkFilter>
  twitterHandle?: Maybe<StringFilter>
  scheduleItems?: Maybe<LinksFilter>
  title?: Maybe<StringFilter>
  landingPage?: Maybe<LinkFilter>
  speakersPage?: Maybe<LinkFilter>
  schedulePage?: Maybe<LinkFilter>
  employeePage?: Maybe<LinkFilter>
  trainingCalloutText?: Maybe<TextFilter>
  trainingCalloutButtons?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HashiconfModelFilter>>>
}

export enum HashiconfModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TwitterHashtagAsc = 'twitterHashtag_ASC',
  TwitterHashtagDesc = 'twitterHashtag_DESC',
  DatesAsc = 'dates_ASC',
  DatesDesc = 'dates_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  TwitterHandleAsc = 'twitterHandle_ASC',
  TwitterHandleDesc = 'twitterHandle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type HashiconfModelScheduleItemsField =
  | HashiconfTrainingRecord
  | HashiconfSessionRecord

/** Record of type HashiConf (hashiconf) */
export type HashiconfRecord = {
  __typename?: 'HashiconfRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buyTicketsLink?: Maybe<LinkRecord>
  createdAt: Scalars['DateTime']
  dates?: Maybe<Scalars['String']>
  employeePage?: Maybe<EmployeePageRecord>
  id: Scalars['ItemId']
  landing2020Page?: Maybe<HashiconfLandingPageRecord>
  landingPage?: Maybe<HashiconfLandingPageRecord>
  liveStreamPage?: Maybe<HashiconfLiveStreamPageRecord>
  location?: Maybe<Scalars['String']>
  logo?: Maybe<FileField>
  logoWhite?: Maybe<FileField>
  position?: Maybe<Scalars['IntType']>
  scheduleItems?: Maybe<Array<Maybe<HashiconfModelScheduleItemsField>>>
  schedulePage?: Maybe<HashiconfSchedulePageRecord>
  speakersPage?: Maybe<HashiconfSpeakersPageRecord>
  title?: Maybe<Scalars['String']>
  trainingCalloutButtons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  trainingCalloutText?: Maybe<Scalars['String']>
  trainingDayPage?: Maybe<HashiconfTrainingDayRecord>
  twitterHandle?: Maybe<Scalars['String']>
  twitterHashtag?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf (hashiconf) */
export type HashiconfRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf (hashiconf) */
export type HashiconfRecordTrainingCalloutTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfScheduleDayModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  date?: Maybe<DateFilter>
  OR?: Maybe<Array<Maybe<HashiconfScheduleDayModelFilter>>>
}

export enum HashiconfScheduleDayModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC'
}

/** Record of type HashiConf Schedule Day (hashiconf_schedule_day) */
export type HashiconfScheduleDayRecord = {
  __typename?: 'HashiconfScheduleDayRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  schedule?: Maybe<Array<Maybe<HashiconfScheduleEventRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Schedule Day (hashiconf_schedule_day) */
export type HashiconfScheduleDayRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HashiconfScheduleEventModelScheduleItemField =
  | HashiconfTrainingRecord
  | HashiconfSessionRecord

/** Record of type Schedule Event (hashiconf_schedule_event) */
export type HashiconfScheduleEventRecord = {
  __typename?: 'HashiconfScheduleEventRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  room?: Maybe<LocationRoomRecord>
  scheduleItem?: Maybe<HashiconfScheduleEventModelScheduleItemField>
  startTime?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  venue?: Maybe<LocationVenueRecord>
}

/** Record of type Schedule Event (hashiconf_schedule_event) */
export type HashiconfScheduleEventRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Schedule Event (hashiconf_schedule_event) */
export type HashiconfScheduleEventRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfScheduleItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  time?: Maybe<StringFilter>
  location?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  note?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<HashiconfScheduleItemModelFilter>>>
}

export enum HashiconfScheduleItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC'
}

/** Record of type HashiConf Schedule Item (hashiconf_schedule_item) */
export type HashiconfScheduleItemRecord = {
  __typename?: 'HashiconfScheduleItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  location?: Maybe<Scalars['String']>
  note?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Schedule Item (hashiconf_schedule_item) */
export type HashiconfScheduleItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Schedule Item (hashiconf_schedule_item) */
export type HashiconfScheduleItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Schedule Item (hashiconf_schedule_item) */
export type HashiconfScheduleItemRecordNoteArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfScheduleLiteSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalName?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<HashiconfScheduleLiteSectionModelFilter>>>
}

export enum HashiconfScheduleLiteSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC'
}

/** Record of type HashiConf Schedule Lite Section (hashiconf_schedule_lite_section) */
export type HashiconfScheduleLiteSectionRecord = {
  __typename?: 'HashiconfScheduleLiteSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalName?: Maybe<Scalars['String']>
  scheduleLiteItems?: Maybe<Array<Maybe<ScheduleLiteItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Schedule Lite Section (hashiconf_schedule_lite_section) */
export type HashiconfScheduleLiteSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HashiconfSchedulePageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  header?: Maybe<LinkFilter>
  days?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HashiconfSchedulePageModelFilter>>>
}

export enum HashiconfSchedulePageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC'
}

/** Record of type HashiConf Schedule Page (hashiconf_schedule_page) */
export type HashiconfSchedulePageRecord = {
  __typename?: 'HashiconfSchedulePageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  days?: Maybe<Array<Maybe<HashiconfScheduleDayRecord>>>
  header?: Maybe<SbcSectionHeaderRecord>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Schedule Page (hashiconf_schedule_page) */
export type HashiconfSchedulePageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HashiconfSectionBlockModelContentField =
  | FaqCategoryRecord
  | SbcSectionHeaderRecord
  | SbcTextRecord
  | SbcMultiButtonRecord
  | SbcTextAndContentRecord
  | HashiconfTextAndFullImageRecord
  | HashiconfSponsorSectionRecord
  | HashiconfFeaturedSpeakersSectionRecord
  | SbcLinkedTextSummaryListRecord
  | HashiconfScheduleLiteSectionRecord

export type HashiconfSectionBlockModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  theme?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  sid?: Maybe<StringFilter>
  content?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HashiconfSectionBlockModelFilter>>>
}

export enum HashiconfSectionBlockModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SidAsc = 'sid_ASC',
  SidDesc = 'sid_DESC'
}

export type HashiconfSectionBlockPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  content?: Maybe<LinksFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<HashiconfSectionBlockPageModelFilter>>>
}

export enum HashiconfSectionBlockPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC'
}

/** Record of type HashiConf Section Block Page (hashiconf_section_block_page) */
export type HashiconfSectionBlockPageRecord = {
  __typename?: 'HashiconfSectionBlockPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<HashiconfSectionBlockRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Section Block Page (hashiconf_section_block_page) */
export type HashiconfSectionBlockPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Section Block (hashiconf_section_block) */
export type HashiconfSectionBlockRecord = {
  __typename?: 'HashiconfSectionBlockRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<HashiconfSectionBlockModelContentField>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  sid?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Section Block (hashiconf_section_block) */
export type HashiconfSectionBlockRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HashiconfSessionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  speakers?: Maybe<LinksFilter>
  venue?: Maybe<LinkFilter>
  internalTitle?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  location?: Maybe<StringFilter>
  date?: Maybe<DateFilter>
  startTime?: Maybe<StringFilter>
  endTime?: Maybe<StringFilter>
  room?: Maybe<LinkFilter>
  trainer?: Maybe<StringFilter>
  content?: Maybe<TextFilter>
  metadata?: Maybe<SeoFilter>
  products?: Maybe<LinksFilter>
  productTypes?: Maybe<LinksFilter>
  experienceLevels?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HashiconfSessionModelFilter>>>
}

export enum HashiconfSessionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  StartTimeAsc = 'startTime_ASC',
  StartTimeDesc = 'startTime_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC',
  TrainerAsc = 'trainer_ASC',
  TrainerDesc = 'trainer_DESC'
}

/** Record of type HashiConf Session (hashiconf_session) */
export type HashiconfSessionRecord = {
  __typename?: 'HashiconfSessionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  endTime?: Maybe<Scalars['String']>
  experienceLevels?: Maybe<Array<Maybe<ExperienceLevelRecord>>>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  productTypes?: Maybe<Array<Maybe<ProductTypeRecord>>>
  products?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  room?: Maybe<LocationRoomRecord>
  slug?: Maybe<Scalars['String']>
  speakers?: Maybe<Array<Maybe<HashiconfSpeakerRecord>>>
  startTime?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  trainer?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  venue?: Maybe<LocationVenueRecord>
}

/** Record of type HashiConf Session (hashiconf_session) */
export type HashiconfSessionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Session (hashiconf_session) */
export type HashiconfSessionRecordContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfSpeakerModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  nameTest?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  portrait?: Maybe<FileFilter>
  portraitEu?: Maybe<FileFilter>
  organization?: Maybe<StringFilter>
  jobTitle?: Maybe<StringFilter>
  bio?: Maybe<TextFilter>
  github?: Maybe<StringFilter>
  linkedin?: Maybe<StringFilter>
  twitter?: Maybe<StringFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<HashiconfSpeakerModelFilter>>>
}

export enum HashiconfSpeakerModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  NameTestAsc = 'nameTest_ASC',
  NameTestDesc = 'nameTest_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  OrganizationAsc = 'organization_ASC',
  OrganizationDesc = 'organization_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  GithubAsc = 'github_ASC',
  GithubDesc = 'github_DESC',
  LinkedinAsc = 'linkedin_ASC',
  LinkedinDesc = 'linkedin_DESC',
  TwitterAsc = 'twitter_ASC',
  TwitterDesc = 'twitter_DESC'
}

/** Record of type HashiConf Speaker (hashiconf_speaker) */
export type HashiconfSpeakerRecord = {
  __typename?: 'HashiconfSpeakerRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  bio?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  github?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  jobTitle?: Maybe<Scalars['String']>
  linkedin?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  name?: Maybe<Scalars['String']>
  nameTest?: Maybe<Scalars['String']>
  organization?: Maybe<Scalars['String']>
  portrait?: Maybe<FileField>
  portraitEu?: Maybe<FileField>
  slug?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Speaker (hashiconf_speaker) */
export type HashiconfSpeakerRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Speaker (hashiconf_speaker) */
export type HashiconfSpeakerRecordBioArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfSpeakersPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  speakers?: Maybe<LinkFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<HashiconfSpeakersPageModelFilter>>>
}

export enum HashiconfSpeakersPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC'
}

/** Record of type HashiConf Speakers Page (hashiconf_speakers_page) */
export type HashiconfSpeakersPageRecord = {
  __typename?: 'HashiconfSpeakersPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  speakers?: Maybe<HashiconfFeaturedSpeakersSectionRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Speakers Page (hashiconf_speakers_page) */
export type HashiconfSpeakersPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HashiconfSponsorSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  platinumSponsors?: Maybe<LinksFilter>
  sponsors?: Maybe<LinksFilter>
  secondaryText?: Maybe<TextFilter>
  buttons?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HashiconfSponsorSectionModelFilter>>>
}

export enum HashiconfSponsorSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type HashiConf Sponsor Section (hashiconf_sponsor_section) */
export type HashiconfSponsorSectionRecord = {
  __typename?: 'HashiconfSponsorSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  platinumSponsors?: Maybe<Array<Maybe<CompanyRecord>>>
  secondaryText?: Maybe<Scalars['String']>
  sponsors?: Maybe<Array<Maybe<CompanyRecord>>>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Sponsor Section (hashiconf_sponsor_section) */
export type HashiconfSponsorSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Sponsor Section (hashiconf_sponsor_section) */
export type HashiconfSponsorSectionRecordSecondaryTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type HashiConf Sponsor Section (hashiconf_sponsor_section) */
export type HashiconfSponsorSectionRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfTextAndFullImageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  reverseDirection?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  buttons?: Maybe<LinksFilter>
  image?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<HashiconfTextAndFullImageModelFilter>>>
}

export enum HashiconfTextAndFullImageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ReverseDirectionAsc = 'reverseDirection_ASC',
  ReverseDirectionDesc = 'reverseDirection_DESC'
}

/** Record of type HashiConf Text and Full Image Section (hashiconf_text_and_full_image) */
export type HashiconfTextAndFullImageRecord = {
  __typename?: 'HashiconfTextAndFullImageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  reverseDirection?: Maybe<Scalars['BooleanType']>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Text and Full Image Section (hashiconf_text_and_full_image) */
export type HashiconfTextAndFullImageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Text and Full Image Section (hashiconf_text_and_full_image) */
export type HashiconfTextAndFullImageRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfTrainingDayModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  headline?: Maybe<TextFilter>
  heroImage?: Maybe<FileFilter>
  slug?: Maybe<SlugFilter>
  trainings?: Maybe<LinksFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<HashiconfTrainingDayModelFilter>>>
}

export enum HashiconfTrainingDayModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type HashiConf Training Day Page (hashiconf_training_day) */
export type HashiconfTrainingDayRecord = {
  __typename?: 'HashiconfTrainingDayRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  heroImage?: Maybe<FileField>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  trainings?: Maybe<Array<Maybe<HashiconfTrainingRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiConf Training Day Page (hashiconf_training_day) */
export type HashiconfTrainingDayRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Training Day Page (hashiconf_training_day) */
export type HashiconfTrainingDayRecordHeadlineArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashiconfTrainingModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  date?: Maybe<DateFilter>
  metadata?: Maybe<SeoFilter>
  venue?: Maybe<LinkFilter>
  room?: Maybe<LinkFilter>
  speakers?: Maybe<LinksFilter>
  products?: Maybe<LinksFilter>
  productTypes?: Maybe<LinksFilter>
  experienceLevels?: Maybe<LinksFilter>
  productLogo?: Maybe<FileFilter>
  startTime?: Maybe<StringFilter>
  location?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  internalTitle?: Maybe<StringFilter>
  content?: Maybe<TextFilter>
  shortDescription?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  trainer?: Maybe<StringFilter>
  endTime?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<HashiconfTrainingModelFilter>>>
}

export enum HashiconfTrainingModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  StartTimeAsc = 'startTime_ASC',
  StartTimeDesc = 'startTime_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  ShortDescriptionAsc = 'shortDescription_ASC',
  ShortDescriptionDesc = 'shortDescription_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TrainerAsc = 'trainer_ASC',
  TrainerDesc = 'trainer_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC'
}

/** Record of type HashiConf Training (hashiconf_training) */
export type HashiconfTrainingRecord = {
  __typename?: 'HashiconfTrainingRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  endTime?: Maybe<Scalars['String']>
  experienceLevels?: Maybe<Array<Maybe<ExperienceLevelRecord>>>
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  productLogo?: Maybe<FileField>
  productTypes?: Maybe<Array<Maybe<ProductTypeRecord>>>
  products?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  room?: Maybe<LocationRoomRecord>
  shortDescription?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  speakers?: Maybe<Array<Maybe<HashiconfSpeakerRecord>>>
  startTime?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  trainer?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  venue?: Maybe<LocationVenueRecord>
}

/** Record of type HashiConf Training (hashiconf_training) */
export type HashiconfTrainingRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HashiConf Training (hashiconf_training) */
export type HashiconfTrainingRecordContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HashicorpProductModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  product?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<HashicorpProductModelFilter>>>
}

export enum HashicorpProductModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ProductAsc = 'product_ASC',
  ProductDesc = 'product_DESC'
}

/** Record of type HashiCorp Product (hashicorp_product) */
export type HashicorpProductRecord = {
  __typename?: 'HashicorpProductRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  product?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type HashiCorp Product (hashicorp_product) */
export type HashicorpProductRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HeroFormLeadModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  destinationUrl?: Maybe<StringFilter>
  buttonText?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<HeroFormLeadModelFilter>>>
}

export enum HeroFormLeadModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DestinationUrlAsc = 'destinationUrl_ASC',
  DestinationUrlDesc = 'destinationUrl_DESC',
  ButtonTextAsc = 'buttonText_ASC',
  ButtonTextDesc = 'buttonText_DESC'
}

/** Record of type Hero Form Lead (hero_form_lead) */
export type HeroFormLeadRecord = {
  __typename?: 'HeroFormLeadRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttonText?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  destinationUrl?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Hero Form Lead (hero_form_lead) */
export type HeroFormLeadRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Hero (hero) */
export type HeroRecord = {
  __typename?: 'HeroRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  backgroundImage?: Maybe<FileField>
  buttons?: Maybe<Array<Maybe<LinkRecord>>>
  centered?: Maybe<Scalars['BooleanType']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  helpText?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Hero (hero) */
export type HeroRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Hero (hero) */
export type HeroRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Hero (hero) */
export type HeroRecordHelpTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HeroSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  centered?: Maybe<BooleanFilter>
  backgroundImage?: Maybe<FileFilter>
  description?: Maybe<TextFilter>
  helpText?: Maybe<TextFilter>
  conditionalTesting?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  theme?: Maybe<StringFilter>
  backgroundTheme?: Maybe<StringFilter>
  alert?: Maybe<LinkFilter>
  smallTextTag?: Maybe<StringFilter>
  titleLogo?: Maybe<FileFilter>
  buttons?: Maybe<LinksFilter>
  formLeadInput?: Maybe<LinkFilter>
  image?: Maybe<FileFilter>
  videos?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HeroSectionModelFilter>>>
}

export enum HeroSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  CenteredAsc = 'centered_ASC',
  CenteredDesc = 'centered_DESC',
  ConditionalTestingAsc = 'conditionalTesting_ASC',
  ConditionalTestingDesc = 'conditionalTesting_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  BackgroundThemeAsc = 'backgroundTheme_ASC',
  BackgroundThemeDesc = 'backgroundTheme_DESC',
  SmallTextTagAsc = 'smallTextTag_ASC',
  SmallTextTagDesc = 'smallTextTag_DESC'
}

/** Record of type Hero Section (hero_section) */
export type HeroSectionRecord = {
  __typename?: 'HeroSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alert?: Maybe<AlertRecord>
  backgroundImage?: Maybe<FileField>
  backgroundTheme?: Maybe<Scalars['String']>
  buttons?: Maybe<Array<Maybe<LinkRecord>>>
  centered?: Maybe<Scalars['BooleanType']>
  conditionalTesting?: Maybe<Scalars['BooleanType']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  formLeadInput?: Maybe<HeroFormLeadRecord>
  helpText?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  smallTextTag?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  titleLogo?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
  videos?: Maybe<Array<Maybe<HeroVideoCarouselItemRecord>>>
}

/** Record of type Hero Section (hero_section) */
export type HeroSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Hero Section (hero_section) */
export type HeroSectionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Hero Section (hero_section) */
export type HeroSectionRecordHelpTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type HeroVideoCarouselItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  playbackRate?: Maybe<FloatFilter>
  src?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HeroVideoCarouselItemModelFilter>>>
}

export enum HeroVideoCarouselItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PlaybackRateAsc = 'playbackRate_ASC',
  PlaybackRateDesc = 'playbackRate_DESC'
}

/** Record of type Hero Video Carousel Item (hero_video_carousel_item) */
export type HeroVideoCarouselItemRecord = {
  __typename?: 'HeroVideoCarouselItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  playbackRate?: Maybe<Scalars['FloatType']>
  src?: Maybe<Array<Maybe<VideoSourceRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Hero Video Carousel Item (hero_video_carousel_item) */
export type HeroVideoCarouselItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HomepageProductTabModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  product?: Maybe<LinkFilter>
  badge?: Maybe<FileFilter>
  description?: Maybe<TextFilter>
  buttonText?: Maybe<StringFilter>
  features?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<HomepageProductTabModelFilter>>>
}

export enum HomepageProductTabModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  ButtonTextAsc = 'buttonText_ASC',
  ButtonTextDesc = 'buttonText_DESC'
}

/** Record of type Homepage Product Tab (homepage_product_tab) */
export type HomepageProductTabRecord = {
  __typename?: 'HomepageProductTabRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  badge?: Maybe<FileField>
  buttonText?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  features?: Maybe<Array<Maybe<PackageFeatureRecord>>>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  product?: Maybe<EnterpriseProductRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Homepage Product Tab (homepage_product_tab) */
export type HomepageProductTabRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Homepage Product Tab (homepage_product_tab) */
export type HomepageProductTabRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Home Page (home_page) */
export type HomePageRecord = {
  __typename?: 'HomePageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  blueprintHeader?: Maybe<TextHeadlineSectionRecord>
  challengesCallouts?: Maybe<CalloutSectionRecord>
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  newsItems?: Maybe<Array<Maybe<NewsItemRecord>>>
  prefooter?: Maybe<HeroSectionRecord>
  productSuite?: Maybe<Array<Maybe<EnterpriseProductRecord>>>
  productSuiteHeader?: Maybe<TextHeadlineSectionRecord>
  productTabs?: Maybe<Array<Maybe<HomepageProductTabRecord>>>
  salesForm?: Maybe<SalesFormRecord>
  technologyPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  technologyPartnersCopy?: Maybe<TextHeadlineSectionRecord>
  testimonials?: Maybe<Array<Maybe<TestimonialRecord>>>
  testimonialsHeader?: Maybe<TextHeadlineSectionRecord>
  trustedByCompanies?: Maybe<Array<Maybe<CompanyRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Home Page (home_page) */
export type HomePageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type HtmlSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  html?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<HtmlSectionModelFilter>>>
}

export enum HtmlSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type HTML Section (html_section) */
export type HtmlSectionRecord = {
  __typename?: 'HtmlSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  html?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type HTML Section (html_section) */
export type HtmlSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type HTML Section (html_section) */
export type HtmlSectionRecordHtmlArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type IconLinkModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  external?: Maybe<BooleanFilter>
  url?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  icon?: Maybe<FileFilter>
  lightIcon?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<IconLinkModelFilter>>>
}

export enum IconLinkModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Icon Link (icon_link) */
export type IconLinkRecord = {
  __typename?: 'IconLinkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  icon?: Maybe<FileField>
  id: Scalars['ItemId']
  lightIcon?: Maybe<FileField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Icon Link (icon_link) */
export type IconLinkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Specifies how to filter by ID */
export type IdFilter = {
  /** Search the record with the specified ID */
  eq?: Maybe<Scalars['ItemId']>
  /** Exclude the record with the specified ID */
  neq?: Maybe<Scalars['ItemId']>
  /** Search records with the specified IDs */
  in?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Search records that do not have the specified IDs */
  notIn?: Maybe<Array<Maybe<Scalars['ItemId']>>>
}

export type ImageLockupModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  body?: Maybe<TextFilter>
  title?: Maybe<StringFilter>
  image?: Maybe<FileFilter>
  cta?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<ImageLockupModelFilter>>>
}

export enum ImageLockupModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Image Lockup (image_lockup) */
export type ImageLockupRecord = {
  __typename?: 'ImageLockupRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  body?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  cta?: Maybe<LinkRecord>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Image Lockup (image_lockup) */
export type ImageLockupRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Image Lockup (image_lockup) */
export type ImageLockupRecordBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Image (image) */
export type ImageRecord = {
  __typename?: 'ImageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  mobileImage?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Image (image) */
export type ImageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ImageSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  alignment?: Maybe<StringFilter>
  image?: Maybe<FileFilter>
  fullPageWidth?: Maybe<BooleanFilter>
  caption?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<ImageSectionModelFilter>>>
}

export enum ImageSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  AlignmentAsc = 'alignment_ASC',
  AlignmentDesc = 'alignment_DESC',
  FullPageWidthAsc = 'fullPageWidth_ASC',
  FullPageWidthDesc = 'fullPageWidth_DESC'
}

/** Record of type Image Section (image_section) */
export type ImageSectionRecord = {
  __typename?: 'ImageSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alignment?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  fullPageWidth?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Image Section (image_section) */
export type ImageSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Image Section (image_section) */
export type ImageSectionRecordCaptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Image with Text Carousel Item (image_text_carousel_item) */
export type ImageTextCarouselItemRecord = {
  __typename?: 'ImageTextCarouselItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  linkLabel?: Maybe<Scalars['String']>
  linkUrl?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Image with Text Carousel Item (image_text_carousel_item) */
export type ImageTextCarouselItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Image with Text Carousel Item (image_text_carousel_item) */
export type ImageTextCarouselItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ImageTextCarouselModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<ImageTextCarouselModelFilter>>>
}

export enum ImageTextCarouselModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Image with Text Carousel (image_text_carousel) */
export type ImageTextCarouselRecord = {
  __typename?: 'ImageTextCarouselRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<ImageTextCarouselItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Image with Text Carousel (image_text_carousel) */
export type ImageTextCarouselRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type IntegrationDetailPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  metadata?: Maybe<SeoFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  introText?: Maybe<TextFilter>
  resourcesOverride?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<IntegrationDetailPageModelFilter>>>
}

export enum IntegrationDetailPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Integration Details Page (integration_detail_page) */
export type IntegrationDetailPageRecord = {
  __typename?: 'IntegrationDetailPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  integrations?: Maybe<Array<Maybe<IntegrationDetailRecord>>>
  introText?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  resourcesOverride?: Maybe<Array<Maybe<ResourceRecord>>>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integration Details Page (integration_detail_page) */
export type IntegrationDetailPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Integration Details Page (integration_detail_page) */
export type IntegrationDetailPageRecordIntroTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Integration Detail (integration_detail) */
export type IntegrationDetailRecord = {
  __typename?: 'IntegrationDetailRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  documentationLink?: Maybe<Scalars['String']>
  getStartedLink?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  product?: Maybe<OpenSourceToolRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integration Detail (integration_detail) */
export type IntegrationDetailRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Integration Detail (integration_detail) */
export type IntegrationDetailRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type IntegrationPageFooterModelDefaultResourcesField =
  | ResourceRecord
  | ExternalResourceRecord

/** Record of type Integration Page Settings (integration_page_footer) */
export type IntegrationPageFooterRecord = {
  __typename?: 'IntegrationPageFooterRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  defaultResources?: Maybe<
    Array<Maybe<IntegrationPageFooterModelDefaultResourcesField>>
  >
  footer?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  indexLink?: Maybe<LinkRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integration Page Settings (integration_page_footer) */
export type IntegrationPageFooterRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Integrations Page (integrations_page) */
export type IntegrationsPageRecord = {
  __typename?: 'IntegrationsPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  becomeAPartnerCtaFooter?: Maybe<BecomeAPartnerCtaFooterRecord>
  content?: Maybe<Array<Maybe<SectionBlockV2Record>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  technologyPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integrations Page (integrations_page) */
export type IntegrationsPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Integrations Page (integrations_page) */
export type IntegrationsPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type IntegrationTypeCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  product?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<IntegrationTypeCategoryModelFilter>>>
}

export enum IntegrationTypeCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Integration Type Category (integration_type_category) */
export type IntegrationTypeCategoryRecord = {
  __typename?: 'IntegrationTypeCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  product?: Maybe<OpenSourceToolRecord>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integration Type Category (integration_type_category) */
export type IntegrationTypeCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type IntegrationTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  category?: Maybe<LinkFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<IntegrationTypeModelFilter>>>
}

export enum IntegrationTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Integration Type (integration_type) */
export type IntegrationTypeRecord = {
  __typename?: 'IntegrationTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  category?: Maybe<IntegrationTypeCategoryRecord>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Integration Type (integration_type) */
export type IntegrationTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Item (item) */
export type ItemRecord = {
  __typename?: 'ItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  link?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Item (item) */
export type ItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Item (item) */
export type ItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export enum ItemStatus {
  Draft = 'draft',
  Updated = 'updated',
  Published = 'published'
}

export type JobsPageModelContentField =
  | CalloutSectionRecord
  | TextImageSectionRecord
  | ImageSectionRecord
  | HeroSectionRecord

/** Record of type Jobs Page (jobs_page) */
export type JobsPageRecord = {
  __typename?: 'JobsPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<JobsPageModelContentField>>>
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Jobs Page (jobs_page) */
export type JobsPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Specifies how to filter JSON fields */
export type JsonFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

export type LargeLogoGridSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  companies?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<LargeLogoGridSectionModelFilter>>>
}

export enum LargeLogoGridSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Large Logo Grid Section (large_logo_grid_section) */
export type LargeLogoGridSectionRecord = {
  __typename?: 'LargeLogoGridSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companies?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Large Logo Grid Section (large_logo_grid_section) */
export type LargeLogoGridSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Large Logo Grid Section (large_logo_grid_section) */
export type LargeLogoGridSectionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Learn Landing Page (learn_landing_page) */
export type LearnLandingPageRecord = {
  __typename?: 'LearnLandingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  body?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  heading?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<VerticalTextBlockListItemRecord>>>
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Learn Landing Page (learn_landing_page) */
export type LearnLandingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Learn Landing Page (learn_landing_page) */
export type LearnLandingPageRecordBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Specifies how to filter Single-link fields */
export type LinkFilter = {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: Maybe<Scalars['ItemId']>
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: Maybe<Scalars['ItemId']>
  /** Filter records linked to one of the specified records */
  in?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Filter records linked to one of the specified records */
  notIn?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

export type LinkModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  external?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<LinkModelFilter>>>
}

export enum LinkModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC'
}

/** Record of type Link (link) */
export type LinkRecord = {
  __typename?: 'LinkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  position?: Maybe<Scalars['IntType']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Link (link) */
export type LinkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Specifies how to filter Multiple-links fields */
export type LinksFilter = {
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: Maybe<Array<Maybe<Scalars['ItemId']>>>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

export type ListItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  content?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ListItemModelFilter>>>
}

export enum ListItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC'
}

/** Record of type List Item (list_item) */
export type ListItemRecord = {
  __typename?: 'ListItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type List Item (list_item) */
export type ListItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type LocalPageMetadataSetModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  metatags?: Maybe<SeoFilter>
  pageTitle?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<LocalPageMetadataSetModelFilter>>>
}

export enum LocalPageMetadataSetModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  PageTitleAsc = 'pageTitle_ASC',
  PageTitleDesc = 'pageTitle_DESC'
}

/** Record of type Local Page Metadata Set (local_page_metadata_set) */
export type LocalPageMetadataSetRecord = {
  __typename?: 'LocalPageMetadataSetRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metatags?: Maybe<SeoField>
  pageTitle?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Local Page Metadata Set (local_page_metadata_set) */
export type LocalPageMetadataSetRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type LocationRoomModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<LocationRoomModelFilter>>>
}

export enum LocationRoomModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Location Room (location_room) */
export type LocationRoomRecord = {
  __typename?: 'LocationRoomRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Location Room (location_room) */
export type LocationRoomRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type LocationVenueModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<LocationVenueModelFilter>>>
}

export enum LocationVenueModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Location Venue (location_venue) */
export type LocationVenueRecord = {
  __typename?: 'LocationVenueRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Location Venue (location_venue) */
export type LocationVenueRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Logo Grid (logo_grid) */
export type LogoGridRecord = {
  __typename?: 'LogoGridRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companies?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  size?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Logo Grid (logo_grid) */
export type LogoGridRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type MajorHeadlineSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<MajorHeadlineSectionModelFilter>>>
}

export enum MajorHeadlineSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Major Headline Section (major_headline_section) */
export type MajorHeadlineSectionRecord = {
  __typename?: 'MajorHeadlineSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Major Headline Section (major_headline_section) */
export type MajorHeadlineSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Mega Nav (mega_nav) */
export type MegaNavRecord = {
  __typename?: 'MegaNavRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  callout?: Maybe<NavCalloutRecord>
  companyLinks?: Maybe<Array<Maybe<LinkRecord>>>
  createdAt: Scalars['DateTime']
  docsLinks?: Maybe<Array<Maybe<LinkRecord>>>
  footerLinks?: Maybe<Array<Maybe<LinkRecord>>>
  id: Scalars['ItemId']
  partnersLinks?: Maybe<Array<Maybe<LinkRecord>>>
  primaryLogo?: Maybe<FileField>
  primaryLogoWhite?: Maybe<FileField>
  productsLinks?: Maybe<Array<Maybe<EnterpriseProductRecord>>>
  resourcesLinks?: Maybe<Array<Maybe<LinkRecord>>>
  socialLinks?: Maybe<Array<Maybe<SocialNetworkRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Mega Nav (mega_nav) */
export type MegaNavRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type MiniCalloutModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  item?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<MiniCalloutModelFilter>>>
}

export enum MiniCalloutModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Mini Callouts (mini_callout) */
export type MiniCalloutRecord = {
  __typename?: 'MiniCalloutRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  item?: Maybe<Array<Maybe<CalloutItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Mini Callouts (mini_callout) */
export type MiniCalloutRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Multi Button (multi_button) */
export type MultiButtonRecord = {
  __typename?: 'MultiButtonRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttons?: Maybe<Array<Maybe<Button2Record>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Multi Button (multi_button) */
export type MultiButtonRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type NavCalloutModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  body?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  button?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<NavCalloutModelFilter>>>
}

export enum NavCalloutModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Nav Callout (nav_callout) */
export type NavCalloutRecord = {
  __typename?: 'NavCalloutRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  body?: Maybe<Scalars['String']>
  button?: Maybe<LinkRecord>
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Nav Callout (nav_callout) */
export type NavCalloutRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Nav Callout (nav_callout) */
export type NavCalloutRecordBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type NavPromoModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  theme?: Maybe<StringFilter>
  layout?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  image?: Maybe<FileFilter>
  eyebrow?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  showCalloutPlayIcon?: Maybe<BooleanFilter>
  secondaryLink?: Maybe<LinkFilter>
  primaryLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<NavPromoModelFilter>>>
}

export enum NavPromoModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  LayoutAsc = 'layout_ASC',
  LayoutDesc = 'layout_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  EyebrowAsc = 'eyebrow_ASC',
  EyebrowDesc = 'eyebrow_DESC',
  ShowCalloutPlayIconAsc = 'showCalloutPlayIcon_ASC',
  ShowCalloutPlayIconDesc = 'showCalloutPlayIcon_DESC'
}

/** Record of type Nav Promo (nav_promo) */
export type NavPromoRecord = {
  __typename?: 'NavPromoRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  eyebrow?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  layout?: Maybe<Scalars['String']>
  primaryLink?: Maybe<LinkRecord>
  secondaryLink?: Maybe<LinkRecord>
  showCalloutPlayIcon?: Maybe<Scalars['BooleanType']>
  theme?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Nav Promo (nav_promo) */
export type NavPromoRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Nav Promo (nav_promo) */
export type NavPromoRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Nav (nav) */
export type NavRecord = {
  __typename?: 'NavRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companyPromos?: Maybe<Array<Maybe<NavPromoRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  learnPromos?: Maybe<Array<Maybe<NavPromoRecord>>>
  partnersPromos?: Maybe<Array<Maybe<NavPromoRecord>>>
  productsPromos?: Maybe<Array<Maybe<NavPromoRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Nav (nav) */
export type NavRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type NewsItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  eyebrow?: Maybe<StringFilter>
  external?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  callout?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<NewsItemModelFilter>>>
}

export enum NewsItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  EyebrowAsc = 'eyebrow_ASC',
  EyebrowDesc = 'eyebrow_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CalloutAsc = 'callout_ASC',
  CalloutDesc = 'callout_DESC'
}

/** Record of type News Item (news_item) */
export type NewsItemRecord = {
  __typename?: 'NewsItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  callout?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  eyebrow?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type News Item (news_item) */
export type NewsItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Nomad Product Page (nomad_product_page) */
export type NomadProductPageRecord = {
  __typename?: 'NomadProductPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  caseStudiesSection?: Maybe<SectionBlockV2Record>
  companiesUsingNomad?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  ctaSection?: Maybe<SectionBlockV2Record>
  ctaSectionHeader?: Maybe<SbcSectionHeaderRecord>
  enterprisePricingPage?: Maybe<SectionBlockPageRecord>
  enterpriseTrialForm?: Maybe<TrialFormPageRecord>
  heroSection?: Maybe<HeroSectionRecord>
  howNomadWorksSection?: Maybe<SectionBlockV2Record>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  nomadPrinciples?: Maybe<SectionBlockV2Record>
  principlesHeadline?: Maybe<Scalars['String']>
  resourcesSectionHeader?: Maybe<SbcSectionHeaderRecord>
  staticDynamicDiagram?: Maybe<SbcBeforeAfterDiagramRecord>
  staticDynamicHeader?: Maybe<Scalars['String']>
  subnav?: Maybe<ProductSubnavRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  useCaseCallouts?: Maybe<CalloutSectionRecord>
  useCasePages?: Maybe<Array<Maybe<SectionBlockPageRecord>>>
}

/** Record of type Nomad Product Page (nomad_product_page) */
export type NomadProductPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type OfficeHoursSessionCopy1ModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  startTime?: Maybe<DateTimeFilter>
  endTime?: Maybe<DateTimeFilter>
  title?: Maybe<StringFilter>
  meetingLink?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<OfficeHoursSessionCopy1ModelFilter>>>
}

export enum OfficeHoursSessionCopy1ModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  StartTimeAsc = 'startTime_ASC',
  StartTimeDesc = 'startTime_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  MeetingLinkAsc = 'meetingLink_ASC',
  MeetingLinkDesc = 'meetingLink_DESC'
}

/** Record of type Office Hours (copy #1) (office_hours_session_copy_1) */
export type OfficeHoursSessionCopy1Record = {
  __typename?: 'OfficeHoursSessionCopy1Record'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ItemId']
  meetingLink?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Office Hours (copy #1) (office_hours_session_copy_1) */
export type OfficeHoursSessionCopy1Record_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Office Hours (copy #1) (office_hours_session_copy_1) */
export type OfficeHoursSessionCopy1RecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type OfficeHoursSessionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  startTime?: Maybe<DateTimeFilter>
  title?: Maybe<StringFilter>
  meetingLink?: Maybe<StringFilter>
  endTime?: Maybe<DateTimeFilter>
  description?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<OfficeHoursSessionModelFilter>>>
}

export enum OfficeHoursSessionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  StartTimeAsc = 'startTime_ASC',
  StartTimeDesc = 'startTime_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  MeetingLinkAsc = 'meetingLink_ASC',
  MeetingLinkDesc = 'meetingLink_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC'
}

/** Record of type Office Hours (office_hours_session) */
export type OfficeHoursSessionRecord = {
  __typename?: 'OfficeHoursSessionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ItemId']
  meetingLink?: Maybe<Scalars['String']>
  startTime?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Office Hours (office_hours_session) */
export type OfficeHoursSessionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Office Hours (office_hours_session) */
export type OfficeHoursSessionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type OnDemandResourceModelBodyContentField =
  | TextHeadlineSectionRecord
  | TextSectionRecord
  | BasicTableRecord

export type OnDemandResourceModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  primaryProduct?: Maybe<LinkFilter>
  industry?: Maybe<LinksFilter>
  infrastructureProvider?: Maybe<LinksFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  slug?: Maybe<SlugFilter>
  draft?: Maybe<BooleanFilter>
  formTitle?: Maybe<StringFilter>
  buttonCtaText?: Maybe<StringFilter>
  contentLength?: Maybe<StringFilter>
  targetLink?: Maybe<LinkFilter>
  backgroundImage?: Maybe<FileFilter>
  heroContent?: Maybe<LinksFilter>
  bodyContent?: Maybe<LinksFilter>
  product?: Maybe<LinksFilter>
  people?: Maybe<LinksFilter>
  organizations?: Maybe<LinksFilter>
  events?: Maybe<LinksFilter>
  sfdcDescription?: Maybe<StringFilter>
  showDemoRequest?: Maybe<BooleanFilter>
  awsCampaign?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<OnDemandResourceModelFilter>>>
}

export type OnDemandResourceModelHeroContentField =
  | TextHeadlineSectionRecord
  | TextSectionRecord
  | SpeakersSectionRecord

export enum OnDemandResourceModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC',
  FormTitleAsc = 'formTitle_ASC',
  FormTitleDesc = 'formTitle_DESC',
  ButtonCtaTextAsc = 'buttonCtaText_ASC',
  ButtonCtaTextDesc = 'buttonCtaText_DESC',
  ContentLengthAsc = 'contentLength_ASC',
  ContentLengthDesc = 'contentLength_DESC',
  SfdcDescriptionAsc = 'sfdcDescription_ASC',
  SfdcDescriptionDesc = 'sfdcDescription_DESC',
  ShowDemoRequestAsc = 'showDemoRequest_ASC',
  ShowDemoRequestDesc = 'showDemoRequest_DESC',
  AwsCampaignAsc = 'awsCampaign_ASC',
  AwsCampaignDesc = 'awsCampaign_DESC'
}

export type OnDemandResourceModelProductField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord

export type OnDemandResourceModelTargetLinkField =
  | TemplatePageRecord
  | BlogPostRecord
  | ResourceRecord
  | WhitePaperRecord

/** Record of type On Demand Resource (on_demand_resource) */
export type OnDemandResourceRecord = {
  __typename?: 'OnDemandResourceRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  awsCampaign?: Maybe<Scalars['BooleanType']>
  backgroundImage?: Maybe<FileField>
  bodyContent?: Maybe<Array<Maybe<OnDemandResourceModelBodyContentField>>>
  buttonCtaText?: Maybe<Scalars['String']>
  contentLength?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['BooleanType']>
  events?: Maybe<Array<Maybe<EventRecord>>>
  formTitle?: Maybe<Scalars['String']>
  heroContent?: Maybe<Array<Maybe<OnDemandResourceModelHeroContentField>>>
  id: Scalars['ItemId']
  industry?: Maybe<Array<Maybe<ResourceIndustryRecord>>>
  infrastructureProvider?: Maybe<
    Array<Maybe<ResourceInfrastructureProviderRecord>>
  >
  organizations?: Maybe<Array<Maybe<CompanyRecord>>>
  people?: Maybe<Array<Maybe<PersonRecord>>>
  primaryProduct?: Maybe<OpenSourceToolRecord>
  product?: Maybe<Array<Maybe<OnDemandResourceModelProductField>>>
  sfdcDescription?: Maybe<Scalars['String']>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  slug?: Maybe<Scalars['String']>
  targetLink?: Maybe<OnDemandResourceModelTargetLinkField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type On Demand Resource (on_demand_resource) */
export type OnDemandResourceRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type On Demand Resource (on_demand_resource) */
export type OnDemandResourceRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type OpenSourceToolCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<OpenSourceToolCategoryModelFilter>>>
}

export enum OpenSourceToolCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Open Source Tool Category (open_source_tool_category) */
export type OpenSourceToolCategoryRecord = {
  __typename?: 'OpenSourceToolCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Open Source Tool Category (open_source_tool_category) */
export type OpenSourceToolCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type OpenSourceToolModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  website?: Maybe<StringFilter>
  logoColor?: Maybe<FileFilter>
  learnUrl?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  logo?: Maybe<FileFilter>
  logoLight?: Maybe<FileFilter>
  description?: Maybe<TextFilter>
  category?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<OpenSourceToolModelFilter>>>
}

export enum OpenSourceToolModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  WebsiteAsc = 'website_ASC',
  WebsiteDesc = 'website_DESC',
  LearnUrlAsc = 'learnUrl_ASC',
  LearnUrlDesc = 'learnUrl_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Open Source Tool (open_source_tool) */
export type OpenSourceToolRecord = {
  __typename?: 'OpenSourceToolRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  category?: Maybe<OpenSourceToolCategoryRecord>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  learnUrl?: Maybe<Scalars['String']>
  logo?: Maybe<FileField>
  logoColor?: Maybe<FileField>
  logoLight?: Maybe<FileField>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['IntType']>
  updatedAt: Scalars['DateTime']
  website?: Maybe<Scalars['String']>
}

/** Record of type Open Source Tool (open_source_tool) */
export type OpenSourceToolRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Open Source Tool (open_source_tool) */
export type OpenSourceToolRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type PackageFeatureModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  tooltip?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<PackageFeatureModelFilter>>>
}

export enum PackageFeatureModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TooltipAsc = 'tooltip_ASC',
  TooltipDesc = 'tooltip_DESC'
}

/** Record of type Package Feature (package_feature) */
export type PackageFeatureRecord = {
  __typename?: 'PackageFeatureRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  tooltip?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Package Feature (package_feature) */
export type PackageFeatureRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type PackageOptionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  product?: Maybe<LinkFilter>
  heading?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  enterprise?: Maybe<BooleanFilter>
  subheading?: Maybe<StringFilter>
  buttonUrl?: Maybe<StringFilter>
  packageFeatures?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<PackageOptionModelFilter>>>
}

export enum PackageOptionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  EnterpriseAsc = 'enterprise_ASC',
  EnterpriseDesc = 'enterprise_DESC',
  SubheadingAsc = 'subheading_ASC',
  SubheadingDesc = 'subheading_DESC',
  ButtonUrlAsc = 'buttonUrl_ASC',
  ButtonUrlDesc = 'buttonUrl_DESC'
}

/** Record of type Package Option (package_option) */
export type PackageOptionRecord = {
  __typename?: 'PackageOptionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttonUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  enterprise?: Maybe<Scalars['BooleanType']>
  heading?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  packageFeatures?: Maybe<Array<Maybe<PackageFeatureRecord>>>
  product?: Maybe<EnterpriseProductRecord>
  slug?: Maybe<Scalars['String']>
  subheading?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Package Option (package_option) */
export type PackageOptionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Package Section (package_section) */
export type PackageSectionRecord = {
  __typename?: 'PackageSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  packageOptions?: Maybe<Array<Maybe<PackageOptionRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Package Section (package_section) */
export type PackageSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type PartnersPageModelContentField =
  | HeroSectionRecord
  | LargeLogoGridSectionRecord

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecord = {
  __typename?: 'PartnersPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  cloudPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  cloudPartnersDescription?: Maybe<Scalars['String']>
  content?: Maybe<Array<Maybe<PartnersPageModelContentField>>>
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  resellerPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  resellerPartnersDescription?: Maybe<Scalars['String']>
  resellerPartnersOpen?: Maybe<Array<Maybe<CompanyRecord>>>
  resellerPartnersOpenSize?: Maybe<Scalars['String']>
  resellerPartnersOpenTitle?: Maybe<Scalars['String']>
  resellerPartnersPremier?: Maybe<Array<Maybe<CompanyRecord>>>
  resellerPartnersPremierSize?: Maybe<Scalars['String']>
  resellerPartnersPremierTitle?: Maybe<Scalars['String']>
  systemIntegratorPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  systemIntegratorPartnersDescription?: Maybe<Scalars['String']>
  systemIntegratorPartnersMember?: Maybe<Array<Maybe<CompanyRecord>>>
  systemIntegratorPartnersMemberSize?: Maybe<Scalars['String']>
  systemIntegratorPartnersMemberTitle?: Maybe<Scalars['String']>
  systemIntegratorPartnersOpen?: Maybe<Array<Maybe<CompanyRecord>>>
  systemIntegratorPartnersOpenSize?: Maybe<Scalars['String']>
  systemIntegratorPartnersOpenTitle?: Maybe<Scalars['String']>
  systemIntegratorPartnersPremier?: Maybe<Array<Maybe<CompanyRecord>>>
  systemIntegratorPartnersPremierSize?: Maybe<Scalars['String']>
  systemIntegratorPartnersPremierTitle?: Maybe<Scalars['String']>
  technologyPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  technologyPartnersDescription?: Maybe<Scalars['String']>
  trainingPartners?: Maybe<Array<Maybe<CompanyRecord>>>
  trainingPartnersDescription?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecordCloudPartnersDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecordResellerPartnersDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecordSystemIntegratorPartnersDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecordTechnologyPartnersDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Partners Page (deprecated) (partners_page) */
export type PartnersPageRecordTrainingPartnersDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type PersonListModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  people?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<PersonListModelFilter>>>
}

export enum PersonListModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Person List (person_list) */
export type PersonListRecord = {
  __typename?: 'PersonListRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  people?: Maybe<Array<Maybe<PersonRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Person List (person_list) */
export type PersonListRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type PersonModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  jobTitle?: Maybe<StringFilter>
  photo?: Maybe<FileFilter>
  bio?: Maybe<TextFilter>
  socialProfiles?: Maybe<LinksFilter>
  company?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<PersonModelFilter>>>
}

export enum PersonModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC'
}

/** Record of type Person (person) */
export type PersonRecord = {
  __typename?: 'PersonRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  bio?: Maybe<Scalars['String']>
  company?: Maybe<CompanyRecord>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  jobTitle?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  photo?: Maybe<FileField>
  position?: Maybe<Scalars['IntType']>
  socialProfiles?: Maybe<Array<Maybe<SocialNetworkRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Person (person) */
export type PersonRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Person (person) */
export type PersonRecordBioArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Specifies how to filter by position (sorted and tree-like collections) */
export type PositionFilter = {
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: Maybe<Scalars['IntType']>
  /** Filter records with a value that's less than the one specified */
  lt?: Maybe<Scalars['IntType']>
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: Maybe<Scalars['IntType']>
  /** Filter records with a value that's less or equal than the one specified */
  lte?: Maybe<Scalars['IntType']>
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['IntType']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['IntType']>
}

export type PressLinkModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  date?: Maybe<DateFilter>
  detail?: Maybe<StringFilter>
  external?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<PressLinkModelFilter>>>
}

export enum PressLinkModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DetailAsc = 'detail_ASC',
  DetailDesc = 'detail_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC'
}

/** Record of type Press Link (press_link) */
export type PressLinkRecord = {
  __typename?: 'PressLinkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  detail?: Maybe<Scalars['String']>
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Press Link (press_link) */
export type PressLinkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Press Page (press_page) */
export type PressPageRecord = {
  __typename?: 'PressPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  events?: Maybe<Array<Maybe<PressLinkRecord>>>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  mediaAnalystCoverage?: Maybe<Array<Maybe<PressLinkRecord>>>
  metadata?: Maybe<SeoField>
  pressReleases?: Maybe<Array<Maybe<PressLinkRecord>>>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Press Page (press_page) */
export type PressPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type PricingPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  product?: Maybe<LinkFilter>
  packages?: Maybe<LinkFilter>
  productOfferings?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<PricingPageModelFilter>>>
}

export enum PricingPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Pricing Page (pricing_page) */
export type PricingPageRecord = {
  __typename?: 'PricingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  packages?: Maybe<ProductPackageSectionRecord>
  product?: Maybe<HashicorpProductRecord>
  productOfferings?: Maybe<Array<Maybe<ProductOfferingRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Pricing Page (pricing_page) */
export type PricingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Principles Page (principles_page) */
export type PrinciplesPageRecord = {
  __typename?: 'PrinciplesPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<ContentSectionRecord>>>
  createdAt: Scalars['DateTime']
  footerHero?: Maybe<HeroSectionRecord>
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  mainImageGrid?: Maybe<Array<Maybe<FileField>>>
  metadata?: Maybe<SeoField>
  name?: Maybe<Scalars['String']>
  pageContent?: Maybe<Array<Maybe<ExpandableTextWithPhotoRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Principles Page (principles_page) */
export type PrinciplesPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Product Integration (product_integration) */
export type ProductIntegrationRecord = {
  __typename?: 'ProductIntegrationRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  docsLink?: Maybe<Scalars['String']>
  gettingStartedText?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  integrationType?: Maybe<IntegrationTypeRecord>
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Product Integration (product_integration) */
export type ProductIntegrationRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ProductOfferingModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  paymentModel?: Maybe<StringFilter>
  support?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  cost?: Maybe<StringFilter>
  workspaces?: Maybe<StringFilter>
  enterprise?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<ProductOfferingModelFilter>>>
}

export enum ProductOfferingModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  PaymentModelAsc = 'paymentModel_ASC',
  PaymentModelDesc = 'paymentModel_DESC',
  SupportAsc = 'support_ASC',
  SupportDesc = 'support_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC',
  WorkspacesAsc = 'workspaces_ASC',
  WorkspacesDesc = 'workspaces_DESC',
  EnterpriseAsc = 'enterprise_ASC',
  EnterpriseDesc = 'enterprise_DESC'
}

/** Record of type Product Offering (product_offering) */
export type ProductOfferingRecord = {
  __typename?: 'ProductOfferingRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  cost?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  enterprise?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  paymentModel?: Maybe<Scalars['String']>
  support?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  workspaces?: Maybe<Scalars['String']>
}

/** Record of type Product Offering (product_offering) */
export type ProductOfferingRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ProductPackageSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  packageOptions?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<ProductPackageSectionModelFilter>>>
}

export enum ProductPackageSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Product Package Section (product_package_section) */
export type ProductPackageSectionRecord = {
  __typename?: 'ProductPackageSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  packageOptions?: Maybe<Array<Maybe<PackageOptionRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Product Package Section (product_package_section) */
export type ProductPackageSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ProductPricingPlanModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  target?: Maybe<StringFilter>
  link?: Maybe<LinkFilter>
  internalDescriptiveTitle?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  shortDescription?: Maybe<StringFilter>
  isFreeDownload?: Maybe<BooleanFilter>
  url?: Maybe<StringFilter>
  featureLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<ProductPricingPlanModelFilter>>>
}

export enum ProductPricingPlanModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TargetAsc = 'target_ASC',
  TargetDesc = 'target_DESC',
  InternalDescriptiveTitleAsc = 'internalDescriptiveTitle_ASC',
  InternalDescriptiveTitleDesc = 'internalDescriptiveTitle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ShortDescriptionAsc = 'shortDescription_ASC',
  ShortDescriptionDesc = 'shortDescription_DESC',
  IsFreeDownloadAsc = 'isFreeDownload_ASC',
  IsFreeDownloadDesc = 'isFreeDownload_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type · Product Pricing Plan (product_pricing_plan) */
export type ProductPricingPlanRecord = {
  __typename?: 'ProductPricingPlanRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  featureLink?: Maybe<LinkRecord>
  id: Scalars['ItemId']
  internalDescriptiveTitle?: Maybe<Scalars['String']>
  isFreeDownload?: Maybe<Scalars['BooleanType']>
  link?: Maybe<LinkRecord>
  shortDescription?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type · Product Pricing Plan (product_pricing_plan) */
export type ProductPricingPlanRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type · Product Pricing Plan (product_pricing_plan) */
export type ProductPricingPlanRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ProductSubnavModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  product?: Maybe<LinkFilter>
  tdmFocusedLinks?: Maybe<LinksFilter>
  practitionerFocusedLinks?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<ProductSubnavModelFilter>>>
}

export enum ProductSubnavModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type ProductSubnavModelPractitionerFocusedLinksField =
  | LinkRecord
  | DropdownLinkRecord

export type ProductSubnavModelTdmFocusedLinksField =
  | LinkRecord
  | DropdownLinkRecord

/** Record of type Product Subnav (product_subnav) */
export type ProductSubnavRecord = {
  __typename?: 'ProductSubnavRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  practitionerFocusedLinks?: Maybe<
    Array<Maybe<ProductSubnavModelPractitionerFocusedLinksField>>
  >
  product?: Maybe<EnterpriseProductRecord>
  tdmFocusedLinks?: Maybe<Array<Maybe<ProductSubnavModelTdmFocusedLinksField>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Product Subnav (product_subnav) */
export type ProductSubnavRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ProductTabFeatureModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<ProductTabFeatureModelFilter>>>
}

export enum ProductTabFeatureModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Product Tab Feature (product_tab_feature) */
export type ProductTabFeatureRecord = {
  __typename?: 'ProductTabFeatureRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Product Tab Feature (product_tab_feature) */
export type ProductTabFeatureRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Product Tab Feature (product_tab_feature) */
export type ProductTabFeatureRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type ProductTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ProductTypeModelFilter>>>
}

export enum ProductTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Product Type (product_type) */
export type ProductTypeRecord = {
  __typename?: 'ProductTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Product Type (product_type) */
export type ProductTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type Query = {
  __typename?: 'Query'
  /** Returns meta information regarding a record collection */
  _allAlertBannersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allAlertsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allBasicTablesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allBlogPostCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allBlogPostsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allButton2sMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allButtonThemesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allCalloutItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allCalloutSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allCodeSamplesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allCodeblockLanguagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allCompaniesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allConsulGraphicSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allContactCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allContactFormPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allDropdownLinksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEmbeddedPodcastSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEmbeddedSlidesSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEmployeePagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterpriseFeaturesCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterprisePricingSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterpriseProductPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterpriseProductSubnavsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterpriseProductUseCasePagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEnterpriseProductsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEventTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allEventsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allExperienceLevelsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allExternalResourcesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFaqCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFeatureTableColumnsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFeatureTableRowValuesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFeatureTableRowsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFeatureTableTabsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFeatureTablesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFormContactTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allFormMultiSelectOptionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfBasicPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfFeaturedSpeakersSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfLandingPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfLiveStreamPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfScheduleDaysMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfScheduleItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfScheduleLiteSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSchedulePagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSectionBlockPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSectionBlocksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSessionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSpeakersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSpeakersPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfSponsorSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfTextAndFullImagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfTrainingDaysMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfTrainingsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashiconfsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHashicorpProductsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHeroFormLeadsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHeroSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHeroVideoCarouselItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHomepageProductTabsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allHtmlSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allIconLinksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allImageLockupsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allImageSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allImageTextCarouselsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allIntegrationDetailPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allIntegrationTypeCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allIntegrationTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allLargeLogoGridSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allLinksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allListItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allLocalPageMetadataSetsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allLocationRoomsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allLocationVenuesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allMajorHeadlineSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allMiniCalloutsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allNavCalloutsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allNavPromosMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allNewsItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allOfficeHoursSessionCopy1sMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allOfficeHoursSessionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allOnDemandResourcesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allOpenSourceToolCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allOpenSourceToolsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPackageFeaturesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPackageOptionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPeopleMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPersonListsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPressLinksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allPricingPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductOfferingsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductPackageSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductPricingPlansMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductSubnavsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductTabFeaturesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allProductTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allRelatedItemsSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allResourceContentTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allResourceIndustriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allResourceInfrastructureProvidersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allResourceMediaTypesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allResourcesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSalesFormPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSalesFormsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcAlertsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcBeforeAfterDiagramsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcButtonV2sMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcButtonsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcCalloutSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcCalloutsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcCaseStudiesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcCaseStudySlidersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcCodeBlocksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcImagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcLinkedTextSummaryListsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcLogoGridsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcMultiButtonsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcProductFeatureTablesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcProductPricingsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcResourcesSlidersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcSectionHeadersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcTextAndContentsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSbcTextsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSblHorizontalsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSblVerticalsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSectionBlockPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSectionBlockV2sMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSectionBlocksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSectionDividersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSectionThemesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSentinelProductTabsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSocialNetworkIconsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSocialNetworksMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSpeakersSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSplitCtaItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allSplitCtaSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allStaticDynamicSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTemplatePagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTerraformGraphSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTerraformOfferingCategoriesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTerraformOfferingTablesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTerraformOfferingTiersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTerraformOfferingsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTestimonialsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTextHeadlineAndGridSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTextHeadlineSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTextImageSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTextSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTrainingCoursesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTrainingPartnerSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTrialFormPagesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allTwoColumnTextSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allUseCasePageDropdownsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allVaultIntegrationSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allVerticalTextBlockListItemsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allVerticalTextBlockListSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allVideoSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allVideoSourcesMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allWebinarsMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allWhitePapersMeta?: Maybe<CollectionMetadata>
  /** Returns meta information regarding a record collection */
  _allWistiaSectionsMeta?: Maybe<CollectionMetadata>
  /** Returns the single instance record */
  _site?: Maybe<Site>
  /** Returns the single instance record */
  aboutPage?: Maybe<AboutPageRecord>
  /** Returns a specific record */
  alert?: Maybe<AlertRecord>
  /** Returns a specific record */
  alertBanner?: Maybe<AlertBannerRecord>
  /** Returns a collection of records */
  allAlertBanners?: Maybe<Array<Maybe<AlertBannerRecord>>>
  /** Returns a collection of records */
  allAlerts?: Maybe<Array<Maybe<AlertRecord>>>
  /** Returns a collection of records */
  allBasicTables?: Maybe<Array<Maybe<BasicTableRecord>>>
  /** Returns a collection of records */
  allBlogPostCategories?: Maybe<Array<Maybe<BlogPostCategoryRecord>>>
  /** Returns a collection of records */
  allBlogPosts?: Maybe<Array<Maybe<BlogPostRecord>>>
  /** Returns a collection of records */
  allButton2s?: Maybe<Array<Maybe<Button2Record>>>
  /** Returns a collection of records */
  allButtonThemes?: Maybe<Array<Maybe<ButtonThemeRecord>>>
  /** Returns a collection of records */
  allCalloutItems?: Maybe<Array<Maybe<CalloutItemRecord>>>
  /** Returns a collection of records */
  allCalloutSections?: Maybe<Array<Maybe<CalloutSectionRecord>>>
  /** Returns a collection of records */
  allCodeSamples?: Maybe<Array<Maybe<CodeSampleRecord>>>
  /** Returns a collection of records */
  allCodeblockLanguages?: Maybe<Array<Maybe<CodeblockLanguageRecord>>>
  /** Returns a collection of records */
  allCompanies?: Maybe<Array<Maybe<CompanyRecord>>>
  /** Returns a collection of records */
  allConsulGraphicSections?: Maybe<Array<Maybe<ConsulGraphicSectionRecord>>>
  /** Returns a collection of records */
  allContactCategories?: Maybe<Array<Maybe<ContactCategoryRecord>>>
  /** Returns a collection of records */
  allContactFormPages?: Maybe<Array<Maybe<ContactFormPageRecord>>>
  /** Returns a collection of records */
  allDropdownLinks?: Maybe<Array<Maybe<DropdownLinkRecord>>>
  /** Returns a collection of records */
  allEmbeddedPodcastSections?: Maybe<Array<Maybe<EmbeddedPodcastSectionRecord>>>
  /** Returns a collection of records */
  allEmbeddedSlidesSections?: Maybe<Array<Maybe<EmbeddedSlidesSectionRecord>>>
  /** Returns a collection of records */
  allEmployeePages?: Maybe<Array<Maybe<EmployeePageRecord>>>
  /** Returns a collection of records */
  allEnterpriseFeaturesCategories?: Maybe<
    Array<Maybe<EnterpriseFeaturesCategoryRecord>>
  >
  /** Returns a collection of records */
  allEnterprisePricingSections?: Maybe<
    Array<Maybe<EnterprisePricingSectionRecord>>
  >
  /** Returns a collection of records */
  allEnterpriseProductPages?: Maybe<Array<Maybe<EnterpriseProductPageRecord>>>
  /** Returns a collection of records */
  allEnterpriseProductSubnavs?: Maybe<
    Array<Maybe<EnterpriseProductSubnavRecord>>
  >
  /** Returns a collection of records */
  allEnterpriseProductUseCasePages?: Maybe<
    Array<Maybe<EnterpriseProductUseCasePageRecord>>
  >
  /** Returns a collection of records */
  allEnterpriseProducts?: Maybe<Array<Maybe<EnterpriseProductRecord>>>
  /** Returns a collection of records */
  allEventTypes?: Maybe<Array<Maybe<EventTypeRecord>>>
  /** Returns a collection of records */
  allEvents?: Maybe<Array<Maybe<EventRecord>>>
  /** Returns a collection of records */
  allExperienceLevels?: Maybe<Array<Maybe<ExperienceLevelRecord>>>
  /** Returns a collection of records */
  allExternalResources?: Maybe<Array<Maybe<ExternalResourceRecord>>>
  /** Returns a collection of records */
  allFaqCategories?: Maybe<Array<Maybe<FaqCategoryRecord>>>
  /** Returns a collection of records */
  allFeatureTableColumns?: Maybe<Array<Maybe<FeatureTableColumnRecord>>>
  /** Returns a collection of records */
  allFeatureTableRowValues?: Maybe<Array<Maybe<FeatureTableRowValueRecord>>>
  /** Returns a collection of records */
  allFeatureTableRows?: Maybe<Array<Maybe<FeatureTableRowRecord>>>
  /** Returns a collection of records */
  allFeatureTableTabs?: Maybe<Array<Maybe<FeatureTableTabRecord>>>
  /** Returns a collection of records */
  allFeatureTables?: Maybe<Array<Maybe<FeatureTableRecord>>>
  /** Returns a collection of records */
  allFormContactTypes?: Maybe<Array<Maybe<FormContactTypeRecord>>>
  /** Returns a collection of records */
  allFormMultiSelectOptions?: Maybe<Array<Maybe<FormMultiSelectOptionRecord>>>
  /** Returns a collection of records */
  allHashiconfBasicPages?: Maybe<Array<Maybe<HashiconfBasicPageRecord>>>
  /** Returns a collection of records */
  allHashiconfFeaturedSpeakersSections?: Maybe<
    Array<Maybe<HashiconfFeaturedSpeakersSectionRecord>>
  >
  /** Returns a collection of records */
  allHashiconfLandingPages?: Maybe<Array<Maybe<HashiconfLandingPageRecord>>>
  /** Returns a collection of records */
  allHashiconfLiveStreamPages?: Maybe<
    Array<Maybe<HashiconfLiveStreamPageRecord>>
  >
  /** Returns a collection of records */
  allHashiconfScheduleDays?: Maybe<Array<Maybe<HashiconfScheduleDayRecord>>>
  /** Returns a collection of records */
  allHashiconfScheduleItems?: Maybe<Array<Maybe<HashiconfScheduleItemRecord>>>
  /** Returns a collection of records */
  allHashiconfScheduleLiteSections?: Maybe<
    Array<Maybe<HashiconfScheduleLiteSectionRecord>>
  >
  /** Returns a collection of records */
  allHashiconfSchedulePages?: Maybe<Array<Maybe<HashiconfSchedulePageRecord>>>
  /** Returns a collection of records */
  allHashiconfSectionBlockPages?: Maybe<
    Array<Maybe<HashiconfSectionBlockPageRecord>>
  >
  /** Returns a collection of records */
  allHashiconfSectionBlocks?: Maybe<Array<Maybe<HashiconfSectionBlockRecord>>>
  /** Returns a collection of records */
  allHashiconfSessions?: Maybe<Array<Maybe<HashiconfSessionRecord>>>
  /** Returns a collection of records */
  allHashiconfSpeakers?: Maybe<Array<Maybe<HashiconfSpeakerRecord>>>
  /** Returns a collection of records */
  allHashiconfSpeakersPages?: Maybe<Array<Maybe<HashiconfSpeakersPageRecord>>>
  /** Returns a collection of records */
  allHashiconfSponsorSections?: Maybe<
    Array<Maybe<HashiconfSponsorSectionRecord>>
  >
  /** Returns a collection of records */
  allHashiconfTextAndFullImages?: Maybe<
    Array<Maybe<HashiconfTextAndFullImageRecord>>
  >
  /** Returns a collection of records */
  allHashiconfTrainingDays?: Maybe<Array<Maybe<HashiconfTrainingDayRecord>>>
  /** Returns a collection of records */
  allHashiconfTrainings?: Maybe<Array<Maybe<HashiconfTrainingRecord>>>
  /** Returns a collection of records */
  allHashiconfs?: Maybe<Array<Maybe<HashiconfRecord>>>
  /** Returns a collection of records */
  allHashicorpProducts?: Maybe<Array<Maybe<HashicorpProductRecord>>>
  /** Returns a collection of records */
  allHeroFormLeads?: Maybe<Array<Maybe<HeroFormLeadRecord>>>
  /** Returns a collection of records */
  allHeroSections?: Maybe<Array<Maybe<HeroSectionRecord>>>
  /** Returns a collection of records */
  allHeroVideoCarouselItems?: Maybe<Array<Maybe<HeroVideoCarouselItemRecord>>>
  /** Returns a collection of records */
  allHomepageProductTabs?: Maybe<Array<Maybe<HomepageProductTabRecord>>>
  /** Returns a collection of records */
  allHtmlSections?: Maybe<Array<Maybe<HtmlSectionRecord>>>
  /** Returns a collection of records */
  allIconLinks?: Maybe<Array<Maybe<IconLinkRecord>>>
  /** Returns a collection of records */
  allImageLockups?: Maybe<Array<Maybe<ImageLockupRecord>>>
  /** Returns a collection of records */
  allImageSections?: Maybe<Array<Maybe<ImageSectionRecord>>>
  /** Returns a collection of records */
  allImageTextCarousels?: Maybe<Array<Maybe<ImageTextCarouselRecord>>>
  /** Returns a collection of records */
  allIntegrationDetailPages?: Maybe<Array<Maybe<IntegrationDetailPageRecord>>>
  /** Returns a collection of records */
  allIntegrationTypeCategories?: Maybe<
    Array<Maybe<IntegrationTypeCategoryRecord>>
  >
  /** Returns a collection of records */
  allIntegrationTypes?: Maybe<Array<Maybe<IntegrationTypeRecord>>>
  /** Returns a collection of records */
  allLargeLogoGridSections?: Maybe<Array<Maybe<LargeLogoGridSectionRecord>>>
  /** Returns a collection of records */
  allLinks?: Maybe<Array<Maybe<LinkRecord>>>
  /** Returns a collection of records */
  allListItems?: Maybe<Array<Maybe<ListItemRecord>>>
  /** Returns a collection of records */
  allLocalPageMetadataSets?: Maybe<Array<Maybe<LocalPageMetadataSetRecord>>>
  /** Returns a collection of records */
  allLocationRooms?: Maybe<Array<Maybe<LocationRoomRecord>>>
  /** Returns a collection of records */
  allLocationVenues?: Maybe<Array<Maybe<LocationVenueRecord>>>
  /** Returns a collection of records */
  allMajorHeadlineSections?: Maybe<Array<Maybe<MajorHeadlineSectionRecord>>>
  /** Returns a collection of records */
  allMiniCallouts?: Maybe<Array<Maybe<MiniCalloutRecord>>>
  /** Returns a collection of records */
  allNavCallouts?: Maybe<Array<Maybe<NavCalloutRecord>>>
  /** Returns a collection of records */
  allNavPromos?: Maybe<Array<Maybe<NavPromoRecord>>>
  /** Returns a collection of records */
  allNewsItems?: Maybe<Array<Maybe<NewsItemRecord>>>
  /** Returns a collection of records */
  allOfficeHoursSessionCopy1s?: Maybe<
    Array<Maybe<OfficeHoursSessionCopy1Record>>
  >
  /** Returns a collection of records */
  allOfficeHoursSessions?: Maybe<Array<Maybe<OfficeHoursSessionRecord>>>
  /** Returns a collection of records */
  allOnDemandResources?: Maybe<Array<Maybe<OnDemandResourceRecord>>>
  /** Returns a collection of records */
  allOpenSourceToolCategories?: Maybe<
    Array<Maybe<OpenSourceToolCategoryRecord>>
  >
  /** Returns a collection of records */
  allOpenSourceTools?: Maybe<Array<Maybe<OpenSourceToolRecord>>>
  /** Returns a collection of records */
  allPackageFeatures?: Maybe<Array<Maybe<PackageFeatureRecord>>>
  /** Returns a collection of records */
  allPackageOptions?: Maybe<Array<Maybe<PackageOptionRecord>>>
  /** Returns a collection of records */
  allPeople?: Maybe<Array<Maybe<PersonRecord>>>
  /** Returns a collection of records */
  allPersonLists?: Maybe<Array<Maybe<PersonListRecord>>>
  /** Returns a collection of records */
  allPressLinks?: Maybe<Array<Maybe<PressLinkRecord>>>
  /** Returns a collection of records */
  allPricingPages?: Maybe<Array<Maybe<PricingPageRecord>>>
  /** Returns a collection of records */
  allProductOfferings?: Maybe<Array<Maybe<ProductOfferingRecord>>>
  /** Returns a collection of records */
  allProductPackageSections?: Maybe<Array<Maybe<ProductPackageSectionRecord>>>
  /** Returns a collection of records */
  allProductPricingPlans?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  /** Returns a collection of records */
  allProductSubnavs?: Maybe<Array<Maybe<ProductSubnavRecord>>>
  /** Returns a collection of records */
  allProductTabFeatures?: Maybe<Array<Maybe<ProductTabFeatureRecord>>>
  /** Returns a collection of records */
  allProductTypes?: Maybe<Array<Maybe<ProductTypeRecord>>>
  /** Returns a collection of records */
  allRelatedItemsSections?: Maybe<Array<Maybe<RelatedItemsSectionRecord>>>
  /** Returns a collection of records */
  allResourceContentTypes?: Maybe<Array<Maybe<ResourceContentTypeRecord>>>
  /** Returns a collection of records */
  allResourceIndustries?: Maybe<Array<Maybe<ResourceIndustryRecord>>>
  /** Returns a collection of records */
  allResourceInfrastructureProviders?: Maybe<
    Array<Maybe<ResourceInfrastructureProviderRecord>>
  >
  /** Returns a collection of records */
  allResourceMediaTypes?: Maybe<Array<Maybe<ResourceMediaTypeRecord>>>
  /** Returns a collection of records */
  allResources?: Maybe<Array<Maybe<ResourceRecord>>>
  /** Returns a collection of records */
  allSalesFormPages?: Maybe<Array<Maybe<SalesFormPageRecord>>>
  /** Returns a collection of records */
  allSalesForms?: Maybe<Array<Maybe<SalesFormRecord>>>
  /** Returns a collection of records */
  allSbcAlerts?: Maybe<Array<Maybe<SbcAlertRecord>>>
  /** Returns a collection of records */
  allSbcBeforeAfterDiagrams?: Maybe<Array<Maybe<SbcBeforeAfterDiagramRecord>>>
  /** Returns a collection of records */
  allSbcButtonV2s?: Maybe<Array<Maybe<SbcButtonV2Record>>>
  /** Returns a collection of records */
  allSbcButtons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  /** Returns a collection of records */
  allSbcCalloutSections?: Maybe<Array<Maybe<SbcCalloutSectionRecord>>>
  /** Returns a collection of records */
  allSbcCallouts?: Maybe<Array<Maybe<SbcCalloutRecord>>>
  /** Returns a collection of records */
  allSbcCaseStudies?: Maybe<Array<Maybe<SbcCaseStudyRecord>>>
  /** Returns a collection of records */
  allSbcCaseStudySliders?: Maybe<Array<Maybe<SbcCaseStudySliderRecord>>>
  /** Returns a collection of records */
  allSbcCodeBlocks?: Maybe<Array<Maybe<SbcCodeBlockRecord>>>
  /** Returns a collection of records */
  allSbcImages?: Maybe<Array<Maybe<SbcImageRecord>>>
  /** Returns a collection of records */
  allSbcLinkedTextSummaryLists?: Maybe<
    Array<Maybe<SbcLinkedTextSummaryListRecord>>
  >
  /** Returns a collection of records */
  allSbcLogoGrids?: Maybe<Array<Maybe<SbcLogoGridRecord>>>
  /** Returns a collection of records */
  allSbcMultiButtons?: Maybe<Array<Maybe<SbcMultiButtonRecord>>>
  /** Returns a collection of records */
  allSbcProductFeatureTables?: Maybe<Array<Maybe<SbcProductFeatureTableRecord>>>
  /** Returns a collection of records */
  allSbcProductPricings?: Maybe<Array<Maybe<SbcProductPricingRecord>>>
  /** Returns a collection of records */
  allSbcResourcesSliders?: Maybe<Array<Maybe<SbcResourcesSliderRecord>>>
  /** Returns a collection of records */
  allSbcSectionHeaders?: Maybe<Array<Maybe<SbcSectionHeaderRecord>>>
  /** Returns a collection of records */
  allSbcTextAndContents?: Maybe<Array<Maybe<SbcTextAndContentRecord>>>
  /** Returns a collection of records */
  allSbcTexts?: Maybe<Array<Maybe<SbcTextRecord>>>
  /** Returns a collection of records */
  allSblHorizontals?: Maybe<Array<Maybe<SblHorizontalRecord>>>
  /** Returns a collection of records */
  allSblVerticals?: Maybe<Array<Maybe<SblVerticalRecord>>>
  /** Returns a collection of records */
  allSectionBlockPages?: Maybe<Array<Maybe<SectionBlockPageRecord>>>
  /** Returns a collection of records */
  allSectionBlockV2s?: Maybe<Array<Maybe<SectionBlockV2Record>>>
  /** Returns a collection of records */
  allSectionBlocks?: Maybe<Array<Maybe<SectionBlockRecord>>>
  /** Returns a collection of records */
  allSectionDividers?: Maybe<Array<Maybe<SectionDividerRecord>>>
  /** Returns a collection of records */
  allSectionThemes?: Maybe<Array<Maybe<SectionThemeRecord>>>
  /** Returns a collection of records */
  allSentinelProductTabs?: Maybe<Array<Maybe<SentinelProductTabRecord>>>
  /** Returns a collection of records */
  allSocialNetworkIcons?: Maybe<Array<Maybe<SocialNetworkIconRecord>>>
  /** Returns a collection of records */
  allSocialNetworks?: Maybe<Array<Maybe<SocialNetworkRecord>>>
  /** Returns a collection of records */
  allSpeakersSections?: Maybe<Array<Maybe<SpeakersSectionRecord>>>
  /** Returns a collection of records */
  allSplitCtaItems?: Maybe<Array<Maybe<SplitCtaItemRecord>>>
  /** Returns a collection of records */
  allSplitCtaSections?: Maybe<Array<Maybe<SplitCtaSectionRecord>>>
  /** Returns a collection of records */
  allStaticDynamicSections?: Maybe<Array<Maybe<StaticDynamicSectionRecord>>>
  /** Returns a collection of records */
  allTemplatePages?: Maybe<Array<Maybe<TemplatePageRecord>>>
  /** Returns a collection of records */
  allTerraformGraphSections?: Maybe<Array<Maybe<TerraformGraphSectionRecord>>>
  /** Returns a collection of records */
  allTerraformOfferingCategories?: Maybe<
    Array<Maybe<TerraformOfferingCategoryRecord>>
  >
  /** Returns a collection of records */
  allTerraformOfferingTables?: Maybe<Array<Maybe<TerraformOfferingTableRecord>>>
  /** Returns a collection of records */
  allTerraformOfferingTiers?: Maybe<Array<Maybe<TerraformOfferingTierRecord>>>
  /** Returns a collection of records */
  allTerraformOfferings?: Maybe<Array<Maybe<TerraformOfferingRecord>>>
  /** Returns a collection of records */
  allTestimonials?: Maybe<Array<Maybe<TestimonialRecord>>>
  /** Returns a collection of records */
  allTextHeadlineAndGridSections?: Maybe<
    Array<Maybe<TextHeadlineAndGridSectionRecord>>
  >
  /** Returns a collection of records */
  allTextHeadlineSections?: Maybe<Array<Maybe<TextHeadlineSectionRecord>>>
  /** Returns a collection of records */
  allTextImageSections?: Maybe<Array<Maybe<TextImageSectionRecord>>>
  /** Returns a collection of records */
  allTextSections?: Maybe<Array<Maybe<TextSectionRecord>>>
  /** Returns a collection of records */
  allTrainingCourses?: Maybe<Array<Maybe<TrainingCourseRecord>>>
  /** Returns a collection of records */
  allTrainingPartnerSections?: Maybe<Array<Maybe<TrainingPartnerSectionRecord>>>
  /** Returns a collection of records */
  allTrialFormPages?: Maybe<Array<Maybe<TrialFormPageRecord>>>
  /** Returns a collection of records */
  allTwoColumnTextSections?: Maybe<Array<Maybe<TwoColumnTextSectionRecord>>>
  /** Returns a collection of records */
  allUseCasePageDropdowns?: Maybe<Array<Maybe<UseCasePageDropdownRecord>>>
  /** Returns a collection of records */
  allVaultIntegrationSections?: Maybe<
    Array<Maybe<VaultIntegrationSectionRecord>>
  >
  /** Returns a collection of records */
  allVerticalTextBlockListItems?: Maybe<
    Array<Maybe<VerticalTextBlockListItemRecord>>
  >
  /** Returns a collection of records */
  allVerticalTextBlockListSections?: Maybe<
    Array<Maybe<VerticalTextBlockListSectionRecord>>
  >
  /** Returns a collection of records */
  allVideoSections?: Maybe<Array<Maybe<VideoSectionRecord>>>
  /** Returns a collection of records */
  allVideoSources?: Maybe<Array<Maybe<VideoSourceRecord>>>
  /** Returns a collection of records */
  allWebinars?: Maybe<Array<Maybe<WebinarRecord>>>
  /** Returns a collection of records */
  allWhitePapers?: Maybe<Array<Maybe<WhitePaperRecord>>>
  /** Returns a collection of records */
  allWistiaSections?: Maybe<Array<Maybe<WistiaSectionRecord>>>
  /** Returns a specific record */
  basicTable?: Maybe<BasicTableRecord>
  /** Returns the single instance record */
  becomeAPartnerCtaFooter?: Maybe<BecomeAPartnerCtaFooterRecord>
  /** Returns the single instance record */
  becomeAPartnerPage?: Maybe<BecomeAPartnerPageRecord>
  /** Returns the single instance record */
  blogIndexPage?: Maybe<BlogIndexPageRecord>
  /** Returns a specific record */
  blogPost?: Maybe<BlogPostRecord>
  /** Returns a specific record */
  blogPostCategory?: Maybe<BlogPostCategoryRecord>
  /** Returns a specific record */
  button2?: Maybe<Button2Record>
  /** Returns a specific record */
  buttonTheme?: Maybe<ButtonThemeRecord>
  /** Returns a specific record */
  calloutItem?: Maybe<CalloutItemRecord>
  /** Returns a specific record */
  calloutSection?: Maybe<CalloutSectionRecord>
  /** Returns a specific record */
  codeSample?: Maybe<CodeSampleRecord>
  /** Returns a specific record */
  codeblockLanguage?: Maybe<CodeblockLanguageRecord>
  /** Returns the single instance record */
  communityLandingPage?: Maybe<CommunityLandingPageRecord>
  /** Returns a specific record */
  company?: Maybe<CompanyRecord>
  /** Returns the single instance record */
  consulFieldDayLive?: Maybe<ConsulFieldDayLiveRecord>
  /** Returns a specific record */
  consulGraphicSection?: Maybe<ConsulGraphicSectionRecord>
  /** Returns the single instance record */
  consulProductPage?: Maybe<ConsulProductPageRecord>
  /** Returns a specific record */
  contactCategory?: Maybe<ContactCategoryRecord>
  /** Returns a specific record */
  contactFormPage?: Maybe<ContactFormPageRecord>
  /** Returns the single instance record */
  contactPage?: Maybe<ContactPageRecord>
  /** Returns a specific record */
  dropdownLink?: Maybe<DropdownLinkRecord>
  /** Returns the single instance record */
  ecosystemFindAPartnerPage?: Maybe<EcosystemFindAPartnerPageRecord>
  /** Returns the single instance record */
  ecosystemLandingPage?: Maybe<EcosystemLandingPageRecord>
  /** Returns a specific record */
  embeddedPodcastSection?: Maybe<EmbeddedPodcastSectionRecord>
  /** Returns a specific record */
  embeddedSlidesSection?: Maybe<EmbeddedSlidesSectionRecord>
  /** Returns a specific record */
  employeePage?: Maybe<EmployeePageRecord>
  /** Returns a specific record */
  enterpriseFeaturesCategory?: Maybe<EnterpriseFeaturesCategoryRecord>
  /** Returns a specific record */
  enterprisePricingSection?: Maybe<EnterprisePricingSectionRecord>
  /** Returns a specific record */
  enterpriseProduct?: Maybe<EnterpriseProductRecord>
  /** Returns a specific record */
  enterpriseProductPage?: Maybe<EnterpriseProductPageRecord>
  /** Returns a specific record */
  enterpriseProductSubnav?: Maybe<EnterpriseProductSubnavRecord>
  /** Returns a specific record */
  enterpriseProductUseCasePage?: Maybe<EnterpriseProductUseCasePageRecord>
  /** Returns a specific record */
  event?: Maybe<EventRecord>
  /** Returns a specific record */
  eventType?: Maybe<EventTypeRecord>
  /** Returns the single instance record */
  eventsPage?: Maybe<EventsPageRecord>
  /** Returns a specific record */
  experienceLevel?: Maybe<ExperienceLevelRecord>
  /** Returns a specific record */
  externalResource?: Maybe<ExternalResourceRecord>
  /** Returns a specific record */
  faqCategory?: Maybe<FaqCategoryRecord>
  /** Returns a specific record */
  featureTable?: Maybe<FeatureTableRecord>
  /** Returns a specific record */
  featureTableColumn?: Maybe<FeatureTableColumnRecord>
  /** Returns a specific record */
  featureTableRow?: Maybe<FeatureTableRowRecord>
  /** Returns a specific record */
  featureTableRowValue?: Maybe<FeatureTableRowValueRecord>
  /** Returns a specific record */
  featureTableTab?: Maybe<FeatureTableTabRecord>
  /** Returns a specific record */
  formContactType?: Maybe<FormContactTypeRecord>
  /** Returns a specific record */
  formMultiSelectOption?: Maybe<FormMultiSelectOptionRecord>
  /** Returns the single instance record */
  fourohfourPage?: Maybe<FourohfourPageRecord>
  /** Returns the single instance record */
  globalDemoForm?: Maybe<GlobalDemoFormRecord>
  /** Returns the single instance record */
  globalFooter?: Maybe<GlobalFooterRecord>
  /** Returns the single instance record */
  globalFooterBasic?: Maybe<GlobalFooterBasicRecord>
  /** Returns the single instance record */
  globalNavigation?: Maybe<GlobalNavigationRecord>
  /** Returns the single instance record */
  guestBlogText?: Maybe<GuestBlogTextRecord>
  /** Returns a specific record */
  hashiconf?: Maybe<HashiconfRecord>
  /** Returns a specific record */
  hashiconfBasicPage?: Maybe<HashiconfBasicPageRecord>
  /** Returns a specific record */
  hashiconfFeaturedSpeakersSection?: Maybe<
    HashiconfFeaturedSpeakersSectionRecord
  >
  /** Returns a specific record */
  hashiconfLandingPage?: Maybe<HashiconfLandingPageRecord>
  /** Returns a specific record */
  hashiconfLiveStreamPage?: Maybe<HashiconfLiveStreamPageRecord>
  /** Returns a specific record */
  hashiconfScheduleDay?: Maybe<HashiconfScheduleDayRecord>
  /** Returns a specific record */
  hashiconfScheduleItem?: Maybe<HashiconfScheduleItemRecord>
  /** Returns a specific record */
  hashiconfScheduleLiteSection?: Maybe<HashiconfScheduleLiteSectionRecord>
  /** Returns a specific record */
  hashiconfSchedulePage?: Maybe<HashiconfSchedulePageRecord>
  /** Returns a specific record */
  hashiconfSectionBlock?: Maybe<HashiconfSectionBlockRecord>
  /** Returns a specific record */
  hashiconfSectionBlockPage?: Maybe<HashiconfSectionBlockPageRecord>
  /** Returns a specific record */
  hashiconfSession?: Maybe<HashiconfSessionRecord>
  /** Returns a specific record */
  hashiconfSpeaker?: Maybe<HashiconfSpeakerRecord>
  /** Returns a specific record */
  hashiconfSpeakersPage?: Maybe<HashiconfSpeakersPageRecord>
  /** Returns a specific record */
  hashiconfSponsorSection?: Maybe<HashiconfSponsorSectionRecord>
  /** Returns a specific record */
  hashiconfTextAndFullImage?: Maybe<HashiconfTextAndFullImageRecord>
  /** Returns a specific record */
  hashiconfTraining?: Maybe<HashiconfTrainingRecord>
  /** Returns a specific record */
  hashiconfTrainingDay?: Maybe<HashiconfTrainingDayRecord>
  /** Returns a specific record */
  hashicorpProduct?: Maybe<HashicorpProductRecord>
  /** Returns a specific record */
  heroFormLead?: Maybe<HeroFormLeadRecord>
  /** Returns a specific record */
  heroSection?: Maybe<HeroSectionRecord>
  /** Returns a specific record */
  heroVideoCarouselItem?: Maybe<HeroVideoCarouselItemRecord>
  /** Returns the single instance record */
  homePage?: Maybe<HomePageRecord>
  /** Returns a specific record */
  homepageProductTab?: Maybe<HomepageProductTabRecord>
  /** Returns a specific record */
  htmlSection?: Maybe<HtmlSectionRecord>
  /** Returns a specific record */
  iconLink?: Maybe<IconLinkRecord>
  /** Returns a specific record */
  imageLockup?: Maybe<ImageLockupRecord>
  /** Returns a specific record */
  imageSection?: Maybe<ImageSectionRecord>
  /** Returns a specific record */
  imageTextCarousel?: Maybe<ImageTextCarouselRecord>
  /** Returns a specific record */
  integrationDetailPage?: Maybe<IntegrationDetailPageRecord>
  /** Returns the single instance record */
  integrationPageFooter?: Maybe<IntegrationPageFooterRecord>
  /** Returns a specific record */
  integrationType?: Maybe<IntegrationTypeRecord>
  /** Returns a specific record */
  integrationTypeCategory?: Maybe<IntegrationTypeCategoryRecord>
  /** Returns the single instance record */
  integrationsPage?: Maybe<IntegrationsPageRecord>
  /** Returns the single instance record */
  jobsPage?: Maybe<JobsPageRecord>
  /** Returns a specific record */
  largeLogoGridSection?: Maybe<LargeLogoGridSectionRecord>
  /** Returns the single instance record */
  learnLandingPage?: Maybe<LearnLandingPageRecord>
  /** Returns a specific record */
  link?: Maybe<LinkRecord>
  /** Returns a specific record */
  listItem?: Maybe<ListItemRecord>
  /** Returns a specific record */
  localPageMetadataSet?: Maybe<LocalPageMetadataSetRecord>
  /** Returns a specific record */
  locationRoom?: Maybe<LocationRoomRecord>
  /** Returns a specific record */
  locationVenue?: Maybe<LocationVenueRecord>
  /** Returns a specific record */
  majorHeadlineSection?: Maybe<MajorHeadlineSectionRecord>
  /** Returns the single instance record */
  megaNav?: Maybe<MegaNavRecord>
  /** Returns a specific record */
  miniCallout?: Maybe<MiniCalloutRecord>
  /** Returns the single instance record */
  nav?: Maybe<NavRecord>
  /** Returns a specific record */
  navCallout?: Maybe<NavCalloutRecord>
  /** Returns a specific record */
  navPromo?: Maybe<NavPromoRecord>
  /** Returns a specific record */
  newsItem?: Maybe<NewsItemRecord>
  /** Returns the single instance record */
  nomadProductPage?: Maybe<NomadProductPageRecord>
  /** Returns a specific record */
  officeHoursSession?: Maybe<OfficeHoursSessionRecord>
  /** Returns a specific record */
  officeHoursSessionCopy1?: Maybe<OfficeHoursSessionCopy1Record>
  /** Returns a specific record */
  onDemandResource?: Maybe<OnDemandResourceRecord>
  /** Returns a specific record */
  openSourceTool?: Maybe<OpenSourceToolRecord>
  /** Returns a specific record */
  openSourceToolCategory?: Maybe<OpenSourceToolCategoryRecord>
  /** Returns a specific record */
  packageFeature?: Maybe<PackageFeatureRecord>
  /** Returns a specific record */
  packageOption?: Maybe<PackageOptionRecord>
  /** Returns the single instance record */
  partnersPage?: Maybe<PartnersPageRecord>
  /** Returns a specific record */
  person?: Maybe<PersonRecord>
  /** Returns a specific record */
  personList?: Maybe<PersonListRecord>
  /** Returns a specific record */
  pressLink?: Maybe<PressLinkRecord>
  /** Returns the single instance record */
  pressPage?: Maybe<PressPageRecord>
  /** Returns a specific record */
  pricingPage?: Maybe<PricingPageRecord>
  /** Returns the single instance record */
  principlesPage?: Maybe<PrinciplesPageRecord>
  /** Returns a specific record */
  productOffering?: Maybe<ProductOfferingRecord>
  /** Returns a specific record */
  productPackageSection?: Maybe<ProductPackageSectionRecord>
  /** Returns a specific record */
  productPricingPlan?: Maybe<ProductPricingPlanRecord>
  /** Returns a specific record */
  productSubnav?: Maybe<ProductSubnavRecord>
  /** Returns a specific record */
  productTabFeature?: Maybe<ProductTabFeatureRecord>
  /** Returns a specific record */
  productType?: Maybe<ProductTypeRecord>
  /** Returns a specific record */
  relatedItemsSection?: Maybe<RelatedItemsSectionRecord>
  /** Returns a specific record */
  resource?: Maybe<ResourceRecord>
  /** Returns a specific record */
  resourceContentType?: Maybe<ResourceContentTypeRecord>
  /** Returns a specific record */
  resourceIndustry?: Maybe<ResourceIndustryRecord>
  /** Returns a specific record */
  resourceInfrastructureProvider?: Maybe<ResourceInfrastructureProviderRecord>
  /** Returns a specific record */
  resourceMediaType?: Maybe<ResourceMediaTypeRecord>
  /** Returns the single instance record */
  resourcesPage?: Maybe<ResourcesPageRecord>
  /** Returns a specific record */
  salesForm?: Maybe<SalesFormRecord>
  /** Returns a specific record */
  salesFormPage?: Maybe<SalesFormPageRecord>
  /** Returns a specific record */
  sbcAlert?: Maybe<SbcAlertRecord>
  /** Returns a specific record */
  sbcBeforeAfterDiagram?: Maybe<SbcBeforeAfterDiagramRecord>
  /** Returns a specific record */
  sbcButton?: Maybe<SbcButtonRecord>
  /** Returns a specific record */
  sbcButtonV2?: Maybe<SbcButtonV2Record>
  /** Returns a specific record */
  sbcCallout?: Maybe<SbcCalloutRecord>
  /** Returns a specific record */
  sbcCalloutSection?: Maybe<SbcCalloutSectionRecord>
  /** Returns a specific record */
  sbcCaseStudy?: Maybe<SbcCaseStudyRecord>
  /** Returns a specific record */
  sbcCaseStudySlider?: Maybe<SbcCaseStudySliderRecord>
  /** Returns a specific record */
  sbcCodeBlock?: Maybe<SbcCodeBlockRecord>
  /** Returns a specific record */
  sbcImage?: Maybe<SbcImageRecord>
  /** Returns a specific record */
  sbcLinkedTextSummaryList?: Maybe<SbcLinkedTextSummaryListRecord>
  /** Returns a specific record */
  sbcLogoGrid?: Maybe<SbcLogoGridRecord>
  /** Returns a specific record */
  sbcMultiButton?: Maybe<SbcMultiButtonRecord>
  /** Returns a specific record */
  sbcProductFeatureTable?: Maybe<SbcProductFeatureTableRecord>
  /** Returns a specific record */
  sbcProductPricing?: Maybe<SbcProductPricingRecord>
  /** Returns a specific record */
  sbcResourcesSlider?: Maybe<SbcResourcesSliderRecord>
  /** Returns a specific record */
  sbcSectionHeader?: Maybe<SbcSectionHeaderRecord>
  /** Returns a specific record */
  sbcText?: Maybe<SbcTextRecord>
  /** Returns a specific record */
  sbcTextAndContent?: Maybe<SbcTextAndContentRecord>
  /** Returns a specific record */
  sblHorizontal?: Maybe<SblHorizontalRecord>
  /** Returns a specific record */
  sblVertical?: Maybe<SblVerticalRecord>
  /** Returns a specific record */
  sectionBlock?: Maybe<SectionBlockRecord>
  /** Returns a specific record */
  sectionBlockPage?: Maybe<SectionBlockPageRecord>
  /** Returns a specific record */
  sectionBlockV2?: Maybe<SectionBlockV2Record>
  /** Returns a specific record */
  sectionDivider?: Maybe<SectionDividerRecord>
  /** Returns a specific record */
  sectionTheme?: Maybe<SectionThemeRecord>
  /** Returns the single instance record */
  sentinelPage?: Maybe<SentinelPageRecord>
  /** Returns a specific record */
  sentinelProductTab?: Maybe<SentinelProductTabRecord>
  /** Returns the single instance record */
  shopPage?: Maybe<ShopPageRecord>
  /** Returns a specific record */
  socialNetwork?: Maybe<SocialNetworkRecord>
  /** Returns a specific record */
  socialNetworkIcon?: Maybe<SocialNetworkIconRecord>
  /** Returns a specific record */
  speakersSection?: Maybe<SpeakersSectionRecord>
  /** Returns a specific record */
  splitCtaItem?: Maybe<SplitCtaItemRecord>
  /** Returns a specific record */
  splitCtaSection?: Maybe<SplitCtaSectionRecord>
  /** Returns a specific record */
  staticDynamicSection?: Maybe<StaticDynamicSectionRecord>
  /** Returns the single instance record */
  subscriptionConfirmationPage?: Maybe<SubscriptionConfirmationPageRecord>
  /** Returns the single instance record */
  subscriptionOptOutSuccessPage?: Maybe<SubscriptionOptOutSuccessPageRecord>
  /** Returns a specific record */
  templatePage?: Maybe<TemplatePageRecord>
  /** Returns a specific record */
  terraformGraphSection?: Maybe<TerraformGraphSectionRecord>
  /** Returns a specific record */
  terraformOffering?: Maybe<TerraformOfferingRecord>
  /** Returns a specific record */
  terraformOfferingCategory?: Maybe<TerraformOfferingCategoryRecord>
  /** Returns a specific record */
  terraformOfferingTable?: Maybe<TerraformOfferingTableRecord>
  /** Returns a specific record */
  terraformOfferingTier?: Maybe<TerraformOfferingTierRecord>
  /** Returns the single instance record */
  terraformProductPage?: Maybe<TerraformProductPageRecord>
  /** Returns a specific record */
  testimonial?: Maybe<TestimonialRecord>
  /** Returns a specific record */
  textHeadlineAndGridSection?: Maybe<TextHeadlineAndGridSectionRecord>
  /** Returns a specific record */
  textHeadlineSection?: Maybe<TextHeadlineSectionRecord>
  /** Returns a specific record */
  textImageSection?: Maybe<TextImageSectionRecord>
  /** Returns a specific record */
  textSection?: Maybe<TextSectionRecord>
  /** Returns the single instance record */
  thankYouPage?: Maybe<ThankYouPageRecord>
  /** Returns a specific record */
  trainingCourse?: Maybe<TrainingCourseRecord>
  /** Returns the single instance record */
  trainingPage?: Maybe<TrainingPageRecord>
  /** Returns a specific record */
  trainingPartnerSection?: Maybe<TrainingPartnerSectionRecord>
  /** Returns a specific record */
  trialFormPage?: Maybe<TrialFormPageRecord>
  /** Returns a specific record */
  twoColumnTextSection?: Maybe<TwoColumnTextSectionRecord>
  /** Returns a specific record */
  useCasePageDropdown?: Maybe<UseCasePageDropdownRecord>
  /** Returns the single instance record */
  vaultAdvancedDataProtectionPage?: Maybe<VaultAdvancedDataProtectionPageRecord>
  /** Returns a specific record */
  vaultIntegrationSection?: Maybe<VaultIntegrationSectionRecord>
  /** Returns the single instance record */
  vaultOssPage?: Maybe<VaultOssPageRecord>
  /** Returns the single instance record */
  vaultProductPage?: Maybe<VaultProductPageRecord>
  /** Returns a specific record */
  verticalTextBlockListItem?: Maybe<VerticalTextBlockListItemRecord>
  /** Returns a specific record */
  verticalTextBlockListSection?: Maybe<VerticalTextBlockListSectionRecord>
  /** Returns a specific record */
  videoSection?: Maybe<VideoSectionRecord>
  /** Returns a specific record */
  videoSource?: Maybe<VideoSourceRecord>
  /** Returns a specific record */
  webinar?: Maybe<WebinarRecord>
  /** Returns a specific record */
  whitePaper?: Maybe<WhitePaperRecord>
  /** Returns a specific record */
  wistiaSection?: Maybe<WistiaSectionRecord>
}

/** The query root for this schema */
export type Query_AllAlertBannersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<AlertBannerModelFilter>
}

/** The query root for this schema */
export type Query_AllAlertsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<AlertModelFilter>
}

/** The query root for this schema */
export type Query_AllBasicTablesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BasicTableModelFilter>
}

/** The query root for this schema */
export type Query_AllBlogPostCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BlogPostCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllBlogPostsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BlogPostModelFilter>
}

/** The query root for this schema */
export type Query_AllButton2sMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<Button2ModelFilter>
}

/** The query root for this schema */
export type Query_AllButtonThemesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ButtonThemeModelFilter>
}

/** The query root for this schema */
export type Query_AllCalloutItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CalloutItemModelFilter>
}

/** The query root for this schema */
export type Query_AllCalloutSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CalloutSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllCodeSamplesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CodeSampleModelFilter>
}

/** The query root for this schema */
export type Query_AllCodeblockLanguagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CodeblockLanguageModelFilter>
}

/** The query root for this schema */
export type Query_AllCompaniesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CompanyModelFilter>
}

/** The query root for this schema */
export type Query_AllConsulGraphicSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ConsulGraphicSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllContactCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ContactCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllContactFormPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ContactFormPageModelFilter>
}

/** The query root for this schema */
export type Query_AllDropdownLinksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<DropdownLinkModelFilter>
}

/** The query root for this schema */
export type Query_AllEmbeddedPodcastSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmbeddedPodcastSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllEmbeddedSlidesSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmbeddedSlidesSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllEmployeePagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmployeePageModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterpriseFeaturesCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseFeaturesCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterprisePricingSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterprisePricingSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterpriseProductPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductPageModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterpriseProductSubnavsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductSubnavModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterpriseProductUseCasePagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductUseCasePageModelFilter>
}

/** The query root for this schema */
export type Query_AllEnterpriseProductsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductModelFilter>
}

/** The query root for this schema */
export type Query_AllEventTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EventTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllEventsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EventModelFilter>
}

/** The query root for this schema */
export type Query_AllExperienceLevelsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ExperienceLevelModelFilter>
}

/** The query root for this schema */
export type Query_AllExternalResourcesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ExternalResourceModelFilter>
}

/** The query root for this schema */
export type Query_AllFaqCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FaqCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllFeatureTableColumnsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableColumnModelFilter>
}

/** The query root for this schema */
export type Query_AllFeatureTableRowValuesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableRowValueModelFilter>
}

/** The query root for this schema */
export type Query_AllFeatureTableRowsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableRowModelFilter>
}

/** The query root for this schema */
export type Query_AllFeatureTableTabsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableTabModelFilter>
}

/** The query root for this schema */
export type Query_AllFeatureTablesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableModelFilter>
}

/** The query root for this schema */
export type Query_AllFormContactTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FormContactTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllFormMultiSelectOptionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FormMultiSelectOptionModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfBasicPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfBasicPageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfFeaturedSpeakersSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfFeaturedSpeakersSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfLandingPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfLandingPageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfLiveStreamPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfLiveStreamPageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfScheduleDaysMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleDayModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfScheduleItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleItemModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfScheduleLiteSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleLiteSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSchedulePagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSchedulePageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSectionBlockPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSectionBlockPageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSectionBlocksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSectionBlockModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSessionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSessionModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSpeakersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSpeakerModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSpeakersPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSpeakersPageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfSponsorSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSponsorSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfTextAndFullImagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTextAndFullImageModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfTrainingDaysMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTrainingDayModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfTrainingsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTrainingModelFilter>
}

/** The query root for this schema */
export type Query_AllHashiconfsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfModelFilter>
}

/** The query root for this schema */
export type Query_AllHashicorpProductsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashicorpProductModelFilter>
}

/** The query root for this schema */
export type Query_AllHeroFormLeadsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroFormLeadModelFilter>
}

/** The query root for this schema */
export type Query_AllHeroSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllHeroVideoCarouselItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroVideoCarouselItemModelFilter>
}

/** The query root for this schema */
export type Query_AllHomepageProductTabsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HomepageProductTabModelFilter>
}

/** The query root for this schema */
export type Query_AllHtmlSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HtmlSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllIconLinksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IconLinkModelFilter>
}

/** The query root for this schema */
export type Query_AllImageLockupsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageLockupModelFilter>
}

/** The query root for this schema */
export type Query_AllImageSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllImageTextCarouselsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageTextCarouselModelFilter>
}

/** The query root for this schema */
export type Query_AllIntegrationDetailPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationDetailPageModelFilter>
}

/** The query root for this schema */
export type Query_AllIntegrationTypeCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationTypeCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllIntegrationTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllLargeLogoGridSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LargeLogoGridSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllLinksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LinkModelFilter>
}

/** The query root for this schema */
export type Query_AllListItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ListItemModelFilter>
}

/** The query root for this schema */
export type Query_AllLocalPageMetadataSetsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocalPageMetadataSetModelFilter>
}

/** The query root for this schema */
export type Query_AllLocationRoomsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocationRoomModelFilter>
}

/** The query root for this schema */
export type Query_AllLocationVenuesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocationVenueModelFilter>
}

/** The query root for this schema */
export type Query_AllMajorHeadlineSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<MajorHeadlineSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllMiniCalloutsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<MiniCalloutModelFilter>
}

/** The query root for this schema */
export type Query_AllNavCalloutsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NavCalloutModelFilter>
}

/** The query root for this schema */
export type Query_AllNavPromosMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NavPromoModelFilter>
}

/** The query root for this schema */
export type Query_AllNewsItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NewsItemModelFilter>
}

/** The query root for this schema */
export type Query_AllOfficeHoursSessionCopy1sMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OfficeHoursSessionCopy1ModelFilter>
}

/** The query root for this schema */
export type Query_AllOfficeHoursSessionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OfficeHoursSessionModelFilter>
}

/** The query root for this schema */
export type Query_AllOnDemandResourcesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OnDemandResourceModelFilter>
}

/** The query root for this schema */
export type Query_AllOpenSourceToolCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OpenSourceToolCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllOpenSourceToolsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OpenSourceToolModelFilter>
}

/** The query root for this schema */
export type Query_AllPackageFeaturesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PackageFeatureModelFilter>
}

/** The query root for this schema */
export type Query_AllPackageOptionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PackageOptionModelFilter>
}

/** The query root for this schema */
export type Query_AllPeopleMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PersonModelFilter>
}

/** The query root for this schema */
export type Query_AllPersonListsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PersonListModelFilter>
}

/** The query root for this schema */
export type Query_AllPressLinksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PressLinkModelFilter>
}

/** The query root for this schema */
export type Query_AllPricingPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PricingPageModelFilter>
}

/** The query root for this schema */
export type Query_AllProductOfferingsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductOfferingModelFilter>
}

/** The query root for this schema */
export type Query_AllProductPackageSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductPackageSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllProductPricingPlansMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductPricingPlanModelFilter>
}

/** The query root for this schema */
export type Query_AllProductSubnavsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductSubnavModelFilter>
}

/** The query root for this schema */
export type Query_AllProductTabFeaturesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductTabFeatureModelFilter>
}

/** The query root for this schema */
export type Query_AllProductTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllRelatedItemsSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<RelatedItemsSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllResourceContentTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceContentTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllResourceIndustriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceIndustryModelFilter>
}

/** The query root for this schema */
export type Query_AllResourceInfrastructureProvidersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceInfrastructureProviderModelFilter>
}

/** The query root for this schema */
export type Query_AllResourceMediaTypesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceMediaTypeModelFilter>
}

/** The query root for this schema */
export type Query_AllResourcesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceModelFilter>
}

/** The query root for this schema */
export type Query_AllSalesFormPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SalesFormPageModelFilter>
}

/** The query root for this schema */
export type Query_AllSalesFormsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SalesFormModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcAlertsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcAlertModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcBeforeAfterDiagramsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcBeforeAfterDiagramModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcButtonV2sMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcButtonV2ModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcButtonsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcButtonModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcCalloutSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCalloutSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcCalloutsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCalloutModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcCaseStudiesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCaseStudyModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcCaseStudySlidersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCaseStudySliderModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcCodeBlocksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCodeBlockModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcImagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcImageModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcLinkedTextSummaryListsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcLinkedTextSummaryListModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcLogoGridsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcLogoGridModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcMultiButtonsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcMultiButtonModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcProductFeatureTablesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcProductFeatureTableModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcProductPricingsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcProductPricingModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcResourcesSlidersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcResourcesSliderModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcSectionHeadersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcSectionHeaderModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcTextAndContentsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcTextAndContentModelFilter>
}

/** The query root for this schema */
export type Query_AllSbcTextsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcTextModelFilter>
}

/** The query root for this schema */
export type Query_AllSblHorizontalsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SblHorizontalModelFilter>
}

/** The query root for this schema */
export type Query_AllSblVerticalsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SblVerticalModelFilter>
}

/** The query root for this schema */
export type Query_AllSectionBlockPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockPageModelFilter>
}

/** The query root for this schema */
export type Query_AllSectionBlockV2sMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockV2ModelFilter>
}

/** The query root for this schema */
export type Query_AllSectionBlocksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockModelFilter>
}

/** The query root for this schema */
export type Query_AllSectionDividersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionDividerModelFilter>
}

/** The query root for this schema */
export type Query_AllSectionThemesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionThemeModelFilter>
}

/** The query root for this schema */
export type Query_AllSentinelProductTabsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SentinelProductTabModelFilter>
}

/** The query root for this schema */
export type Query_AllSocialNetworkIconsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SocialNetworkIconModelFilter>
}

/** The query root for this schema */
export type Query_AllSocialNetworksMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SocialNetworkModelFilter>
}

/** The query root for this schema */
export type Query_AllSpeakersSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SpeakersSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllSplitCtaItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SplitCtaItemModelFilter>
}

/** The query root for this schema */
export type Query_AllSplitCtaSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SplitCtaSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllStaticDynamicSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<StaticDynamicSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTemplatePagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TemplatePageModelFilter>
}

/** The query root for this schema */
export type Query_AllTerraformGraphSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformGraphSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTerraformOfferingCategoriesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingCategoryModelFilter>
}

/** The query root for this schema */
export type Query_AllTerraformOfferingTablesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingTableModelFilter>
}

/** The query root for this schema */
export type Query_AllTerraformOfferingTiersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingTierModelFilter>
}

/** The query root for this schema */
export type Query_AllTerraformOfferingsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingModelFilter>
}

/** The query root for this schema */
export type Query_AllTestimonialsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TestimonialModelFilter>
}

/** The query root for this schema */
export type Query_AllTextHeadlineAndGridSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextHeadlineAndGridSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTextHeadlineSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextHeadlineSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTextImageSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextImageSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTextSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTrainingCoursesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrainingCourseModelFilter>
}

/** The query root for this schema */
export type Query_AllTrainingPartnerSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrainingPartnerSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllTrialFormPagesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrialFormPageModelFilter>
}

/** The query root for this schema */
export type Query_AllTwoColumnTextSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TwoColumnTextSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllUseCasePageDropdownsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<UseCasePageDropdownModelFilter>
}

/** The query root for this schema */
export type Query_AllVaultIntegrationSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VaultIntegrationSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllVerticalTextBlockListItemsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VerticalTextBlockListItemModelFilter>
}

/** The query root for this schema */
export type Query_AllVerticalTextBlockListSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VerticalTextBlockListSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllVideoSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VideoSectionModelFilter>
}

/** The query root for this schema */
export type Query_AllVideoSourcesMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VideoSourceModelFilter>
}

/** The query root for this schema */
export type Query_AllWebinarsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WebinarModelFilter>
}

/** The query root for this schema */
export type Query_AllWhitePapersMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WhitePaperModelFilter>
}

/** The query root for this schema */
export type Query_AllWistiaSectionsMetaArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WistiaSectionModelFilter>
}

/** The query root for this schema */
export type Query_SiteArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryAboutPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryAlertArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<AlertModelFilter>
  orderBy?: Maybe<Array<Maybe<AlertModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAlertBannerArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<AlertBannerModelFilter>
  orderBy?: Maybe<Array<Maybe<AlertBannerModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllAlertBannersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<AlertBannerModelFilter>
  orderBy?: Maybe<Array<Maybe<AlertBannerModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllAlertsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<AlertModelFilter>
  orderBy?: Maybe<Array<Maybe<AlertModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllBasicTablesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<BasicTableModelFilter>
  orderBy?: Maybe<Array<Maybe<BasicTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllBlogPostCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<BlogPostCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<BlogPostCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllBlogPostsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<BlogPostModelFilter>
  orderBy?: Maybe<Array<Maybe<BlogPostModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllButton2sArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<Button2ModelFilter>
  orderBy?: Maybe<Array<Maybe<Button2ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllButtonThemesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ButtonThemeModelFilter>
  orderBy?: Maybe<Array<Maybe<ButtonThemeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllCalloutItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<CalloutItemModelFilter>
  orderBy?: Maybe<Array<Maybe<CalloutItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllCalloutSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<CalloutSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<CalloutSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllCodeSamplesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<CodeSampleModelFilter>
  orderBy?: Maybe<Array<Maybe<CodeSampleModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllCodeblockLanguagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<CodeblockLanguageModelFilter>
  orderBy?: Maybe<Array<Maybe<CodeblockLanguageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllCompaniesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<CompanyModelFilter>
  orderBy?: Maybe<Array<Maybe<CompanyModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllConsulGraphicSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ConsulGraphicSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ConsulGraphicSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllContactCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ContactCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<ContactCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllContactFormPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ContactFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<ContactFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllDropdownLinksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<DropdownLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<DropdownLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEmbeddedPodcastSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EmbeddedPodcastSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EmbeddedPodcastSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEmbeddedSlidesSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EmbeddedSlidesSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EmbeddedSlidesSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEmployeePagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EmployeePageModelFilter>
  orderBy?: Maybe<Array<Maybe<EmployeePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterpriseFeaturesCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterpriseFeaturesCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseFeaturesCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterprisePricingSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterprisePricingSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterprisePricingSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterpriseProductPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterpriseProductPageModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterpriseProductSubnavsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterpriseProductSubnavModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductSubnavModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterpriseProductUseCasePagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterpriseProductUseCasePageModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductUseCasePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEnterpriseProductsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EnterpriseProductModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEventTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EventTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<EventTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllEventsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<EventModelFilter>
  orderBy?: Maybe<Array<Maybe<EventModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllExperienceLevelsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ExperienceLevelModelFilter>
  orderBy?: Maybe<Array<Maybe<ExperienceLevelModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllExternalResourcesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ExternalResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<ExternalResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFaqCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FaqCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<FaqCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFeatureTableColumnsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FeatureTableColumnModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableColumnModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFeatureTableRowValuesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FeatureTableRowValueModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableRowValueModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFeatureTableRowsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FeatureTableRowModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableRowModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFeatureTableTabsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FeatureTableTabModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFeatureTablesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FeatureTableModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFormContactTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FormContactTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<FormContactTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllFormMultiSelectOptionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<FormMultiSelectOptionModelFilter>
  orderBy?: Maybe<Array<Maybe<FormMultiSelectOptionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfBasicPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfBasicPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfBasicPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfFeaturedSpeakersSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfFeaturedSpeakersSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfFeaturedSpeakersSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfLandingPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfLandingPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfLandingPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfLiveStreamPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfLiveStreamPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfLiveStreamPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfScheduleDaysArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfScheduleDayModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleDayModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfScheduleItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfScheduleItemModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfScheduleLiteSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfScheduleLiteSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleLiteSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSchedulePagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSchedulePageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSchedulePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSectionBlockPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSectionBlockPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSectionBlockPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSectionBlocksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSectionBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSectionBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSessionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSessionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSessionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSpeakersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSpeakerModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSpeakerModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSpeakersPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSpeakersPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSpeakersPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfSponsorSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfSponsorSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSponsorSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfTextAndFullImagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfTextAndFullImageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTextAndFullImageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfTrainingDaysArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfTrainingDayModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTrainingDayModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfTrainingsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfTrainingModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTrainingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashiconfsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashiconfModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHashicorpProductsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HashicorpProductModelFilter>
  orderBy?: Maybe<Array<Maybe<HashicorpProductModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHeroFormLeadsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HeroFormLeadModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroFormLeadModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHeroSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HeroSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHeroVideoCarouselItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HeroVideoCarouselItemModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroVideoCarouselItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHomepageProductTabsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HomepageProductTabModelFilter>
  orderBy?: Maybe<Array<Maybe<HomepageProductTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllHtmlSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<HtmlSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HtmlSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllIconLinksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<IconLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<IconLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllImageLockupsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ImageLockupModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageLockupModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllImageSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ImageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllImageTextCarouselsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ImageTextCarouselModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageTextCarouselModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllIntegrationDetailPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<IntegrationDetailPageModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationDetailPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllIntegrationTypeCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<IntegrationTypeCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationTypeCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllIntegrationTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<IntegrationTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllLargeLogoGridSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<LargeLogoGridSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<LargeLogoGridSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllLinksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<LinkModelFilter>
  orderBy?: Maybe<Array<Maybe<LinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllListItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ListItemModelFilter>
  orderBy?: Maybe<Array<Maybe<ListItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllLocalPageMetadataSetsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<LocalPageMetadataSetModelFilter>
  orderBy?: Maybe<Array<Maybe<LocalPageMetadataSetModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllLocationRoomsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<LocationRoomModelFilter>
  orderBy?: Maybe<Array<Maybe<LocationRoomModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllLocationVenuesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<LocationVenueModelFilter>
  orderBy?: Maybe<Array<Maybe<LocationVenueModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllMajorHeadlineSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<MajorHeadlineSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<MajorHeadlineSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllMiniCalloutsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<MiniCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<MiniCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllNavCalloutsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<NavCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<NavCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllNavPromosArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<NavPromoModelFilter>
  orderBy?: Maybe<Array<Maybe<NavPromoModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllNewsItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<NewsItemModelFilter>
  orderBy?: Maybe<Array<Maybe<NewsItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllOfficeHoursSessionCopy1sArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<OfficeHoursSessionCopy1ModelFilter>
  orderBy?: Maybe<Array<Maybe<OfficeHoursSessionCopy1ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllOfficeHoursSessionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<OfficeHoursSessionModelFilter>
  orderBy?: Maybe<Array<Maybe<OfficeHoursSessionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllOnDemandResourcesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<OnDemandResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<OnDemandResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllOpenSourceToolCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<OpenSourceToolCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<OpenSourceToolCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllOpenSourceToolsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<OpenSourceToolModelFilter>
  orderBy?: Maybe<Array<Maybe<OpenSourceToolModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPackageFeaturesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PackageFeatureModelFilter>
  orderBy?: Maybe<Array<Maybe<PackageFeatureModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPackageOptionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PackageOptionModelFilter>
  orderBy?: Maybe<Array<Maybe<PackageOptionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPeopleArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PersonModelFilter>
  orderBy?: Maybe<Array<Maybe<PersonModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPersonListsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PersonListModelFilter>
  orderBy?: Maybe<Array<Maybe<PersonListModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPressLinksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PressLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<PressLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllPricingPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<PricingPageModelFilter>
  orderBy?: Maybe<Array<Maybe<PricingPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductOfferingsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductOfferingModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductOfferingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductPackageSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductPackageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductPackageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductPricingPlansArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductPricingPlanModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductPricingPlanModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductSubnavsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductSubnavModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductSubnavModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductTabFeaturesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductTabFeatureModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductTabFeatureModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllProductTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ProductTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllRelatedItemsSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<RelatedItemsSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<RelatedItemsSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllResourceContentTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ResourceContentTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceContentTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllResourceIndustriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ResourceIndustryModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceIndustryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllResourceInfrastructureProvidersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ResourceInfrastructureProviderModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceInfrastructureProviderModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllResourceMediaTypesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ResourceMediaTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceMediaTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllResourcesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<ResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSalesFormPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SalesFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<SalesFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSalesFormsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SalesFormModelFilter>
  orderBy?: Maybe<Array<Maybe<SalesFormModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcAlertsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcAlertModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcAlertModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcBeforeAfterDiagramsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcBeforeAfterDiagramModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcBeforeAfterDiagramModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcButtonV2sArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcButtonV2ModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcButtonV2ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcButtonsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcButtonModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcButtonModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcCalloutSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcCalloutSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCalloutSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcCalloutsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcCaseStudiesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcCaseStudyModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCaseStudyModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcCaseStudySlidersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcCaseStudySliderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCaseStudySliderModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcCodeBlocksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcCodeBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCodeBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcImagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcImageModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcImageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcLinkedTextSummaryListsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcLinkedTextSummaryListModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcLinkedTextSummaryListModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcLogoGridsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcLogoGridModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcLogoGridModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcMultiButtonsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcMultiButtonModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcMultiButtonModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcProductFeatureTablesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcProductFeatureTableModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcProductFeatureTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcProductPricingsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcProductPricingModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcProductPricingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcResourcesSlidersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcResourcesSliderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcResourcesSliderModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcSectionHeadersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcSectionHeaderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcSectionHeaderModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcTextAndContentsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcTextAndContentModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcTextAndContentModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSbcTextsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SbcTextModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcTextModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSblHorizontalsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SblHorizontalModelFilter>
  orderBy?: Maybe<Array<Maybe<SblHorizontalModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSblVerticalsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SblVerticalModelFilter>
  orderBy?: Maybe<Array<Maybe<SblVerticalModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSectionBlockPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SectionBlockPageModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSectionBlockV2sArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SectionBlockV2ModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockV2ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSectionBlocksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SectionBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSectionDividersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SectionDividerModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionDividerModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSectionThemesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SectionThemeModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionThemeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSentinelProductTabsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SentinelProductTabModelFilter>
  orderBy?: Maybe<Array<Maybe<SentinelProductTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSocialNetworkIconsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SocialNetworkIconModelFilter>
  orderBy?: Maybe<Array<Maybe<SocialNetworkIconModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSocialNetworksArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SocialNetworkModelFilter>
  orderBy?: Maybe<Array<Maybe<SocialNetworkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSpeakersSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SpeakersSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SpeakersSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSplitCtaItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SplitCtaItemModelFilter>
  orderBy?: Maybe<Array<Maybe<SplitCtaItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllSplitCtaSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<SplitCtaSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SplitCtaSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllStaticDynamicSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<StaticDynamicSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<StaticDynamicSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTemplatePagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TemplatePageModelFilter>
  orderBy?: Maybe<Array<Maybe<TemplatePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTerraformGraphSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TerraformGraphSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformGraphSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTerraformOfferingCategoriesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TerraformOfferingCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTerraformOfferingTablesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TerraformOfferingTableModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTerraformOfferingTiersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TerraformOfferingTierModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingTierModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTerraformOfferingsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TerraformOfferingModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTestimonialsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TestimonialModelFilter>
  orderBy?: Maybe<Array<Maybe<TestimonialModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTextHeadlineAndGridSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TextHeadlineAndGridSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextHeadlineAndGridSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTextHeadlineSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TextHeadlineSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextHeadlineSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTextImageSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TextImageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextImageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTextSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TextSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTrainingCoursesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TrainingCourseModelFilter>
  orderBy?: Maybe<Array<Maybe<TrainingCourseModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTrainingPartnerSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TrainingPartnerSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TrainingPartnerSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTrialFormPagesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TrialFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<TrialFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllTwoColumnTextSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<TwoColumnTextSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TwoColumnTextSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllUseCasePageDropdownsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<UseCasePageDropdownModelFilter>
  orderBy?: Maybe<Array<Maybe<UseCasePageDropdownModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllVaultIntegrationSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<VaultIntegrationSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VaultIntegrationSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllVerticalTextBlockListItemsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<VerticalTextBlockListItemModelFilter>
  orderBy?: Maybe<Array<Maybe<VerticalTextBlockListItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllVerticalTextBlockListSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<VerticalTextBlockListSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VerticalTextBlockListSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllVideoSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<VideoSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VideoSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllVideoSourcesArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<VideoSourceModelFilter>
  orderBy?: Maybe<Array<Maybe<VideoSourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllWebinarsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<WebinarModelFilter>
  orderBy?: Maybe<Array<Maybe<WebinarModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllWhitePapersArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<WhitePaperModelFilter>
  orderBy?: Maybe<Array<Maybe<WhitePaperModelOrderBy>>>
}

/** The query root for this schema */
export type QueryAllWistiaSectionsArgs = {
  locale?: Maybe<SiteLocale>
  skip?: Maybe<Scalars['IntType']>
  first?: Maybe<Scalars['IntType']>
  filter?: Maybe<WistiaSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<WistiaSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryBasicTableArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BasicTableModelFilter>
  orderBy?: Maybe<Array<Maybe<BasicTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryBecomeAPartnerCtaFooterArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryBecomeAPartnerPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryBlogIndexPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryBlogPostArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BlogPostModelFilter>
  orderBy?: Maybe<Array<Maybe<BlogPostModelOrderBy>>>
}

/** The query root for this schema */
export type QueryBlogPostCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<BlogPostCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<BlogPostCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryButton2Args = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<Button2ModelFilter>
  orderBy?: Maybe<Array<Maybe<Button2ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryButtonThemeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ButtonThemeModelFilter>
  orderBy?: Maybe<Array<Maybe<ButtonThemeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryCalloutItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CalloutItemModelFilter>
  orderBy?: Maybe<Array<Maybe<CalloutItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryCalloutSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CalloutSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<CalloutSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryCodeSampleArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CodeSampleModelFilter>
  orderBy?: Maybe<Array<Maybe<CodeSampleModelOrderBy>>>
}

/** The query root for this schema */
export type QueryCodeblockLanguageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CodeblockLanguageModelFilter>
  orderBy?: Maybe<Array<Maybe<CodeblockLanguageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryCommunityLandingPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryCompanyArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<CompanyModelFilter>
  orderBy?: Maybe<Array<Maybe<CompanyModelOrderBy>>>
}

/** The query root for this schema */
export type QueryConsulFieldDayLiveArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryConsulGraphicSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ConsulGraphicSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ConsulGraphicSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryConsulProductPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryContactCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ContactCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<ContactCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryContactFormPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ContactFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<ContactFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryContactPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryDropdownLinkArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<DropdownLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<DropdownLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEcosystemFindAPartnerPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryEcosystemLandingPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryEmbeddedPodcastSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmbeddedPodcastSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EmbeddedPodcastSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEmbeddedSlidesSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmbeddedSlidesSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EmbeddedSlidesSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEmployeePageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EmployeePageModelFilter>
  orderBy?: Maybe<Array<Maybe<EmployeePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterpriseFeaturesCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseFeaturesCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseFeaturesCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterprisePricingSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterprisePricingSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterprisePricingSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterpriseProductArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterpriseProductPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductPageModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterpriseProductSubnavArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductSubnavModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductSubnavModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEnterpriseProductUseCasePageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EnterpriseProductUseCasePageModelFilter>
  orderBy?: Maybe<Array<Maybe<EnterpriseProductUseCasePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEventArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EventModelFilter>
  orderBy?: Maybe<Array<Maybe<EventModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEventTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<EventTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<EventTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryEventsPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryExperienceLevelArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ExperienceLevelModelFilter>
  orderBy?: Maybe<Array<Maybe<ExperienceLevelModelOrderBy>>>
}

/** The query root for this schema */
export type QueryExternalResourceArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ExternalResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<ExternalResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFaqCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FaqCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<FaqCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFeatureTableArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFeatureTableColumnArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableColumnModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableColumnModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFeatureTableRowArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableRowModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableRowModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFeatureTableRowValueArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableRowValueModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableRowValueModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFeatureTableTabArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FeatureTableTabModelFilter>
  orderBy?: Maybe<Array<Maybe<FeatureTableTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFormContactTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FormContactTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<FormContactTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFormMultiSelectOptionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<FormMultiSelectOptionModelFilter>
  orderBy?: Maybe<Array<Maybe<FormMultiSelectOptionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryFourohfourPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryGlobalDemoFormArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryGlobalFooterArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryGlobalFooterBasicArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryGlobalNavigationArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryGuestBlogTextArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryHashiconfArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfBasicPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfBasicPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfBasicPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfFeaturedSpeakersSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfFeaturedSpeakersSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfFeaturedSpeakersSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfLandingPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfLandingPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfLandingPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfLiveStreamPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfLiveStreamPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfLiveStreamPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfScheduleDayArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleDayModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleDayModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfScheduleItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleItemModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfScheduleLiteSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfScheduleLiteSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfScheduleLiteSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSchedulePageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSchedulePageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSchedulePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSectionBlockArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSectionBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSectionBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSectionBlockPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSectionBlockPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSectionBlockPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSessionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSessionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSessionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSpeakerArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSpeakerModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSpeakerModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSpeakersPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSpeakersPageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSpeakersPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfSponsorSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfSponsorSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfSponsorSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfTextAndFullImageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTextAndFullImageModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTextAndFullImageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfTrainingArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTrainingModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTrainingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashiconfTrainingDayArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashiconfTrainingDayModelFilter>
  orderBy?: Maybe<Array<Maybe<HashiconfTrainingDayModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHashicorpProductArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HashicorpProductModelFilter>
  orderBy?: Maybe<Array<Maybe<HashicorpProductModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHeroFormLeadArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroFormLeadModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroFormLeadModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHeroSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHeroVideoCarouselItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HeroVideoCarouselItemModelFilter>
  orderBy?: Maybe<Array<Maybe<HeroVideoCarouselItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHomePageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryHomepageProductTabArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HomepageProductTabModelFilter>
  orderBy?: Maybe<Array<Maybe<HomepageProductTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryHtmlSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<HtmlSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<HtmlSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryIconLinkArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IconLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<IconLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryImageLockupArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageLockupModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageLockupModelOrderBy>>>
}

/** The query root for this schema */
export type QueryImageSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryImageTextCarouselArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ImageTextCarouselModelFilter>
  orderBy?: Maybe<Array<Maybe<ImageTextCarouselModelOrderBy>>>
}

/** The query root for this schema */
export type QueryIntegrationDetailPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationDetailPageModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationDetailPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryIntegrationPageFooterArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryIntegrationTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryIntegrationTypeCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<IntegrationTypeCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<IntegrationTypeCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryIntegrationsPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryJobsPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryLargeLogoGridSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LargeLogoGridSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<LargeLogoGridSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryLearnLandingPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryLinkArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LinkModelFilter>
  orderBy?: Maybe<Array<Maybe<LinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryListItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ListItemModelFilter>
  orderBy?: Maybe<Array<Maybe<ListItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryLocalPageMetadataSetArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocalPageMetadataSetModelFilter>
  orderBy?: Maybe<Array<Maybe<LocalPageMetadataSetModelOrderBy>>>
}

/** The query root for this schema */
export type QueryLocationRoomArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocationRoomModelFilter>
  orderBy?: Maybe<Array<Maybe<LocationRoomModelOrderBy>>>
}

/** The query root for this schema */
export type QueryLocationVenueArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<LocationVenueModelFilter>
  orderBy?: Maybe<Array<Maybe<LocationVenueModelOrderBy>>>
}

/** The query root for this schema */
export type QueryMajorHeadlineSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<MajorHeadlineSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<MajorHeadlineSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryMegaNavArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryMiniCalloutArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<MiniCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<MiniCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QueryNavArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryNavCalloutArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NavCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<NavCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QueryNavPromoArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NavPromoModelFilter>
  orderBy?: Maybe<Array<Maybe<NavPromoModelOrderBy>>>
}

/** The query root for this schema */
export type QueryNewsItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<NewsItemModelFilter>
  orderBy?: Maybe<Array<Maybe<NewsItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryNomadProductPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryOfficeHoursSessionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OfficeHoursSessionModelFilter>
  orderBy?: Maybe<Array<Maybe<OfficeHoursSessionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryOfficeHoursSessionCopy1Args = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OfficeHoursSessionCopy1ModelFilter>
  orderBy?: Maybe<Array<Maybe<OfficeHoursSessionCopy1ModelOrderBy>>>
}

/** The query root for this schema */
export type QueryOnDemandResourceArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OnDemandResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<OnDemandResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryOpenSourceToolArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OpenSourceToolModelFilter>
  orderBy?: Maybe<Array<Maybe<OpenSourceToolModelOrderBy>>>
}

/** The query root for this schema */
export type QueryOpenSourceToolCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<OpenSourceToolCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<OpenSourceToolCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPackageFeatureArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PackageFeatureModelFilter>
  orderBy?: Maybe<Array<Maybe<PackageFeatureModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPackageOptionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PackageOptionModelFilter>
  orderBy?: Maybe<Array<Maybe<PackageOptionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPartnersPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryPersonArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PersonModelFilter>
  orderBy?: Maybe<Array<Maybe<PersonModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPersonListArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PersonListModelFilter>
  orderBy?: Maybe<Array<Maybe<PersonListModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPressLinkArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PressLinkModelFilter>
  orderBy?: Maybe<Array<Maybe<PressLinkModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPressPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryPricingPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<PricingPageModelFilter>
  orderBy?: Maybe<Array<Maybe<PricingPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryPrinciplesPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryProductOfferingArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductOfferingModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductOfferingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryProductPackageSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductPackageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductPackageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryProductPricingPlanArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductPricingPlanModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductPricingPlanModelOrderBy>>>
}

/** The query root for this schema */
export type QueryProductSubnavArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductSubnavModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductSubnavModelOrderBy>>>
}

/** The query root for this schema */
export type QueryProductTabFeatureArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductTabFeatureModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductTabFeatureModelOrderBy>>>
}

/** The query root for this schema */
export type QueryProductTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ProductTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ProductTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryRelatedItemsSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<RelatedItemsSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<RelatedItemsSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourceArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourceContentTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceContentTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceContentTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourceIndustryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceIndustryModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceIndustryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourceInfrastructureProviderArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceInfrastructureProviderModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceInfrastructureProviderModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourceMediaTypeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<ResourceMediaTypeModelFilter>
  orderBy?: Maybe<Array<Maybe<ResourceMediaTypeModelOrderBy>>>
}

/** The query root for this schema */
export type QueryResourcesPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QuerySalesFormArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SalesFormModelFilter>
  orderBy?: Maybe<Array<Maybe<SalesFormModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySalesFormPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SalesFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<SalesFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcAlertArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcAlertModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcAlertModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcBeforeAfterDiagramArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcBeforeAfterDiagramModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcBeforeAfterDiagramModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcButtonArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcButtonModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcButtonModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcButtonV2Args = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcButtonV2ModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcButtonV2ModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcCalloutArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCalloutModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCalloutModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcCalloutSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCalloutSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCalloutSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcCaseStudyArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCaseStudyModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCaseStudyModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcCaseStudySliderArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCaseStudySliderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCaseStudySliderModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcCodeBlockArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcCodeBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcCodeBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcImageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcImageModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcImageModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcLinkedTextSummaryListArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcLinkedTextSummaryListModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcLinkedTextSummaryListModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcLogoGridArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcLogoGridModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcLogoGridModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcMultiButtonArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcMultiButtonModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcMultiButtonModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcProductFeatureTableArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcProductFeatureTableModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcProductFeatureTableModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcProductPricingArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcProductPricingModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcProductPricingModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcResourcesSliderArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcResourcesSliderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcResourcesSliderModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcSectionHeaderArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcSectionHeaderModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcSectionHeaderModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcTextArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcTextModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcTextModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySbcTextAndContentArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SbcTextAndContentModelFilter>
  orderBy?: Maybe<Array<Maybe<SbcTextAndContentModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySblHorizontalArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SblHorizontalModelFilter>
  orderBy?: Maybe<Array<Maybe<SblHorizontalModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySblVerticalArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SblVerticalModelFilter>
  orderBy?: Maybe<Array<Maybe<SblVerticalModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySectionBlockArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySectionBlockPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockPageModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockPageModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySectionBlockV2Args = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionBlockV2ModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionBlockV2ModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySectionDividerArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionDividerModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionDividerModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySectionThemeArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SectionThemeModelFilter>
  orderBy?: Maybe<Array<Maybe<SectionThemeModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySentinelPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QuerySentinelProductTabArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SentinelProductTabModelFilter>
  orderBy?: Maybe<Array<Maybe<SentinelProductTabModelOrderBy>>>
}

/** The query root for this schema */
export type QueryShopPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QuerySocialNetworkArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SocialNetworkModelFilter>
  orderBy?: Maybe<Array<Maybe<SocialNetworkModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySocialNetworkIconArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SocialNetworkIconModelFilter>
  orderBy?: Maybe<Array<Maybe<SocialNetworkIconModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySpeakersSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SpeakersSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SpeakersSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySplitCtaItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SplitCtaItemModelFilter>
  orderBy?: Maybe<Array<Maybe<SplitCtaItemModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySplitCtaSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<SplitCtaSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<SplitCtaSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryStaticDynamicSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<StaticDynamicSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<StaticDynamicSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QuerySubscriptionConfirmationPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QuerySubscriptionOptOutSuccessPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryTemplatePageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TemplatePageModelFilter>
  orderBy?: Maybe<Array<Maybe<TemplatePageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformGraphSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformGraphSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformGraphSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformOfferingArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformOfferingCategoryArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingCategoryModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingCategoryModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformOfferingTableArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingTableModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingTableModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformOfferingTierArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TerraformOfferingTierModelFilter>
  orderBy?: Maybe<Array<Maybe<TerraformOfferingTierModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTerraformProductPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryTestimonialArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TestimonialModelFilter>
  orderBy?: Maybe<Array<Maybe<TestimonialModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTextHeadlineAndGridSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextHeadlineAndGridSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextHeadlineAndGridSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTextHeadlineSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextHeadlineSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextHeadlineSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTextImageSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextImageSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextImageSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTextSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TextSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TextSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryThankYouPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryTrainingCourseArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrainingCourseModelFilter>
  orderBy?: Maybe<Array<Maybe<TrainingCourseModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTrainingPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryTrainingPartnerSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrainingPartnerSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TrainingPartnerSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTrialFormPageArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TrialFormPageModelFilter>
  orderBy?: Maybe<Array<Maybe<TrialFormPageModelOrderBy>>>
}

/** The query root for this schema */
export type QueryTwoColumnTextSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<TwoColumnTextSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<TwoColumnTextSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryUseCasePageDropdownArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<UseCasePageDropdownModelFilter>
  orderBy?: Maybe<Array<Maybe<UseCasePageDropdownModelOrderBy>>>
}

/** The query root for this schema */
export type QueryVaultAdvancedDataProtectionPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryVaultIntegrationSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VaultIntegrationSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VaultIntegrationSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryVaultOssPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryVaultProductPageArgs = {
  locale?: Maybe<SiteLocale>
}

/** The query root for this schema */
export type QueryVerticalTextBlockListItemArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VerticalTextBlockListItemModelFilter>
  orderBy?: Maybe<Array<Maybe<VerticalTextBlockListItemModelOrderBy>>>
}

/** The query root for this schema */
export type QueryVerticalTextBlockListSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VerticalTextBlockListSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VerticalTextBlockListSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryVideoSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VideoSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<VideoSectionModelOrderBy>>>
}

/** The query root for this schema */
export type QueryVideoSourceArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<VideoSourceModelFilter>
  orderBy?: Maybe<Array<Maybe<VideoSourceModelOrderBy>>>
}

/** The query root for this schema */
export type QueryWebinarArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WebinarModelFilter>
  orderBy?: Maybe<Array<Maybe<WebinarModelOrderBy>>>
}

/** The query root for this schema */
export type QueryWhitePaperArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WhitePaperModelFilter>
  orderBy?: Maybe<Array<Maybe<WhitePaperModelOrderBy>>>
}

/** The query root for this schema */
export type QueryWistiaSectionArgs = {
  locale?: Maybe<SiteLocale>
  filter?: Maybe<WistiaSectionModelFilter>
  orderBy?: Maybe<Array<Maybe<WistiaSectionModelOrderBy>>>
}

export type RelatedItemsSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  slides?: Maybe<StringFilter>
  github?: Maybe<StringFilter>
  transcript?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<RelatedItemsSectionModelFilter>>>
}

export enum RelatedItemsSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SlidesAsc = 'slides_ASC',
  SlidesDesc = 'slides_DESC',
  GithubAsc = 'github_ASC',
  GithubDesc = 'github_DESC',
  TranscriptAsc = 'transcript_ASC',
  TranscriptDesc = 'transcript_DESC'
}

/** Record of type Related Items Section (related_items_section) */
export type RelatedItemsSectionRecord = {
  __typename?: 'RelatedItemsSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  github?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  slides?: Maybe<Scalars['String']>
  transcript?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Related Items Section (related_items_section) */
export type RelatedItemsSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ResourceContentTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ResourceContentTypeModelFilter>>>
}

export enum ResourceContentTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Resource Content Type (resource_content_type) */
export type ResourceContentTypeRecord = {
  __typename?: 'ResourceContentTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resource Content Type (resource_content_type) */
export type ResourceContentTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ResourceIndustryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<ResourceIndustryModelFilter>>>
}

export enum ResourceIndustryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Resource Industry (resource_industry) */
export type ResourceIndustryRecord = {
  __typename?: 'ResourceIndustryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resource Industry (resource_industry) */
export type ResourceIndustryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ResourceInfrastructureProviderModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  company?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<ResourceInfrastructureProviderModelFilter>>>
}

export enum ResourceInfrastructureProviderModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Resource Infrastructure Provider (resource_infrastructure_provider) */
export type ResourceInfrastructureProviderRecord = {
  __typename?: 'ResourceInfrastructureProviderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  company?: Maybe<CompanyRecord>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resource Infrastructure Provider (resource_infrastructure_provider) */
export type ResourceInfrastructureProviderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ResourceMediaTypeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  icon?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<ResourceMediaTypeModelFilter>>>
}

export enum ResourceMediaTypeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Resource Media Type (resource_media_type) */
export type ResourceMediaTypeRecord = {
  __typename?: 'ResourceMediaTypeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  icon?: Maybe<FileField>
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resource Media Type (resource_media_type) */
export type ResourceMediaTypeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type ResourceModelContentField =
  | CalloutSectionRecord
  | TextImageSectionRecord
  | VideoSectionRecord
  | ImageSectionRecord
  | MajorHeadlineSectionRecord
  | EmbeddedSlidesSectionRecord
  | TextSectionRecord
  | SpeakersSectionRecord
  | EmbeddedPodcastSectionRecord
  | WistiaSectionRecord

export type ResourceModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  mediaType?: Maybe<LinkFilter>
  product?: Maybe<LinksFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  draft?: Maybe<BooleanFilter>
  date?: Maybe<DateFilter>
  image?: Maybe<FileFilter>
  contentType?: Maybe<LinkFilter>
  infrastructureProvider?: Maybe<LinksFilter>
  industry?: Maybe<LinksFilter>
  people?: Maybe<LinksFilter>
  organizations?: Maybe<LinksFilter>
  events?: Maybe<LinksFilter>
  content?: Maybe<LinksFilter>
  metadata?: Maybe<SeoFilter>
  showDemoRequest?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<ResourceModelFilter>>>
}

export enum ResourceModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  ShowDemoRequestAsc = 'showDemoRequest_ASC',
  ShowDemoRequestDesc = 'showDemoRequest_DESC'
}

export type ResourceModelProductField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord

/** Record of type Resource (resource) */
export type ResourceRecord = {
  __typename?: 'ResourceRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<ResourceModelContentField>>>
  contentType?: Maybe<ResourceContentTypeRecord>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['BooleanType']>
  events?: Maybe<Array<Maybe<EventRecord>>>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  industry?: Maybe<Array<Maybe<ResourceIndustryRecord>>>
  infrastructureProvider?: Maybe<
    Array<Maybe<ResourceInfrastructureProviderRecord>>
  >
  mediaType?: Maybe<ResourceMediaTypeRecord>
  metadata?: Maybe<SeoField>
  organizations?: Maybe<Array<Maybe<CompanyRecord>>>
  people?: Maybe<Array<Maybe<PersonRecord>>>
  product?: Maybe<Array<Maybe<ResourceModelProductField>>>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resource (resource) */
export type ResourceRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Resource (resource) */
export type ResourceRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Resources Page (resources_page) */
export type ResourcesPageRecord = {
  __typename?: 'ResourcesPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Resources Page (resources_page) */
export type ResourcesPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Resources Page (resources_page) */
export type ResourcesPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Row (row) */
export type RowRecord = {
  __typename?: 'RowRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  timeSlot?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Row (row) */
export type RowRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SalesFormModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  product?: Maybe<LinkFilter>
  contactType?: Maybe<LinkFilter>
  headline?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<SalesFormModelFilter>>>
}

export type SalesFormModelFormFieldsField =
  | FormTextFieldRecord
  | FormTextAreaFieldRecord
  | FormMultiSelectFieldRecord
  | FormHiddenFieldRecord
  | FormEmailFieldRecord

export enum SalesFormModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

export type SalesFormPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  contactType?: Maybe<LinkFilter>
  metadata?: Maybe<SeoFilter>
  product?: Maybe<LinkFilter>
  description?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<SalesFormPageModelFilter>>>
}

export type SalesFormPageModelFormFieldsField =
  | FormTextFieldRecord
  | FormTextAreaFieldRecord
  | FormMultiSelectFieldRecord
  | FormHiddenFieldRecord
  | FormEmailFieldRecord

export enum SalesFormPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Sales Form Page (sales_form_page) */
export type SalesFormPageRecord = {
  __typename?: 'SalesFormPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  contactType?: Maybe<FormContactTypeRecord>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  formFields?: Maybe<Array<Maybe<SalesFormPageModelFormFieldsField>>>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  product?: Maybe<HashicorpProductRecord>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Sales Form Page (sales_form_page) */
export type SalesFormPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Sales Form Page (sales_form_page) */
export type SalesFormPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Sales Form (sales_form) */
export type SalesFormRecord = {
  __typename?: 'SalesFormRecord'
  _allContactTypeLocales?: Maybe<
    Array<Maybe<FormContactTypeRecordMultiLocaleField>>
  >
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  contactType?: Maybe<FormContactTypeRecord>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  formFields?: Maybe<Array<Maybe<SalesFormModelFormFieldsField>>>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  position?: Maybe<Scalars['IntType']>
  product?: Maybe<HashicorpProductRecord>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Sales Form (sales_form) */
export type SalesFormRecord_AllContactTypeLocalesArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Sales Form (sales_form) */
export type SalesFormRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Sales Form (sales_form) */
export type SalesFormRecordContactTypeArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Sales Form (sales_form) */
export type SalesFormRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcAlertModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  tag?: Maybe<StringFilter>
  tagColor?: Maybe<StringFilter>
  textColor?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SbcAlertModelFilter>>>
}

export enum SbcAlertModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TagAsc = 'tag_ASC',
  TagDesc = 'tag_DESC',
  TagColorAsc = 'tagColor_ASC',
  TagColorDesc = 'tagColor_DESC',
  TextColorAsc = 'textColor_ASC',
  TextColorDesc = 'textColor_DESC'
}

/** Record of type ༶ Alert (sbc_alert) */
export type SbcAlertRecord = {
  __typename?: 'SbcAlertRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  tag?: Maybe<Scalars['String']>
  tagColor?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type ༶ Alert (sbc_alert) */
export type SbcAlertRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcBeforeAfterDiagramModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  theme?: Maybe<StringFilter>
  beforeContent?: Maybe<TextFilter>
  afterImage?: Maybe<FileFilter>
  afterHeadline?: Maybe<StringFilter>
  beforeImage?: Maybe<FileFilter>
  beforeHeadline?: Maybe<StringFilter>
  afterContent?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<SbcBeforeAfterDiagramModelFilter>>>
}

export enum SbcBeforeAfterDiagramModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  AfterHeadlineAsc = 'afterHeadline_ASC',
  AfterHeadlineDesc = 'afterHeadline_DESC',
  BeforeHeadlineAsc = 'beforeHeadline_ASC',
  BeforeHeadlineDesc = 'beforeHeadline_DESC'
}

/** Record of type ༶ Before-After Diagrams (sbc_before_after_diagram) */
export type SbcBeforeAfterDiagramRecord = {
  __typename?: 'SbcBeforeAfterDiagramRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  afterContent?: Maybe<Scalars['String']>
  afterHeadline?: Maybe<Scalars['String']>
  afterImage?: Maybe<FileField>
  beforeContent?: Maybe<Scalars['String']>
  beforeHeadline?: Maybe<Scalars['String']>
  beforeImage?: Maybe<FileField>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  theme?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Before-After Diagrams (sbc_before_after_diagram) */
export type SbcBeforeAfterDiagramRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type ༶ Before-After Diagrams (sbc_before_after_diagram) */
export type SbcBeforeAfterDiagramRecordAfterContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type ༶ Before-After Diagrams (sbc_before_after_diagram) */
export type SbcBeforeAfterDiagramRecordBeforeContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcButtonModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  url?: Maybe<StringFilter>
  text?: Maybe<StringFilter>
  external?: Maybe<BooleanFilter>
  appearance?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<SbcButtonModelFilter>>>
}

export enum SbcButtonModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC'
}

/** Record of type · Button (sbc_button) */
export type SbcButtonRecord = {
  __typename?: 'SbcButtonRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  appearance?: Maybe<ButtonThemeRecord>
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type · Button (sbc_button) */
export type SbcButtonRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcButtonV2ModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  external?: Maybe<BooleanFilter>
  url?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  brand?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SbcButtonV2ModelFilter>>>
}

export enum SbcButtonV2ModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ExternalAsc = 'external_ASC',
  ExternalDesc = 'external_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  BrandAsc = 'brand_ASC',
  BrandDesc = 'brand_DESC'
}

/** Record of type · Button v2 (sbc_button_v2) */
export type SbcButtonV2Record = {
  __typename?: 'SbcButtonV2Record'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  brand?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  external?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type · Button v2 (sbc_button_v2) */
export type SbcButtonV2Record_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcCalloutModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  image?: Maybe<FileFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  link?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<SbcCalloutModelFilter>>>
}

export enum SbcCalloutModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type · Callout (sbc_callout) */
export type SbcCalloutRecord = {
  __typename?: 'SbcCalloutRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  link?: Maybe<LinkRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type · Callout (sbc_callout) */
export type SbcCalloutRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type · Callout (sbc_callout) */
export type SbcCalloutRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcCalloutSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  theme?: Maybe<StringFilter>
  items?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcCalloutSectionModelFilter>>>
}

export enum SbcCalloutSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC'
}

/** Record of type ༶ Callouts (sbc_callout_section) */
export type SbcCalloutSectionRecord = {
  __typename?: 'SbcCalloutSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<SbcCalloutRecord>>>
  theme?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Callouts (sbc_callout_section) */
export type SbcCalloutSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcCaseStudyModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  buttonLabel?: Maybe<StringFilter>
  caseStudyImage?: Maybe<FileFilter>
  company?: Maybe<LinkFilter>
  headline?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  caseStudyResource?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<SbcCaseStudyModelFilter>>>
}

export enum SbcCaseStudyModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ButtonLabelAsc = 'buttonLabel_ASC',
  ButtonLabelDesc = 'buttonLabel_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type · Case Study (sbc_case_study) */
export type SbcCaseStudyRecord = {
  __typename?: 'SbcCaseStudyRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttonLabel?: Maybe<Scalars['String']>
  caseStudyImage?: Maybe<FileField>
  caseStudyResource?: Maybe<ResourceRecord>
  company?: Maybe<CompanyRecord>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type · Case Study (sbc_case_study) */
export type SbcCaseStudyRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type · Case Study (sbc_case_study) */
export type SbcCaseStudyRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcCaseStudySliderModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  caseStudies?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcCaseStudySliderModelFilter>>>
}

export enum SbcCaseStudySliderModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ༶ Case Study Slider (sbc_case_study_slider) */
export type SbcCaseStudySliderRecord = {
  __typename?: 'SbcCaseStudySliderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  caseStudies?: Maybe<Array<Maybe<SbcCaseStudyRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Case Study Slider (sbc_case_study_slider) */
export type SbcCaseStudySliderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcCodeBlockModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  chrome?: Maybe<BooleanFilter>
  language?: Maybe<LinkFilter>
  code?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<SbcCodeBlockModelFilter>>>
}

export enum SbcCodeBlockModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ChromeAsc = 'chrome_ASC',
  ChromeDesc = 'chrome_DESC'
}

/** Record of type · Code Block (sbc_code_block) */
export type SbcCodeBlockRecord = {
  __typename?: 'SbcCodeBlockRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  chrome?: Maybe<Scalars['BooleanType']>
  code?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  language?: Maybe<CodeblockLanguageRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type · Code Block (sbc_code_block) */
export type SbcCodeBlockRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type · Code Block (sbc_code_block) */
export type SbcCodeBlockRecordCodeArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcImageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  image?: Maybe<FileFilter>
  mobile?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<SbcImageModelFilter>>>
}

export enum SbcImageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ༶ Image (sbc_image) */
export type SbcImageRecord = {
  __typename?: 'SbcImageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  mobile?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Image (sbc_image) */
export type SbcImageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcLinkedTextSummaryListModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalName?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SbcLinkedTextSummaryListModelFilter>>>
}

export enum SbcLinkedTextSummaryListModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC'
}

/** Record of type ༶ Linked Text Summary List (sbc_linked_text_summary_list) */
export type SbcLinkedTextSummaryListRecord = {
  __typename?: 'SbcLinkedTextSummaryListRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalName?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<ItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Linked Text Summary List (sbc_linked_text_summary_list) */
export type SbcLinkedTextSummaryListRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcLogoGridModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  companies?: Maybe<LinksFilter>
  size?: Maybe<StringFilter>
  removeBorders?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<SbcLogoGridModelFilter>>>
}

export enum SbcLogoGridModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  RemoveBordersAsc = 'removeBorders_ASC',
  RemoveBordersDesc = 'removeBorders_DESC'
}

/** Record of type ༶ Logo Grid (sbc_logo_grid) */
export type SbcLogoGridRecord = {
  __typename?: 'SbcLogoGridRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companies?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  removeBorders?: Maybe<Scalars['BooleanType']>
  size?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Logo Grid (sbc_logo_grid) */
export type SbcLogoGridRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcMultiButtonModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalName?: Maybe<StringFilter>
  buttons?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcMultiButtonModelFilter>>>
}

export enum SbcMultiButtonModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC'
}

/** Record of type ༶ Multi Button (sbc_multi_button) */
export type SbcMultiButtonRecord = {
  __typename?: 'SbcMultiButtonRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalName?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Multi Button (sbc_multi_button) */
export type SbcMultiButtonRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcProductFeatureTableModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  higherTierPlansIncludeLowerTierFeatures?: Maybe<BooleanFilter>
  featureCategories?: Maybe<LinksFilter>
  themeBackground?: Maybe<StringFilter>
  productName?: Maybe<StringFilter>
  productLogo?: Maybe<FileFilter>
  offerings?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcProductFeatureTableModelFilter>>>
}

export enum SbcProductFeatureTableModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HigherTierPlansIncludeLowerTierFeaturesAsc = 'higherTierPlansIncludeLowerTierFeatures_ASC',
  HigherTierPlansIncludeLowerTierFeaturesDesc = 'higherTierPlansIncludeLowerTierFeatures_DESC',
  ThemeBackgroundAsc = 'themeBackground_ASC',
  ThemeBackgroundDesc = 'themeBackground_DESC',
  ProductNameAsc = 'productName_ASC',
  ProductNameDesc = 'productName_DESC'
}

/** Record of type ༶ Product Features Table (sbc_product_feature_table) */
export type SbcProductFeatureTableRecord = {
  __typename?: 'SbcProductFeatureTableRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  featureCategories?: Maybe<Array<Maybe<EnterpriseFeaturesCategoryRecord>>>
  higherTierPlansIncludeLowerTierFeatures?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  offerings?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  productLogo?: Maybe<FileField>
  productName?: Maybe<Scalars['String']>
  themeBackground?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Product Features Table (sbc_product_feature_table) */
export type SbcProductFeatureTableRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcProductPricingModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  product?: Maybe<StringFilter>
  plans?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcProductPricingModelFilter>>>
}

export enum SbcProductPricingModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ProductAsc = 'product_ASC',
  ProductDesc = 'product_DESC'
}

/** Record of type ༶ Product Pricing Plans (sbc_product_pricing) */
export type SbcProductPricingRecord = {
  __typename?: 'SbcProductPricingRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  plans?: Maybe<Array<Maybe<ProductPricingPlanRecord>>>
  product?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Product Pricing Plans (sbc_product_pricing) */
export type SbcProductPricingRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcResourcesSliderModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  filterBy?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SbcResourcesSliderModelFilter>>>
}

export type SbcResourcesSliderModelFilterByField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord
  | CompanyRecord
  | PersonRecord
  | EventRecord
  | ResourceContentTypeRecord
  | ResourceInfrastructureProviderRecord
  | ResourceIndustryRecord
  | ResourceMediaTypeRecord

export enum SbcResourcesSliderModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ༶ Resources Slider (sbc_resources_slider) */
export type SbcResourcesSliderRecord = {
  __typename?: 'SbcResourcesSliderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  filterBy?: Maybe<Array<Maybe<SbcResourcesSliderModelFilterByField>>>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Resources Slider (sbc_resources_slider) */
export type SbcResourcesSliderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SbcSectionHeaderModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  useH1?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<SbcSectionHeaderModelFilter>>>
}

export enum SbcSectionHeaderModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  UseH1Asc = 'useH1_ASC',
  UseH1Desc = 'useH1_DESC'
}

/** Record of type ༶ Section Header (sbc_section_header) */
export type SbcSectionHeaderRecord = {
  __typename?: 'SbcSectionHeaderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
  useH1?: Maybe<Scalars['BooleanType']>
}

/** Record of type ༶ Section Header (sbc_section_header) */
export type SbcSectionHeaderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type ༶ Section Header (sbc_section_header) */
export type SbcSectionHeaderRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcTextAndContentModelContentField =
  | SbcImageRecord
  | SbcLogoGridRecord
  | SbcCodeBlockRecord

export type SbcTextAndContentModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  buttons?: Maybe<LinksFilter>
  content?: Maybe<LinkFilter>
  reverseDirection?: Maybe<BooleanFilter>
  hasBorder?: Maybe<BooleanFilter>
  hasShadow?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<SbcTextAndContentModelFilter>>>
}

export enum SbcTextAndContentModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ReverseDirectionAsc = 'reverseDirection_ASC',
  ReverseDirectionDesc = 'reverseDirection_DESC',
  HasBorderAsc = 'hasBorder_ASC',
  HasBorderDesc = 'hasBorder_DESC',
  HasShadowAsc = 'hasShadow_ASC',
  HasShadowDesc = 'hasShadow_DESC'
}

/** Record of type ༶ Text & Content (sbc_text_and_content) */
export type SbcTextAndContentRecord = {
  __typename?: 'SbcTextAndContentRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  buttons?: Maybe<Array<Maybe<SbcButtonRecord>>>
  content?: Maybe<SbcTextAndContentModelContentField>
  createdAt: Scalars['DateTime']
  hasBorder?: Maybe<Scalars['BooleanType']>
  hasShadow?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  reverseDirection?: Maybe<Scalars['BooleanType']>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Text & Content (sbc_text_and_content) */
export type SbcTextAndContentRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type ༶ Text & Content (sbc_text_and_content) */
export type SbcTextAndContentRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SbcTextModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<SbcTextModelFilter>>>
}

export enum SbcTextModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ༶ Text (sbc_text) */
export type SbcTextRecord = {
  __typename?: 'SbcTextRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type ༶ Text (sbc_text) */
export type SbcTextRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type ༶ Text (sbc_text) */
export type SbcTextRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SblHorizontalModelContentField =
  | SblVerticalRecord
  | SblHorizontalRecord
  | SbcSectionHeaderRecord
  | SbcBeforeAfterDiagramRecord
  | SbcCalloutSectionRecord
  | SbcTextRecord
  | SbcImageRecord
  | SbcCaseStudySliderRecord
  | SbcLogoGridRecord
  | SbcMultiButtonRecord
  | SbcResourcesSliderRecord
  | SbcTextAndContentRecord
  | SbcAlertRecord

export type SblHorizontalModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  content?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SblHorizontalModelFilter>>>
}

export enum SblHorizontalModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ྿ Horizontal (sbl_horizontal) */
export type SblHorizontalRecord = {
  __typename?: 'SblHorizontalRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<SblHorizontalModelContentField>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type ྿ Horizontal (sbl_horizontal) */
export type SblHorizontalRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SblVerticalModelContentField =
  | TerraformOfferingTableRecord
  | FaqCategoryRecord
  | SbcProductFeatureTableRecord
  | SblVerticalRecord
  | SblHorizontalRecord
  | SbcSectionHeaderRecord
  | SbcBeforeAfterDiagramRecord
  | SbcCalloutSectionRecord
  | SbcTextRecord
  | SbcImageRecord
  | SbcCaseStudySliderRecord
  | SbcLogoGridRecord
  | SbcMultiButtonRecord
  | SbcResourcesSliderRecord
  | SbcTextAndContentRecord
  | SbcProductPricingRecord
  | SbcAlertRecord

export type SblVerticalModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  content?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SblVerticalModelFilter>>>
}

export enum SblVerticalModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type ྿ Vertical (sbl_vertical) */
export type SblVerticalRecord = {
  __typename?: 'SblVerticalRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<SblVerticalModelContentField>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type ྿ Vertical (sbl_vertical) */
export type SblVerticalRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Schedule Lite item (schedule_lite_item) */
export type ScheduleLiteItemRecord = {
  __typename?: 'ScheduleLiteItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  scheduleItems?: Maybe<Array<Maybe<HashiconfScheduleItemRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Schedule Lite item (schedule_lite_item) */
export type ScheduleLiteItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SectionBlockModelComponentsField =
  | SectionHeaderRecord
  | VideoRecord
  | TextImageRecord
  | ButtonRecord
  | ImageRecord
  | LogoGridRecord
  | TestimonialSliderRecord
  | PackageSectionRecord
  | MultiButtonRecord
  | TaggedResourceRecord
  | TwoColumnTextRecord
  | TwoColumnTextBlockRecord
  | HeroRecord
  | CalloutsSectionRecord
  | SmallTextTagRecord

export type SectionBlockModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  theme?: Maybe<LinkFilter>
  divider?: Maybe<LinkFilter>
  sid?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SectionBlockModelFilter>>>
}

export enum SectionBlockModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SidAsc = 'sid_ASC',
  SidDesc = 'sid_DESC'
}

export type SectionBlockPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  alertBanner?: Maybe<LinkFilter>
  content?: Maybe<LinksFilter>
  metatag?: Maybe<SeoFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<SectionBlockPageModelFilter>>>
}

export enum SectionBlockPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Section Block Page (section_block_page) */
export type SectionBlockPageRecord = {
  __typename?: 'SectionBlockPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  content?: Maybe<Array<Maybe<SectionBlockV2Record>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metatag?: Maybe<SeoField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Section Block Page (section_block_page) */
export type SectionBlockPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Section Block (section_block) */
export type SectionBlockRecord = {
  __typename?: 'SectionBlockRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  components?: Maybe<Array<Maybe<SectionBlockModelComponentsField>>>
  createdAt: Scalars['DateTime']
  divider?: Maybe<SectionDividerRecord>
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  sid?: Maybe<Scalars['String']>
  theme?: Maybe<SectionThemeRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Section Block (section_block) */
export type SectionBlockRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SectionBlockV2ModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  layout?: Maybe<LinkFilter>
  theme?: Maybe<LinkFilter>
  divider?: Maybe<LinkFilter>
  sid?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SectionBlockV2ModelFilter>>>
}

export type SectionBlockV2ModelLayoutField =
  | SblVerticalRecord
  | SblHorizontalRecord

export enum SectionBlockV2ModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SidAsc = 'sid_ASC',
  SidDesc = 'sid_DESC'
}

/** Record of type ࿇ Section Block (section_block_v2) */
export type SectionBlockV2Record = {
  __typename?: 'SectionBlockV2Record'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  divider?: Maybe<SectionDividerRecord>
  id: Scalars['ItemId']
  layout?: Maybe<SectionBlockV2ModelLayoutField>
  name?: Maybe<Scalars['String']>
  sid?: Maybe<Scalars['String']>
  theme?: Maybe<SectionThemeRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type ࿇ Section Block (section_block_v2) */
export type SectionBlockV2Record_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SectionDividerModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<SectionDividerModelFilter>>>
}

export enum SectionDividerModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Section Divider (section_divider) */
export type SectionDividerRecord = {
  __typename?: 'SectionDividerRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Section Divider (section_divider) */
export type SectionDividerRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Section Header (section_header) */
export type SectionHeaderRecord = {
  __typename?: 'SectionHeaderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Section Header (section_header) */
export type SectionHeaderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Section Header (section_header) */
export type SectionHeaderRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SectionThemeModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  OR?: Maybe<Array<Maybe<SectionThemeModelFilter>>>
}

export enum SectionThemeModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Section Theme (section_theme) */
export type SectionThemeRecord = {
  __typename?: 'SectionThemeRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Section Theme (section_theme) */
export type SectionThemeRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SentinelPageModelPageContentField =
  | CalloutSectionRecord
  | HeroSectionRecord

/** Record of type Sentinel Page (sentinel_page) */
export type SentinelPageRecord = {
  __typename?: 'SentinelPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  pageContent?: Maybe<Array<Maybe<SentinelPageModelPageContentField>>>
  policyAsCode?: Maybe<HeroSectionRecord>
  prefooter?: Maybe<HeroSectionRecord>
  productTabs?: Maybe<Array<Maybe<SentinelProductTabRecord>>>
  productTabsHeader?: Maybe<TextHeadlineSectionRecord>
  salesForm?: Maybe<SalesFormRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Sentinel Page (sentinel_page) */
export type SentinelPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SentinelProductTabModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  product?: Maybe<LinkFilter>
  enterpriseLogo?: Maybe<FileFilter>
  colorLogo?: Maybe<FileFilter>
  codeSamples?: Maybe<LinksFilter>
  features?: Maybe<LinksFilter>
  docsLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<SentinelProductTabModelFilter>>>
}

export enum SentinelProductTabModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Sentinel Product Tab (sentinel_product_tab) */
export type SentinelProductTabRecord = {
  __typename?: 'SentinelProductTabRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  codeSamples?: Maybe<Array<Maybe<CodeSampleRecord>>>
  colorLogo?: Maybe<FileField>
  createdAt: Scalars['DateTime']
  docsLink?: Maybe<LinkRecord>
  enterpriseLogo?: Maybe<FileField>
  features?: Maybe<Array<Maybe<ProductTabFeatureRecord>>>
  id: Scalars['ItemId']
  product?: Maybe<EnterpriseProductRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Sentinel Product Tab (sentinel_product_tab) */
export type SentinelProductTabRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SeoField = {
  __typename?: 'SeoField'
  description?: Maybe<Scalars['String']>
  image?: Maybe<FileField>
  title?: Maybe<Scalars['String']>
  twitterCard?: Maybe<Scalars['String']>
}

/** Specifies how to filter SEO meta tags fields */
export type SeoFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

/** Record of type Shop page (shop_page) */
export type ShopPageRecord = {
  __typename?: 'ShopPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  confirmation?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  intro?: Maybe<Scalars['String']>
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Shop page (shop_page) */
export type ShopPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Shop page (shop_page) */
export type ShopPageRecordIntroArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type Site = {
  __typename?: 'Site'
  favicon?: Maybe<FileField>
  faviconMetaTags: Array<Maybe<Tag>>
  globalSeo?: Maybe<GlobalSeoField>
}

export type SiteFaviconMetaTagsArgs = {
  variants?: Maybe<Array<Maybe<FaviconType>>>
}

export type SiteGlobalSeoArgs = {
  locale?: Maybe<SiteLocale>
}

export enum SiteLocale {
  En = 'en',
  Ja = 'ja'
}

/** Specifies how to filter Slug fields */
export type SlugFilter = {
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['String']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['String']>
  /** Filter records that have one of the specified slugs */
  in?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter records that do have one of the specified slugs */
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Record of type Small Text Tag (small_text_tag) */
export type SmallTextTagRecord = {
  __typename?: 'SmallTextTagRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Small Text Tag (small_text_tag) */
export type SmallTextTagRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SocialNetworkIconModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  iconDark?: Maybe<FileFilter>
  name?: Maybe<StringFilter>
  icon?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<SocialNetworkIconModelFilter>>>
}

export enum SocialNetworkIconModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Social Network Icon (social_network_icon) */
export type SocialNetworkIconRecord = {
  __typename?: 'SocialNetworkIconRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  icon?: Maybe<FileField>
  iconDark?: Maybe<FileField>
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Social Network Icon (social_network_icon) */
export type SocialNetworkIconRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SocialNetworkModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  network?: Maybe<LinkFilter>
  url?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<SocialNetworkModelFilter>>>
}

export enum SocialNetworkModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type Social Network (social_network) */
export type SocialNetworkRecord = {
  __typename?: 'SocialNetworkRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  network?: Maybe<SocialNetworkIconRecord>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Social Network (social_network) */
export type SocialNetworkRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SpeakersSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  speakers?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SpeakersSectionModelFilter>>>
}

export enum SpeakersSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Speakers Section (speakers_section) */
export type SpeakersSectionRecord = {
  __typename?: 'SpeakersSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  speakers?: Maybe<Array<Maybe<PersonRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Speakers Section (speakers_section) */
export type SpeakersSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type SplitCtaItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  titleLogo?: Maybe<FileFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  backgroundImage?: Maybe<FileFilter>
  backgroundColor?: Maybe<ColorFilter>
  OR?: Maybe<Array<Maybe<SplitCtaItemModelFilter>>>
}

export enum SplitCtaItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Split CTA Item (split_cta_item) */
export type SplitCtaItemRecord = {
  __typename?: 'SplitCtaItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  backgroundColor?: Maybe<ColorField>
  backgroundImage?: Maybe<FileField>
  buttons?: Maybe<Array<Maybe<ButtonRecord>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  titleLogo?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Split CTA Item (split_cta_item) */
export type SplitCtaItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Split CTA Item (split_cta_item) */
export type SplitCtaItemRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type SplitCtaSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  items?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<SplitCtaSectionModelFilter>>>
}

export enum SplitCtaSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Split CTA Section (split_cta_section) */
export type SplitCtaSectionRecord = {
  __typename?: 'SplitCtaSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<SplitCtaItemRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Split CTA Section (split_cta_section) */
export type SplitCtaSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type StaticDynamicSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  staticImage?: Maybe<FileFilter>
  staticDescription?: Maybe<TextFilter>
  dynamicImage?: Maybe<FileFilter>
  dynamicDescription?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<StaticDynamicSectionModelFilter>>>
}

export enum StaticDynamicSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Static-Dynamic Section (static_dynamic_section) */
export type StaticDynamicSectionRecord = {
  __typename?: 'StaticDynamicSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  dynamicDescription?: Maybe<Scalars['String']>
  dynamicImage?: Maybe<FileField>
  id: Scalars['ItemId']
  staticDescription?: Maybe<Scalars['String']>
  staticImage?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Static-Dynamic Section (static_dynamic_section) */
export type StaticDynamicSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Static-Dynamic Section (static_dynamic_section) */
export type StaticDynamicSectionRecordDynamicDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Static-Dynamic Section (static_dynamic_section) */
export type StaticDynamicSectionRecordStaticDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Specifies how to filter by status */
export type StatusFilter = {
  /** Search the record with the specified status */
  eq?: Maybe<ItemStatus>
  /** Exclude the record with the specified status */
  neq?: Maybe<ItemStatus>
  /** Search records with the specified statuses */
  in?: Maybe<Array<Maybe<ItemStatus>>>
  /** Search records without the specified statuses */
  notIn?: Maybe<Array<Maybe<ItemStatus>>>
}

/** Specifies how to filter Single-line string fields */
export type StringFilter = {
  /** Filter records based on a regular expression */
  matches?: Maybe<StringMatchesFilter>
  /** Exclude records based on a regular expression */
  notMatches?: Maybe<StringMatchesFilter>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
  /** Search for records with an exact match */
  eq?: Maybe<Scalars['String']>
  /** Exclude records with an exact match */
  neq?: Maybe<Scalars['String']>
  /** Filter records that equal one of the specified values */
  in?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter records that do not equal one of the specified values */
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type StringMatchesFilter = {
  pattern: Scalars['String']
  caseSensitive?: Maybe<Scalars['BooleanType']>
}

export type StringMultiLocaleField = {
  __typename?: 'StringMultiLocaleField'
  locale?: Maybe<SiteLocale>
  value?: Maybe<Scalars['String']>
}

/** Record of type Subscription Confirmation Page (subscription_confirmation_page) */
export type SubscriptionConfirmationPageRecord = {
  __typename?: 'SubscriptionConfirmationPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Subscription Confirmation Page (subscription_confirmation_page) */
export type SubscriptionConfirmationPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Subscription Confirmation Page (subscription_confirmation_page) */
export type SubscriptionConfirmationPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Subscription Opt-out Success Page (subscription_opt_out_success_page) */
export type SubscriptionOptOutSuccessPageRecord = {
  __typename?: 'SubscriptionOptOutSuccessPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  message?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Subscription Opt-out Success Page (subscription_opt_out_success_page) */
export type SubscriptionOptOutSuccessPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Subscription Opt-out Success Page (subscription_opt_out_success_page) */
export type SubscriptionOptOutSuccessPageRecordMessageArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type Tag = {
  __typename?: 'Tag'
  attributes?: Maybe<Scalars['MetaTagAttributes']>
  content?: Maybe<Scalars['String']>
  tag: Scalars['String']
}

export type TaggedResourceModelResourceFiltersField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord
  | ResourceContentTypeRecord
  | ResourceInfrastructureProviderRecord
  | ResourceIndustryRecord
  | ResourceMediaTypeRecord

/** Record of type Tagged Resources (tagged_resource) */
export type TaggedResourceRecord = {
  __typename?: 'TaggedResourceRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  resourceFilters?: Maybe<Array<Maybe<TaggedResourceModelResourceFiltersField>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Tagged Resources (tagged_resource) */
export type TaggedResourceRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TemplatePageModelContentField =
  | CalloutSectionRecord
  | TextImageSectionRecord
  | VideoSectionRecord
  | ImageSectionRecord
  | MajorHeadlineSectionRecord
  | TextSectionRecord
  | HeroSectionRecord
  | HtmlSectionRecord

export type TemplatePageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  showDemoRequest?: Maybe<BooleanFilter>
  hidden?: Maybe<BooleanFilter>
  slug?: Maybe<SlugFilter>
  draft?: Maybe<BooleanFilter>
  hero?: Maybe<LinkFilter>
  content?: Maybe<LinksFilter>
  preFooterCta?: Maybe<LinkFilter>
  subnav?: Maybe<StringFilter>
  darkSubnav?: Maybe<BooleanFilter>
  metadata?: Maybe<SeoFilter>
  OR?: Maybe<Array<Maybe<TemplatePageModelFilter>>>
}

export enum TemplatePageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ShowDemoRequestAsc = 'showDemoRequest_ASC',
  ShowDemoRequestDesc = 'showDemoRequest_DESC',
  HiddenAsc = 'hidden_ASC',
  HiddenDesc = 'hidden_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC',
  SubnavAsc = 'subnav_ASC',
  SubnavDesc = 'subnav_DESC',
  DarkSubnavAsc = 'darkSubnav_ASC',
  DarkSubnavDesc = 'darkSubnav_DESC'
}

/** Record of type Template Page (template_page) */
export type TemplatePageRecord = {
  __typename?: 'TemplatePageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Array<Maybe<TemplatePageModelContentField>>>
  createdAt: Scalars['DateTime']
  darkSubnav?: Maybe<Scalars['BooleanType']>
  draft?: Maybe<Scalars['BooleanType']>
  hero?: Maybe<HeroSectionRecord>
  hidden?: Maybe<Scalars['BooleanType']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  position?: Maybe<Scalars['IntType']>
  preFooterCta?: Maybe<HeroSectionRecord>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  slug?: Maybe<Scalars['String']>
  subnav?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Template Page (template_page) */
export type TemplatePageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TerraformGraphSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  stackImages?: Maybe<GalleryFilter>
  serviceImages?: Maybe<GalleryFilter>
  OR?: Maybe<Array<Maybe<TerraformGraphSectionModelFilter>>>
}

export enum TerraformGraphSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Terraform Graph Section (terraform_graph_section) */
export type TerraformGraphSectionRecord = {
  __typename?: 'TerraformGraphSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  serviceImages?: Maybe<Array<Maybe<FileField>>>
  stackImages?: Maybe<Array<Maybe<FileField>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Terraform Graph Section (terraform_graph_section) */
export type TerraformGraphSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TerraformOfferingCategoryModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  name?: Maybe<StringFilter>
  tier?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<TerraformOfferingCategoryModelFilter>>>
}

export enum TerraformOfferingCategoryModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

/** Record of type Terraform Offering Category (terraform_offering_category) */
export type TerraformOfferingCategoryRecord = {
  __typename?: 'TerraformOfferingCategoryRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  tier?: Maybe<Array<Maybe<TerraformOfferingTierRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Terraform Offering Category (terraform_offering_category) */
export type TerraformOfferingCategoryRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TerraformOfferingModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  position?: Maybe<PositionFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TerraformOfferingModelFilter>>>
}

export enum TerraformOfferingModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PositionAsc = 'position_ASC',
  PositionDesc = 'position_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Terraform Offering (terraform_offering) */
export type TerraformOfferingRecord = {
  __typename?: 'TerraformOfferingRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  position?: Maybe<Scalars['IntType']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Terraform Offering (terraform_offering) */
export type TerraformOfferingRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TerraformOfferingTableModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  categories?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<TerraformOfferingTableModelFilter>>>
}

export enum TerraformOfferingTableModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Terraform Offering Table (terraform_offering_table) */
export type TerraformOfferingTableRecord = {
  __typename?: 'TerraformOfferingTableRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  categories?: Maybe<Array<Maybe<TerraformOfferingCategoryRecord>>>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Terraform Offering Table (terraform_offering_table) */
export type TerraformOfferingTableRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TerraformOfferingTierModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  ctaLink?: Maybe<LinkFilter>
  offerings?: Maybe<LinksFilter>
  subheading?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  headline?: Maybe<StringFilter>
  callouts?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<TerraformOfferingTierModelFilter>>>
}

export enum TerraformOfferingTierModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SubheadingAsc = 'subheading_ASC',
  SubheadingDesc = 'subheading_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Terraform Offering Tier (terraform_offering_tier) */
export type TerraformOfferingTierRecord = {
  __typename?: 'TerraformOfferingTierRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  callouts?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  ctaLink?: Maybe<LinkRecord>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  name?: Maybe<Scalars['String']>
  offerings?: Maybe<Array<Maybe<TerraformOfferingRecord>>>
  subheading?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Terraform Offering Tier (terraform_offering_tier) */
export type TerraformOfferingTierRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Terraform Offering Tier (terraform_offering_tier) */
export type TerraformOfferingTierRecordCalloutsArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Terraform Product Page (terraform_product_page) */
export type TerraformProductPageRecord = {
  __typename?: 'TerraformProductPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  caseStudiesSection?: Maybe<SectionBlockV2Record>
  companiesSection?: Maybe<SectionBlockV2Record>
  createdAt: Scalars['DateTime']
  enterprisePricingPage?: Maybe<SectionBlockPageRecord>
  enterpriseTrialForm?: Maybe<TrialFormPageRecord>
  featuresSection?: Maybe<SectionBlockV2Record>
  heroSection?: Maybe<HeroSectionRecord>
  howTerraformWorksSection?: Maybe<SectionBlockV2Record>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  principlesSection?: Maybe<SectionBlockV2Record>
  resourcesSection?: Maybe<SectionBlockV2Record>
  staticDynamicSection?: Maybe<SectionBlockV2Record>
  subnav?: Maybe<ProductSubnavRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  useCasePages?: Maybe<Array<Maybe<SectionBlockPageRecord>>>
  useCasesSection?: Maybe<SectionBlockV2Record>
}

/** Record of type Terraform Product Page (terraform_product_page) */
export type TerraformProductPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TestimonialModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  company?: Maybe<LinkFilter>
  author?: Maybe<StringFilter>
  authorTitle?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TestimonialModelFilter>>>
}

export enum TestimonialModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  AuthorTitleAsc = 'authorTitle_ASC',
  AuthorTitleDesc = 'authorTitle_DESC'
}

/** Record of type Testimonial (testimonial) */
export type TestimonialRecord = {
  __typename?: 'TestimonialRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  author?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  company?: Maybe<CompanyRecord>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Testimonial (testimonial) */
export type TestimonialRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Testimonial (testimonial) */
export type TestimonialRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Testimonial Slider (testimonial_slider) */
export type TestimonialSliderRecord = {
  __typename?: 'TestimonialSliderRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  testimonials?: Maybe<Array<Maybe<TestimonialRecord>>>
  updatedAt: Scalars['DateTime']
}

/** Record of type Testimonial Slider (testimonial_slider) */
export type TestimonialSliderRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Specifies how to filter text fields */
export type TextFilter = {
  /** Filter records based on a regular expression */
  matches?: Maybe<TextMatchesFilter>
  /** Exclude records based on a regular expression */
  notMatches?: Maybe<TextMatchesFilter>
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

export type TextHeadlineAndGridSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  description?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  companies?: Maybe<LinksFilter>
  includeCompanyPopups?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<TextHeadlineAndGridSectionModelFilter>>>
}

export enum TextHeadlineAndGridSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  IncludeCompanyPopupsAsc = 'includeCompanyPopups_ASC',
  IncludeCompanyPopupsDesc = 'includeCompanyPopups_DESC'
}

/** Record of type Text, Headline and Grid Section (text_headline_and_grid_section) */
export type TextHeadlineAndGridSectionRecord = {
  __typename?: 'TextHeadlineAndGridSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  companies?: Maybe<Array<Maybe<CompanyRecord>>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  includeCompanyPopups?: Maybe<Scalars['BooleanType']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Text, Headline and Grid Section (text_headline_and_grid_section) */
export type TextHeadlineAndGridSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Text, Headline and Grid Section (text_headline_and_grid_section) */
export type TextHeadlineAndGridSectionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TextHeadlineSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TextHeadlineSectionModelFilter>>>
}

export enum TextHeadlineSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Text with Headline Section (text_headline_section) */
export type TextHeadlineSectionRecord = {
  __typename?: 'TextHeadlineSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Text with Headline Section (text_headline_section) */
export type TextHeadlineSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Text with Headline Section (text_headline_section) */
export type TextHeadlineSectionRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Text and Image (text_image) */
export type TextImageRecord = {
  __typename?: 'TextImageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  reverseDirection?: Maybe<Scalars['BooleanType']>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Text and Image (text_image) */
export type TextImageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Text and Image (text_image) */
export type TextImageRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TextImageSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  anchorLink?: Maybe<BooleanFilter>
  text?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  image?: Maybe<FileFilter>
  reverseDirection?: Maybe<BooleanFilter>
  OR?: Maybe<Array<Maybe<TextImageSectionModelFilter>>>
}

export enum TextImageSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  AnchorLinkAsc = 'anchorLink_ASC',
  AnchorLinkDesc = 'anchorLink_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  ReverseDirectionAsc = 'reverseDirection_ASC',
  ReverseDirectionDesc = 'reverseDirection_DESC'
}

/** Record of type Text & Image Section (text_image_section) */
export type TextImageSectionRecord = {
  __typename?: 'TextImageSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  anchorLink?: Maybe<Scalars['BooleanType']>
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  image?: Maybe<FileField>
  reverseDirection?: Maybe<Scalars['BooleanType']>
  text?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Text & Image Section (text_image_section) */
export type TextImageSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Text & Image Section (text_image_section) */
export type TextImageSectionRecordTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TextMatchesFilter = {
  pattern: Scalars['String']
  caseSensitive?: Maybe<Scalars['BooleanType']>
}

export type TextSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  content?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<TextSectionModelFilter>>>
}

export enum TextSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Text Section (text_section) */
export type TextSectionRecord = {
  __typename?: 'TextSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Text Section (text_section) */
export type TextSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Text Section (text_section) */
export type TextSectionRecordContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Thank You Page (thank_you_page) */
export type ThankYouPageRecord = {
  __typename?: 'ThankYouPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Thank You Page (thank_you_page) */
export type ThankYouPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Thank You Page (thank_you_page) */
export type ThankYouPageRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TrainingCourseModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  date?: Maybe<DateFilter>
  url?: Maybe<StringFilter>
  location?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TrainingCourseModelFilter>>>
}

export enum TrainingCourseModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC'
}

/** Record of type Training Course (training_course) */
export type TrainingCourseRecord = {
  __typename?: 'TrainingCourseRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  id: Scalars['ItemId']
  location?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Training Course (training_course) */
export type TrainingCourseRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type TrainingPageModelExtraContentField =
  | HeroSectionRecord
  | TwoColumnTextSectionRecord

/** Record of type Training Page (training_page) */
export type TrainingPageRecord = {
  __typename?: 'TrainingPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  extraContent?: Maybe<Array<Maybe<TrainingPageModelExtraContentField>>>
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  trainingCourses?: Maybe<Array<Maybe<TrainingCourseRecord>>>
  trainingDescription?: Maybe<Scalars['String']>
  trainingHeadline?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Training Page (training_page) */
export type TrainingPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Training Page (training_page) */
export type TrainingPageRecordTrainingDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TrainingPartnerSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  company?: Maybe<LinkFilter>
  description?: Maybe<TextFilter>
  contactLink?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TrainingPartnerSectionModelFilter>>>
}

export enum TrainingPartnerSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ContactLinkAsc = 'contactLink_ASC',
  ContactLinkDesc = 'contactLink_DESC'
}

/** Record of type Training Partner Section (training_partner_section) */
export type TrainingPartnerSectionRecord = {
  __typename?: 'TrainingPartnerSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  company?: Maybe<CompanyRecord>
  contactLink?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Training Partner Section (training_partner_section) */
export type TrainingPartnerSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Training Partner Section (training_partner_section) */
export type TrainingPartnerSectionRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TrialFormPageModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  productId?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  nextStepLink?: Maybe<StringFilter>
  enterpriseFeaturesLink?: Maybe<StringFilter>
  productVersion?: Maybe<StringFilter>
  sidebarLogo?: Maybe<FileFilter>
  sidebarText?: Maybe<TextFilter>
  sidebarCompanyLogos?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<TrialFormPageModelFilter>>>
}

export type TrialFormPageModelFormFieldsField =
  | FormTextFieldRecord
  | FormTextAreaFieldRecord
  | FormMultiSelectFieldRecord
  | FormHiddenFieldRecord
  | FormEmailFieldRecord
  | FormCheckboxFieldRecord

export enum TrialFormPageModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  ProductIdAsc = 'productId_ASC',
  ProductIdDesc = 'productId_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  NextStepLinkAsc = 'nextStepLink_ASC',
  NextStepLinkDesc = 'nextStepLink_DESC',
  EnterpriseFeaturesLinkAsc = 'enterpriseFeaturesLink_ASC',
  EnterpriseFeaturesLinkDesc = 'enterpriseFeaturesLink_DESC',
  ProductVersionAsc = 'productVersion_ASC',
  ProductVersionDesc = 'productVersion_DESC'
}

/** Record of type Trial Form Page (trial_form_page) */
export type TrialFormPageRecord = {
  __typename?: 'TrialFormPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  enterpriseFeaturesLink?: Maybe<Scalars['String']>
  formFields?: Maybe<Array<Maybe<TrialFormPageModelFormFieldsField>>>
  id: Scalars['ItemId']
  nextStepLink?: Maybe<Scalars['String']>
  productId?: Maybe<Scalars['String']>
  productVersion?: Maybe<Scalars['String']>
  sidebarCompanyLogos?: Maybe<Array<Maybe<CompanyRecord>>>
  sidebarLogo?: Maybe<FileField>
  sidebarText?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Trial Form Page (trial_form_page) */
export type TrialFormPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Trial Form Page (trial_form_page) */
export type TrialFormPageRecordSidebarTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Two-Column Text (two_column_text_block) */
export type TwoColumnTextBlockRecord = {
  __typename?: 'TwoColumnTextBlockRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  leftColumn?: Maybe<Scalars['String']>
  rightColumn?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Two-Column Text (two_column_text_block) */
export type TwoColumnTextBlockRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Two-Column Text (two_column_text_block) */
export type TwoColumnTextBlockRecordLeftColumnArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Two-Column Text (two_column_text_block) */
export type TwoColumnTextBlockRecordRightColumnArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Two Column Text (two_column_text) */
export type TwoColumnTextRecord = {
  __typename?: 'TwoColumnTextRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  leftColumn?: Maybe<Scalars['String']>
  rightColumn?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Two Column Text (two_column_text) */
export type TwoColumnTextRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Two Column Text (two_column_text) */
export type TwoColumnTextRecordLeftColumnArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Two Column Text (two_column_text) */
export type TwoColumnTextRecordRightColumnArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type TwoColumnTextSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  content?: Maybe<TextFilter>
  headline?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<TwoColumnTextSectionModelFilter>>>
}

export enum TwoColumnTextSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Two Column Text Section (two_column_text_section) */
export type TwoColumnTextSectionRecord = {
  __typename?: 'TwoColumnTextSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
}

/** Record of type Two Column Text Section (two_column_text_section) */
export type TwoColumnTextSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Two Column Text Section (two_column_text_section) */
export type TwoColumnTextSectionRecordContentArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type UseCasePageDropdownModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<UseCasePageDropdownModelFilter>>>
}

export enum UseCasePageDropdownModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Use Case Page Dropdown (use_case_page_dropdown) */
export type UseCasePageDropdownRecord = {
  __typename?: 'UseCasePageDropdownRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Use Case Page Dropdown (use_case_page_dropdown) */
export type UseCasePageDropdownRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Vault Advanced Data Protection Page (vault_advanced_data_protection_page) */
export type VaultAdvancedDataProtectionPageRecord = {
  __typename?: 'VaultAdvancedDataProtectionPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  architectureDescription?: Maybe<SectionBlockV2Record>
  createdAt: Scalars['DateTime']
  ctaText?: Maybe<Scalars['String']>
  diagramOneImage?: Maybe<FileField>
  diagramOneText?: Maybe<Scalars['String']>
  diagramTwoImage?: Maybe<FileField>
  diagramTwoText?: Maybe<Scalars['String']>
  headline?: Maybe<SectionBlockV2Record>
  id: Scalars['ItemId']
  integrations?: Maybe<SectionBlockV2Record>
  metatag?: Maybe<SeoField>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Vault Advanced Data Protection Page (vault_advanced_data_protection_page) */
export type VaultAdvancedDataProtectionPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Vault Advanced Data Protection Page (vault_advanced_data_protection_page) */
export type VaultAdvancedDataProtectionPageRecordDiagramOneTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

/** Record of type Vault Advanced Data Protection Page (vault_advanced_data_protection_page) */
export type VaultAdvancedDataProtectionPageRecordDiagramTwoTextArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type VaultIntegrationSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  headline?: Maybe<StringFilter>
  secretBackends?: Maybe<LinkFilter>
  secretsLink?: Maybe<LinkFilter>
  authBackends?: Maybe<LinkFilter>
  authLink?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<VaultIntegrationSectionModelFilter>>>
}

export enum VaultIntegrationSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC'
}

/** Record of type Vault Integration Section (deprecated) (vault_integration_section) */
export type VaultIntegrationSectionRecord = {
  __typename?: 'VaultIntegrationSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  authBackends?: Maybe<LargeLogoGridSectionRecord>
  authLink?: Maybe<LinkRecord>
  createdAt: Scalars['DateTime']
  headline?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  secretBackends?: Maybe<LargeLogoGridSectionRecord>
  secretsLink?: Maybe<LinkRecord>
  updatedAt: Scalars['DateTime']
}

/** Record of type Vault Integration Section (deprecated) (vault_integration_section) */
export type VaultIntegrationSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Vault OSS Page (vault_oss_page) */
export type VaultOssPageRecord = {
  __typename?: 'VaultOssPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  documentationHeadline?: Maybe<SbcSectionHeaderRecord>
  featuresButtons?: Maybe<SbcMultiButtonRecord>
  featuresHeadline?: Maybe<SbcSectionHeaderRecord>
  hero?: Maybe<HeroSectionRecord>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  ossEnterpriseCtas?: Maybe<SplitCtaSectionRecord>
  updatedAt: Scalars['DateTime']
  useCasesCallouts?: Maybe<Array<Maybe<SbcCalloutSectionRecord>>>
  useCasesHeadline?: Maybe<SbcSectionHeaderRecord>
}

/** Record of type Vault OSS Page (vault_oss_page) */
export type VaultOssPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Vault Product Page (vault_product_page) */
export type VaultProductPageRecord = {
  __typename?: 'VaultProductPageRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  alertBanner?: Maybe<AlertBannerRecord>
  caseStudiesSection?: Maybe<SectionBlockV2Record>
  companiesSection?: Maybe<SectionBlockV2Record>
  createdAt: Scalars['DateTime']
  enterprisePricingPage?: Maybe<SectionBlockPageRecord>
  enterpriseTrialForm?: Maybe<TrialFormPageRecord>
  featuresSection?: Maybe<SectionBlockV2Record>
  heroSection?: Maybe<HeroSectionRecord>
  howVaultWorksSection?: Maybe<SectionBlockV2Record>
  id: Scalars['ItemId']
  metadata?: Maybe<SeoField>
  principlesSection?: Maybe<SectionBlockV2Record>
  resourcesSection?: Maybe<SectionBlockV2Record>
  staticDynamicSection?: Maybe<SectionBlockV2Record>
  subnav?: Maybe<ProductSubnavRecord>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  useCasePages?: Maybe<Array<Maybe<SectionBlockPageRecord>>>
  useCasesSection?: Maybe<SectionBlockV2Record>
}

/** Record of type Vault Product Page (vault_product_page) */
export type VaultProductPageRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type VerticalTextBlockListItemModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  linkUrl?: Maybe<StringFilter>
  logo?: Maybe<FileFilter>
  header?: Maybe<StringFilter>
  body?: Maybe<TextFilter>
  OR?: Maybe<Array<Maybe<VerticalTextBlockListItemModelFilter>>>
}

export enum VerticalTextBlockListItemModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  LinkUrlAsc = 'linkUrl_ASC',
  LinkUrlDesc = 'linkUrl_DESC',
  HeaderAsc = 'header_ASC',
  HeaderDesc = 'header_DESC'
}

/** Record of type Vertical Text Block List Item (vertical_text_block_list_item) */
export type VerticalTextBlockListItemRecord = {
  __typename?: 'VerticalTextBlockListItemRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  body?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  header?: Maybe<Scalars['String']>
  id: Scalars['ItemId']
  linkUrl?: Maybe<Scalars['String']>
  logo?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
}

/** Record of type Vertical Text Block List Item (vertical_text_block_list_item) */
export type VerticalTextBlockListItemRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Vertical Text Block List Item (vertical_text_block_list_item) */
export type VerticalTextBlockListItemRecordBodyArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type VerticalTextBlockListSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  centerText?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  items?: Maybe<LinksFilter>
  OR?: Maybe<Array<Maybe<VerticalTextBlockListSectionModelFilter>>>
}

export enum VerticalTextBlockListSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  CenterTextAsc = 'centerText_ASC',
  CenterTextDesc = 'centerText_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type Vertical Text Block List Section (vertical_text_block_list_section) */
export type VerticalTextBlockListSectionRecord = {
  __typename?: 'VerticalTextBlockListSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  centerText?: Maybe<Scalars['BooleanType']>
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  items?: Maybe<Array<Maybe<VerticalTextBlockListItemRecord>>>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type Vertical Text Block List Section (vertical_text_block_list_section) */
export type VerticalTextBlockListSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type VideoField = {
  __typename?: 'VideoField'
  height?: Maybe<Scalars['IntType']>
  provider?: Maybe<Scalars['String']>
  providerUid?: Maybe<Scalars['String']>
  thumbnailUrl?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['IntType']>
}

/** Specifies how to filter Video fields */
export type VideoFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: Maybe<Scalars['BooleanType']>
}

/** Record of type Video (video) */
export type VideoRecord = {
  __typename?: 'VideoRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  thumbnail?: Maybe<FileField>
  updatedAt: Scalars['DateTime']
  video?: Maybe<VideoField>
}

/** Record of type Video (video) */
export type VideoRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type VideoSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  videoUrl?: Maybe<VideoFilter>
  OR?: Maybe<Array<Maybe<VideoSectionModelFilter>>>
}

export enum VideoSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC'
}

/** Record of type Video Section (video_section) */
export type VideoSectionRecord = {
  __typename?: 'VideoSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  updatedAt: Scalars['DateTime']
  videoUrl?: Maybe<VideoField>
}

/** Record of type Video Section (video_section) */
export type VideoSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type VideoSourceModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  srcType?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<VideoSourceModelFilter>>>
}

export enum VideoSourceModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  SrcTypeAsc = 'srcType_ASC',
  SrcTypeDesc = 'srcType_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Record of type Video Source (video_source) */
export type VideoSourceRecord = {
  __typename?: 'VideoSourceRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  srcType?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
}

/** Record of type Video Source (video_source) */
export type VideoSourceRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type WebinarModelBodyContentField =
  | TextHeadlineSectionRecord
  | TextSectionRecord
  | BasicTableRecord

export type WebinarModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  date?: Maybe<DateFilter>
  webinarId?: Maybe<StringFilter>
  heroContent?: Maybe<LinksFilter>
  bodyContent?: Maybe<LinksFilter>
  primaryInfrastructureProvider?: Maybe<LinkFilter>
  showDemoRequest?: Maybe<BooleanFilter>
  metadata?: Maybe<SeoFilter>
  events?: Maybe<LinksFilter>
  organizations?: Maybe<LinksFilter>
  people?: Maybe<LinksFilter>
  industry?: Maybe<LinksFilter>
  infrastructureProvider?: Maybe<LinksFilter>
  product?: Maybe<LinksFilter>
  backgroundImage?: Maybe<FileFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<TextFilter>
  slug?: Maybe<SlugFilter>
  draft?: Maybe<BooleanFilter>
  primaryProduct?: Maybe<LinkFilter>
  OR?: Maybe<Array<Maybe<WebinarModelFilter>>>
}

export type WebinarModelHeroContentField =
  | TextHeadlineSectionRecord
  | SpeakersSectionRecord

export enum WebinarModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  WebinarIdAsc = 'webinarId_ASC',
  WebinarIdDesc = 'webinarId_DESC',
  ShowDemoRequestAsc = 'showDemoRequest_ASC',
  ShowDemoRequestDesc = 'showDemoRequest_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DraftAsc = 'draft_ASC',
  DraftDesc = 'draft_DESC'
}

export type WebinarModelProductField =
  | OpenSourceToolRecord
  | EnterpriseProductRecord

/** Record of type Webinar (webinar) */
export type WebinarRecord = {
  __typename?: 'WebinarRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  backgroundImage?: Maybe<FileField>
  bodyContent?: Maybe<Array<Maybe<WebinarModelBodyContentField>>>
  createdAt: Scalars['DateTime']
  date?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['BooleanType']>
  events?: Maybe<Array<Maybe<EventRecord>>>
  heroContent?: Maybe<Array<Maybe<WebinarModelHeroContentField>>>
  id: Scalars['ItemId']
  industry?: Maybe<Array<Maybe<ResourceIndustryRecord>>>
  infrastructureProvider?: Maybe<
    Array<Maybe<ResourceInfrastructureProviderRecord>>
  >
  metadata?: Maybe<SeoField>
  organizations?: Maybe<Array<Maybe<CompanyRecord>>>
  people?: Maybe<Array<Maybe<PersonRecord>>>
  primaryInfrastructureProvider?: Maybe<ResourceInfrastructureProviderRecord>
  primaryProduct?: Maybe<OpenSourceToolRecord>
  product?: Maybe<Array<Maybe<WebinarModelProductField>>>
  showDemoRequest?: Maybe<Scalars['BooleanType']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  webinarId?: Maybe<Scalars['String']>
}

/** Record of type Webinar (webinar) */
export type WebinarRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

/** Record of type Webinar (webinar) */
export type WebinarRecordDescriptionArgs = {
  markdown?: Maybe<Scalars['Boolean']>
}

export type WhitePaperModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  title?: Maybe<StringFilter>
  file?: Maybe<FileFilter>
  OR?: Maybe<Array<Maybe<WhitePaperModelFilter>>>
}

export enum WhitePaperModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Record of type White Paper (white_paper) */
export type WhitePaperRecord = {
  __typename?: 'WhitePaperRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  file?: Maybe<FileField>
  id: Scalars['ItemId']
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

/** Record of type White Paper (white_paper) */
export type WhitePaperRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}

export type WistiaSectionModelFilter = {
  _createdAt?: Maybe<DateTimeFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<IdFilter>
  _firstPublishedAt?: Maybe<DateTimeFilter>
  _publicationScheduledAt?: Maybe<DateTimeFilter>
  _publishedAt?: Maybe<DateTimeFilter>
  _status?: Maybe<StatusFilter>
  _updatedAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
  _isValid?: Maybe<BooleanFilter>
  internalTitle?: Maybe<StringFilter>
  videoId?: Maybe<StringFilter>
  OR?: Maybe<Array<Maybe<WistiaSectionModelFilter>>>
}

export enum WistiaSectionModelOrderBy {
  CreatedAtAsc = '_createdAt_ASC',
  CreatedAtDesc = '_createdAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstPublishedAtAsc = '_firstPublishedAt_ASC',
  FirstPublishedAtDesc = '_firstPublishedAt_DESC',
  PublicationScheduledAtAsc = '_publicationScheduledAt_ASC',
  PublicationScheduledAtDesc = '_publicationScheduledAt_DESC',
  PublishedAtAsc = '_publishedAt_ASC',
  PublishedAtDesc = '_publishedAt_DESC',
  StatusAsc = '_status_ASC',
  StatusDesc = '_status_DESC',
  UpdatedAtAsc = '_updatedAt_ASC',
  UpdatedAtDesc = '_updatedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsValidAsc = '_isValid_ASC',
  IsValidDesc = '_isValid_DESC',
  InternalTitleAsc = 'internalTitle_ASC',
  InternalTitleDesc = 'internalTitle_DESC',
  VideoIdAsc = 'videoId_ASC',
  VideoIdDesc = 'videoId_DESC'
}

/** Record of type Wistia Section (wistia_section) */
export type WistiaSectionRecord = {
  __typename?: 'WistiaSectionRecord'
  _createdAt: Scalars['DateTime']
  _firstPublishedAt?: Maybe<Scalars['DateTime']>
  _isValid: Scalars['BooleanType']
  _modelApiKey: Scalars['String']
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>
  _publishedAt?: Maybe<Scalars['DateTime']>
  /** SEO meta tags */
  _seoMetaTags: Array<Maybe<Tag>>
  _status: ItemStatus
  _updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ItemId']
  internalTitle?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  videoId?: Maybe<Scalars['String']>
}

/** Record of type Wistia Section (wistia_section) */
export type WistiaSectionRecord_SeoMetaTagsArgs = {
  locale?: Maybe<SiteLocale>
}
