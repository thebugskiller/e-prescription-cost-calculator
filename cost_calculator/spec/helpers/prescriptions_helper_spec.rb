require 'rails_helper'

RSpec.describe PrescriptionsHelper, type: :helper do
  describe '#get_total_cost' do
    let(:medications) do
      [
        { unit_price: 10.0, dosage: { frequency: 'Twice', duration: '15 days' } },
        { unit_price: 20.0, dosage: { frequency: 'Once', duration: '35 days' } }
      ]
    end

    context 'without minimum budget' do
      it 'calculates the total cost correctly' do
        total_cost = helper.get_total_cost(medications)
        first_med_cost = 10.0 * 2 * 15
        second_med_cost = 20.0 * 1 * 35
        second_med_discount = (10 * second_med_cost) / 100
        expected_cost = first_med_cost + (second_med_cost - second_med_discount)

        expect(total_cost).to eq(expected_cost.round(2))
      end
    end

    context 'with minimum budget' do
      it 'calculates the cost using 1-day duration for all medications' do
        total_cost = helper.get_total_cost(medications, min_budget: true)
        first_med_cost = helper.get_cost('1 day', 'Twice', 10.0)
        second_med_cost = helper.get_cost('1 day', 'Once', 20.0)
        expected_cost = first_med_cost + second_med_cost

        expect(total_cost).to eq(expected_cost.round(2))
      end
    end

    context 'with discount logic' do
      it 'applies a 10% discount for durations >= 30 days' do
        helper.get_total_cost(medications)
        discounted_cost = medications.find { |med| med[:dosage][:duration] == '35 days' }[:total_cost]
        full_cost = 20.0 * 1 * 35
        expected_discounted_cost = full_cost - (10 * full_cost) / 100

        expect(discounted_cost).to eq(expected_discounted_cost.round(2))
      end

      it 'does not apply a discount for durations < 30 days' do
        medications.first[:dosage][:duration] = '10 days'
        helper.get_total_cost(medications)
        no_discount_cost = medications.find { |med| med[:dosage][:duration] == '10 days' }[:total_cost]
        expected_cost = 10.0 * 2 * 10

        expect(no_discount_cost).to eq(expected_cost)
      end
    end
  end

  describe '#optimize' do
    let(:medications) do
      [
        { unit_price: 10.0, dosage: { frequency: 'Twice', duration: '15 days' } },
        { unit_price: 20.0, dosage: { frequency: 'Once', duration: '35 days' } }
      ]
    end

    it 'reduces durations to fit within the budget' do
      budget = 300
      optimized_medications = helper.optimize(medications, budget)
      optimized_total_cost = helper.get_total_cost(optimized_medications)

      expect(optimized_total_cost).to be <= budget
    end

    it 'increases durations to approach the budget' do
      budget = 2000
      optimized_medications = helper.optimize(medications, budget)
      optimized_total_cost = helper.get_total_cost(optimized_medications)

      expect(optimized_total_cost).to be >= budget
    end

    it 'does not modify durations if the total cost equals the budget' do
      budget = helper.get_total_cost(medications)
      optimized_medications = helper.optimize(medications, budget)
      optimized_total_cost = helper.get_total_cost(optimized_medications)

      expect(optimized_total_cost).to eq(budget)
      expect(optimized_medications).to eq(medications)
    end
  end
end
