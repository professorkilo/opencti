import type { StixObject, StixOpenctiExtensionSDO } from '../../types/stix-common';
import { STIX_EXT_OCTI } from '../../types/stix-extensions';
import type { StoreEntity, BasicStoreEntity } from '../../types/store';
import type { CsvMapper } from '../../generated/graphql';
import { IngestionAuthType } from '../../generated/graphql';

// region Rss ingestion
export const ENTITY_TYPE_INGESTION_RSS = 'IngestionRss';

export interface BasicStoreEntityIngestionRss extends BasicStoreEntity {
  name: string
  description: string
  uri: string
  user_id: string | undefined
  created_by_ref: string | undefined
  report_types: string[]
  object_marking_refs: string[] | undefined
  current_state_date: Date | undefined
  ingestion_running: boolean
  last_execution_date: Date | undefined
}

export interface StoreEntityIngestionRss extends StoreEntity {
  name: string
  description: string
  uri: string
  report_types: string[]
  ingestion_running: boolean
  last_execution_date: Date | undefined
}

export interface StixIngestionRss extends StixObject {
  name: string
  description: string
  uri: string
  report_types: string[]
  ingestion_running: boolean
  extensions: {
    [STIX_EXT_OCTI]: StixOpenctiExtensionSDO
  }
}
// endregion

// region Taxii ingestion
export const ENTITY_TYPE_INGESTION_TAXII = 'IngestionTaxii';

export interface BasicStoreEntityIngestionTaxii extends BasicStoreEntity {
  name: string
  description: string
  uri: string
  version: string
  collection: string
  confidence_to_score: boolean
  authentication_type: IngestionAuthType.None | IngestionAuthType.Basic | IngestionAuthType.Bearer | IngestionAuthType.Certificate
  authentication_value: string
  user_id: string | undefined
  added_after_start: Date | undefined
  current_state_cursor: string | undefined
  ingestion_running: boolean
  taxii_more: boolean
  last_execution_date: Date | undefined
}

export interface StoreEntityIngestionTaxii extends StoreEntity {
  name: string
  description: string
  uri: string
  confidence_to_score: boolean
  current_state_cursor: string | undefined
  ingestion_running: boolean
  taxii_more: boolean
  last_execution_date: Date | undefined
}

export interface StixIngestionTaxii extends StixObject {
  name: string
  description: string
  uri: string
  ingestion_running: boolean
  confidence_to_score: boolean
  extensions: {
    [STIX_EXT_OCTI]: StixOpenctiExtensionSDO
  }
}
// endregion

// region Csv ingestion
export const ENTITY_TYPE_INGESTION_CSV = 'IngestionCsv';

export interface BasicStoreEntityIngestionCsv extends BasicStoreEntity {
  current_state_hash: string;
  name: string
  description: string
  uri: string
  csvMapper: CsvMapper
  csv_mapper_id: string
  authentication_type: IngestionAuthType.None | IngestionAuthType.Basic | IngestionAuthType.Bearer | IngestionAuthType.Certificate
  authentication_value?: string | null
  user_id: string | undefined
  ingestion_running: boolean
  last_execution_date: Date | undefined
  markings?: string[]
}

export interface StoreEntityIngestionCsv extends StoreEntity {
  name: string
  description: string
  uri: string
  csv_mapper_id: string
  ingestion_running: boolean
  last_execution_date: Date | undefined
}

export interface StixIngestionCsv extends StixObject {
  name: string
  description: string
  uri: string
  csv_mapper_id: string
  ingestion_running: boolean
  extensions: {
    [STIX_EXT_OCTI]: StixOpenctiExtensionSDO
  }
}
// endregion

// region Taxii ingestion
export const ENTITY_TYPE_INGESTION_TAXII_COLLECTION = 'IngestionTaxiiCollection';

export interface BasicStoreEntityIngestionTaxiiCollection extends BasicStoreEntity {
  name: string
  description: string
  user_id: string | undefined
  confidence_to_score: boolean
  ingestion_running: boolean
  authorized_members: {
    access_right: string
    entity_type: string
    id: string
    name: string
  }[];
}

export interface StoreEntityIngestionTaxiiCollection extends StoreEntity {
  name: string
  description: string
  ingestion_running: boolean
  confidence_to_score: boolean
}

export interface StixIngestionTaxiiCollection extends StixObject {
  name: string
  description: string
  ingestion_running: boolean
  confidence_to_score: boolean
  extensions: {
    [STIX_EXT_OCTI]: StixOpenctiExtensionSDO
  }
}
// endregion
