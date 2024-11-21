export const PRODUCT_DOMAIN_MAP = {
	vault: 'vaultproject.io',
	terraform: 'terraform.io',
	consul: 'consul.io',
	vagrant: 'vagrantup.com',
	nomad: 'nomadproject.io',
	waypoint: 'waypointproject.io',
	cloud: 'cloud.hashicorp.com',
	packer: 'packer.io',
	boundary: 'boundaryproject.io',
	sentinel: 'docs.hashicorp.com',
}

/**
 * Determines if the given URL is an internal URL within the context of the provided product
 * @param url URL to check
 * @param product associated product, if any
 * @returns
 */
export function isInternalUrl(url, product) {
	// relative paths are internal
	if (url.startsWith('/')) {
		return true
	}

	// Check the domain name of the URL if it's not relative. If it matches the domain for the supplied product, then it's not internal
	try {
		const { hostname } = new URL(url)
		if (product && hostname.endsWith(PRODUCT_DOMAIN_MAP[product])) {
			return true
		}
	} catch {
		// TODO: try and handle relative paths such as ./docker at some point
	}

	return false
}
