import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import education from "../graphql/education.gql"

export const useEducationStore = defineStore('educationStore', {
  state: () => ({
    listEducation: [],
    isDataFetched: false,
  }),
  actions: {
    async fetchEducationData() {
      // Only fetch data if it hasn't been fetched yet
      if (!this.isDataFetched || !this.listEducation.length) {
        const { result, refetch } = useQuery(education);
        if (result.value) {
          this.listEducation = result.value.basic_education_levels;
          this.isDataFetched = true;
        }
      }
    },
  },
});